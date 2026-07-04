import { describe, it, expect } from "vitest";
import { atomicIncrement, withLock, type CounterPayload } from "@/lib/counter-lock";

function makeFakePayload(initial: Record<string, unknown>) {
  let doc: Record<string, unknown> = { ...initial };
  const payload: CounterPayload = {
    async findByID() {
      // Tiny delay to maximise the read→write overlap window. Without the lock,
      // 50 concurrent increments would all read 0 and write 1 (final === 1).
      await new Promise((r) => setTimeout(r, 1));
      return { ...doc };
    },
    async update({ data }) {
      await new Promise((r) => setTimeout(r, 1));
      doc = { ...doc, ...data };
    },
  };
  return { payload, getDoc: () => doc };
}

describe("atomicIncrement", () => {
  it("increments a field by 1", async () => {
    const { payload, getDoc } = makeFakePayload({ totalApplications: 5 });
    await atomicIncrement(payload, "customers", 1, "totalApplications");
    expect(getDoc().totalApplications).toBe(6);
  });

  it("does not lose increments under 50x concurrency", async () => {
    const { payload, getDoc } = makeFakePayload({ totalRequests: 0 });
    await Promise.all(
      Array.from({ length: 50 }, () =>
        atomicIncrement(payload, "partners", 9, "totalRequests"),
      ),
    );
    expect(getDoc().totalRequests).toBe(50);
  });

  it("keeps different collection/id keys independent", async () => {
    const a = makeFakePayload({ count: 0 });
    const b = makeFakePayload({ count: 0 });
    await Promise.all([
      ...Array.from({ length: 20 }, () => atomicIncrement(a.payload, "x", 1, "count")),
      ...Array.from({ length: 30 }, () => atomicIncrement(b.payload, "x", 2, "count", 2)),
    ]);
    expect(a.getDoc().count).toBe(20);
    expect(b.getDoc().count).toBe(60);
  });
});

describe("withLock", () => {
  it("runs same-key tasks strictly sequentially", async () => {
    let running = 0;
    let max = 0;
    const task = () =>
      withLock("shared-key", async () => {
        running += 1;
        max = Math.max(max, running);
        await new Promise((r) => setTimeout(r, 2));
        running -= 1;
      });
    await Promise.all([task(), task(), task()]);
    expect(max).toBe(1);
  });
});
