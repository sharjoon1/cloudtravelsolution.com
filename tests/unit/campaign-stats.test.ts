import { describe, it, expect } from "vitest";
import {
  mutateCampaignStats,
  withCampaignStatsLock,
  emptyCampaignStats,
  type CampaignStatsPayload,
} from "@/lib/campaign-stats";

/**
 * These tests lock in the two campaign-stats bugs fixed in Phase 1:
 *  - Bug A: sendCampaign used to overwrite the whole `stats` group with zeros
 *    every batch, wiping the webhook-written delivered/opened/clicked counters.
 *  - Bug B: the webhook did a non-atomic read→mutate→write, so concurrent
 *    deliveries lost increments.
 *
 * The fix is a per-campaign async mutex + a read-merge-write helper used by
 * BOTH callers, so these tests exercise the helper in isolation with a fake
 * payload (no DB / no Payload boot required).
 */

function makeFakePayload(initial: Partial<Record<string, unknown>> = {}) {
  let doc: Record<string, unknown> = { ...initial };
  const updates: Record<string, unknown>[] = [];
  const payload: CampaignStatsPayload = {
    async findByID() {
      return { ...doc };
    },
    async update({ data }) {
      updates.push(data);
      doc = { ...doc, ...data };
    },
  };
  return {
    payload,
    updates,
    getDoc: () => doc,
  };
}

describe("emptyCampaignStats", () => {
  it("returns all six counters at zero", () => {
    const s = emptyCampaignStats();
    expect(s).toEqual({
      totalSent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      unsubscribed: 0,
    });
  });
});

describe("mutateCampaignStats — preserves untouched fields (Bug A)", () => {
  it("does NOT zero out delivered/opened/clicked when only totalSent changes", async () => {
    const { payload, getDoc } = makeFakePayload({
      stats: {
        totalSent: 5,
        delivered: 7,
        opened: 3,
        clicked: 2,
        bounced: 1,
        unsubscribed: 0,
      },
    });

    await mutateCampaignStats(payload, 42, (s) => {
      s.totalSent = 10;
    });

    const stats = getDoc().stats as Record<string, number>;
    expect(stats.totalSent).toBe(10); // updated
    expect(stats.delivered).toBe(7); // preserved — this is the regression
    expect(stats.opened).toBe(3);
    expect(stats.clicked).toBe(2);
    expect(stats.bounced).toBe(1);
    expect(stats.unsubscribed).toBe(0);
  });

  it("increments a single counter without disturbing the others", async () => {
    const { payload, getDoc } = makeFakePayload({
      stats: { totalSent: 50, delivered: 40, opened: 12, clicked: 3, bounced: 1, unsubscribed: 0 },
    });

    await mutateCampaignStats(payload, 1, (s) => {
      s.delivered += 1;
    });

    expect((getDoc().stats as Record<string, number>).delivered).toBe(41);
    expect((getDoc().stats as Record<string, number>).totalSent).toBe(50);
  });

  it("seeds missing stats with the full zero shape", async () => {
    const { payload, getDoc } = makeFakePayload({}); // no stats at all

    await mutateCampaignStats(payload, 1, (s) => {
      s.opened += 1;
    });

    const stats = getDoc().stats as Record<string, number>;
    expect(stats.opened).toBe(1);
    expect(stats.totalSent).toBe(0);
    expect(stats.delivered).toBe(0);
    // every field present (Payload writes the whole group object)
    expect(Object.keys(stats).sort()).toEqual(
      ["totalSent", "delivered", "opened", "clicked", "bounced", "unsubscribed"].sort(),
    );
  });
});

describe("mutateCampaignStats — atomic under concurrency (Bug B)", () => {
  it("does not lose increments when many webhooks fire at once", async () => {
    // In-memory doc with a tiny read/write delay to maximise the chance of
    // overlap — exactly the window where the old code dropped increments.
    let delivered = 0;
    let inFlight = false;
    const overlaps: number[] = [];
    const payload: CampaignStatsPayload = {
      async findByID() {
        if (inFlight) overlaps.push(delivered);
        inFlight = true;
        await new Promise((r) => setTimeout(r, 1));
        return { stats: { delivered } };
      },
      async update({ data }) {
        await new Promise((r) => setTimeout(r, 1));
        delivered = (data.stats as { delivered: number }).delivered;
        inFlight = false;
      },
    };

    const N = 50;
    await Promise.all(
    Array.from({ length: N }, () =>
        mutateCampaignStats(payload, 9, (s) => {
        s.delivered += 1;
        }),
      ),
    );

    // If the mutex serializes, every increment lands and none overlapped.
    expect(delivered).toBe(N);
    expect(overlaps).toHaveLength(0);
  });

  it("keeps different campaigns independent", async () => {
    let a = 0;
    let b = 0;
    const payload = (id: number): CampaignStatsPayload => ({
      async findByID() {
        return { stats: { opened: id === 1 ? a : b } };
      },
      async update({ data }) {
        const v = (data.stats as { opened: number }).opened;
        if (id === 1) a = v;
        else b = v;
      },
    });

    await Promise.all([
      ...Array.from({ length: 20 }, () =>
        mutateCampaignStats(payload(1), 1, (s) => {
          s.opened += 1;
        }),
      ),
      ...Array.from({ length: 30 }, () =>
        mutateCampaignStats(payload(2), 2, (s) => {
          s.opened += 1;
        }),
      ),
    ]);

    expect(a).toBe(20);
    expect(b).toBe(30);
  });
});

describe("withCampaignStatsLock — serializes per campaign", () => {
  it("runs tasks for the same campaign strictly sequentially", async () => {
    let running = 0;
    let maxConcurrent = 0;
    const order: string[] = [];

    const task = (label: string) =>
      withCampaignStatsLock(7, async () => {
        running += 1;
        maxConcurrent = Math.max(maxConcurrent, running);
        order.push(`start ${label}`);
        await new Promise((r) => setTimeout(r, 2));
        order.push(`end ${label}`);
        running -= 1;
      });

    await Promise.all([task("a"), task("b"), task("c")]);

    expect(maxConcurrent).toBe(1); // never overlapped
    // each start is followed by its own end before the next start
    expect(order).toEqual(["start a", "end a", "start b", "end b", "start c", "end c"]);
  });
});
