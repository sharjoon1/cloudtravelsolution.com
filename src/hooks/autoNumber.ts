import type { CollectionBeforeChangeHook } from "payload";

/**
 * Reusable beforeChange hook for auto-generating sequential numbers.
 * Format: PREFIX-YYYYMM-XXXX (e.g., CTS-202602-0001, PAY-202602-0001)
 *
 * Concurrency: the candidate is derived from `totalDocs + 1` and then verified
 * free against the unique column, bumping until an unused number is found. This
 * closes the collision that a plain `totalDocs + 1` hits after any document is
 * deleted, and narrows the concurrent-create race window. For a genuinely
 * high-throughput system, back this with a DB transaction / sequence instead.
 */
export const autoNumber = (
  prefix: string,
  fieldName: string,
  collectionSlug: string
): CollectionBeforeChangeHook => {
  return async ({ data, operation, req }) => {
    if (operation === "create" && !data[fieldName]) {
      data[fieldName] = await generateUniqueNumber(
        req,
        prefix,
        fieldName,
        collectionSlug
      );
    }
    return data;
  };
};

type HookReq = Parameters<CollectionBeforeChangeHook>[0]["req"];

async function generateUniqueNumber(
  req: HookReq,
  prefix: string,
  fieldName: string,
  collectionSlug: string
): Promise<string> {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const pattern = `${prefix}-${year}${month}-`;

  // Start from count + 1 (resolves the common case in a single query).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const counted = await req.payload.find({
    collection: collectionSlug as any,
    where: { [fieldName]: { like: `${pattern}%` } },
    limit: 0,
    depth: 0,
    overrideAccess: true,
  });
  let next = counted.totalDocs + 1;

  // Verify the candidate is free (fixes post-deletion collisions and the rare
  // concurrent-create overlap). Bump until we find an unused number.
  for (let attempt = 0; attempt < 100; attempt++) {
    const candidate = `${pattern}${String(next).padStart(4, "0")}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clash = await req.payload.find({
      collection: collectionSlug as any,
      where: { [fieldName]: { equals: candidate } },
      limit: 0,
      depth: 0,
      overrideAccess: true,
    });
    if (clash.totalDocs === 0) return candidate;
    next++;
  }

  // Extremely unlikely fallback (100 consecutive collisions).
  return `${pattern}${String(next).padStart(4, "0")}`;
}
