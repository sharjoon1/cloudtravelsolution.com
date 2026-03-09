import type { CollectionAfterChangeHook } from "payload";

interface SyncOptions {
  source: string;
  getEmail: (doc: Record<string, unknown>) => string | undefined;
  getName: (doc: Record<string, unknown>) => string | undefined;
  getSegments: (doc: Record<string, unknown>) => string[];
}

export function createSubscriberSyncHook(options: SyncOptions): CollectionAfterChangeHook {
  return async ({ doc, operation, req }) => {
    if (operation !== "create") return doc;

    const email = options.getEmail(doc);
    if (!email) return doc;

    try {
      const existing = await req.payload.find({
        collection: "subscribers",
        where: { email: { equals: email } },
        limit: 1,
      });

      if (existing.docs.length > 0) return doc;

      const segments = options.getSegments(doc).map((tag) => ({ tag }));

      await req.payload.create({
        collection: "subscribers",
        data: {
          email,
          name: options.getName(doc) || "",
          source: options.source,
          status: "active",
          segments,
        },
      });
    } catch (error) {
      console.error(`[Subscriber Sync] Failed for ${email}:`, error);
    }

    return doc;
  };
}
