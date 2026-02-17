import type { CollectionBeforeChangeHook } from "payload";

/**
 * Reusable beforeChange hook for auto-generating sequential numbers.
 * Format: PREFIX-YYYYMM-XXXX (e.g., CTS-202602-0001, PAY-202602-0001)
 */
export const autoNumber = (
  prefix: string,
  fieldName: string,
  collectionSlug: string
): CollectionBeforeChangeHook => {
  return async ({ data, operation, req }) => {
    if (operation === "create" && !data[fieldName]) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const yearMonth = `${year}${month}`;
      const pattern = `${prefix}-${yearMonth}-`;

      // Count existing documents with the same prefix+yearMonth
      const existing = await req.payload.find({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        collection: collectionSlug as any,
        where: {
          [fieldName]: {
            like: `${pattern}%`,
          },
        },
        limit: 0,
        depth: 0,
      });

      const nextNumber = existing.totalDocs + 1;
      data[fieldName] = `${pattern}${String(nextNumber).padStart(4, "0")}`;
    }

    return data;
  };
};
