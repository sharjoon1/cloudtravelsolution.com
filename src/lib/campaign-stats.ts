/**
 * Atomic, clobber-free updates to EmailCampaigns.stats.
 *
 * Background — two bugs this module fixes:
 *  1. `sendCampaign` wrote `stats: { totalSent, delivered: 0, opened: 0, ... }`
 *     on every batch, overwriting the delivered/opened/clicked counters the
 *     Resend webhook writes concurrently. Result: every metric except totalSent
 *     read as 0.
 *  2. The webhook did a plain read → mutate → write of `stats`. Two simultaneous
 *     deliveries (very common — a 50-email batch lands ~50 events at once) both
 *     read the same value and one increment was lost per collision.
 *
 * Fix: every stats mutation goes through `mutateCampaignStats`, which serialises
 * per-campaign via `withCampaignStatsLock` and does a read-merge-write, so the
 * webhook and sendCampaign never stomp on each other. Single PM2 process =>
 * module-level lock is sufficient (same approach the codebase already uses for
 * autoNumber). For a multi-instance deployment, back this with a DB transaction.
 */

export interface CampaignStats {
  totalSent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  unsubscribed: number;
}

/**
 * The narrow payload surface this helper depends on. Keeping it minimal makes
 * the helper unit-testable with a fake payload instead of booting Payload+SQLite.
 */
export interface CampaignStatsPayload {
  findByID(args: {
    collection: string;
    id: number | string;
    overrideAccess?: boolean;
  }): Promise<{ stats?: Partial<CampaignStats> | null }>;
  update(args: {
    collection: string;
    id: number | string;
    data: Record<string, unknown>;
    overrideAccess?: boolean;
  }): Promise<unknown>;
}

export function emptyCampaignStats(): CampaignStats {
  return {
    totalSent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    bounced: 0,
    unsubscribed: 0,
  };
}

/**
 * Per-campaign serialiser. Chains tasks on a Promise so concurrent callers for
 * the same campaignId run strictly one-after-another; different campaignIds are
 * independent. Errors in one task never break the chain for the next caller.
 */
const campaignLocks = new Map<number, Promise<unknown>>();

export function withCampaignStatsLock<T>(
  campaignId: number,
  task: () => Promise<T>,
): Promise<T> {
  const prev = campaignLocks.get(campaignId) ?? Promise.resolve();
  // Run `task` after `prev` settles, whether it resolved or rejected.
  const run = prev.then(task, task);
  // Store a swallowed-error promise so a failing task doesn't poison the chain.
  campaignLocks.set(
    campaignId,
    run.then(
      () => undefined,
      () => undefined,
    ),
  );
  return run;
}

/**
 * Read the campaign's current stats, apply `mutator` in place, and write the
 * full merged object back — all under the per-campaign lock. Untouched fields
 * are preserved (fixes the zero-out bug) and concurrent calls don't lose
 * increments (fixes the read-modify-write race).
 */
export async function mutateCampaignStats(
  payload: CampaignStatsPayload,
  campaignId: number,
  mutator: (stats: CampaignStats) => void,
): Promise<void> {
  return withCampaignStatsLock(campaignId, async () => {
    const doc = await payload.findByID({
      collection: "email-campaigns",
      id: campaignId,
      overrideAccess: true,
    });

    const stats: CampaignStats = { ...emptyCampaignStats(), ...(doc.stats || {}) };
    mutator(stats);

    await payload.update({
      collection: "email-campaigns",
      id: campaignId,
      data: { stats },
      overrideAccess: true,
    });
  });
}
