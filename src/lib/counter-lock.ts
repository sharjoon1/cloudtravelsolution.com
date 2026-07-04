/**
 * Atomic counter increments for Payload collections.
 *
 * A plain read → +1 → write loses increments under concurrent creates (two
 * creates both read 5, both write 6). `atomicIncrement` serialises per
 * (collection+id) via an in-process mutex so concurrent increments all land.
 * Single PM2 process => module-level lock suffices (same approach as
 * src/lib/campaign-stats.ts).
 *
 * NOTE: this fixes create-side races only. Deletes are admin-only and rare, and
 * the prod CRM is currently empty, so an afterDelete decrement isn't included
 * here — add it if/when CRM deletes start happening in volume.
 */

/** Narrow payload surface this helper depends on (cast the real Payload to it). */
export interface CounterPayload {
  findByID(args: {
    collection: string;
    id: number | string;
    depth?: number;
    overrideAccess?: boolean;
  }): Promise<Record<string, unknown> | null>;
  update(args: {
    collection: string;
    id: number | string;
    data: Record<string, unknown>;
    overrideAccess?: boolean;
  }): Promise<unknown>;
}

const locks = new Map<string, Promise<unknown>>();

/** Run `task` exclusively per `key`; concurrent same-key tasks run serially. */
export function withLock<T>(key: string, task: () => Promise<T>): Promise<T> {
  const prev = locks.get(key) ?? Promise.resolve();
  // Run after the previous task settles, whether it resolved or rejected.
  const run = prev.then(task, task);
  // Store a swallowed-error promise so a failing task never poisons the chain.
  locks.set(
    key,
    run.then(
      () => undefined,
      () => undefined,
    ),
  );
  return run;
}

/** Atomically increment `field` on `collection`:`id` by `by` (default 1). */
export async function atomicIncrement(
  payload: CounterPayload,
  collection: string,
  id: number | string,
  field: string,
  by = 1,
): Promise<void> {
  return withLock(`${collection}:${id}`, async () => {
    const doc = await payload.findByID({
      collection,
      id,
      depth: 0,
      overrideAccess: true,
    });
    const current = Number(doc?.[field]) || 0;
    await payload.update({
      collection,
      id,
      data: { [field]: current + by },
      overrideAccess: true,
    });
  });
}
