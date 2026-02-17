import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { Countries } from "@/collections/Countries";
import { VisaTypes } from "@/collections/VisaTypes";
import { Locations } from "@/collections/Locations";
import { BlogPosts } from "@/collections/BlogPosts";
import { Testimonials } from "@/collections/Testimonials";
import { FAQs } from "@/collections/FAQs";
import { Inquiries } from "@/collections/Inquiries";
import { Leads } from "@/collections/Leads";
import { TeamMembers } from "@/collections/TeamMembers";
import { Media } from "@/collections/Media";
import { Users } from "@/collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "— CloudTravelSolution Admin",
    },
  },
  collections: [
    Users,
    Countries,
    VisaTypes,
    Locations,
    BlogPosts,
    Testimonials,
    FAQs,
    Inquiries,
    Leads,
    TeamMembers,
    Media,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "CHANGE-THIS-TO-A-SECURE-SECRET-MIN-32-CHARS",
  typescript: {
    outputFile: path.resolve(dirname, "src/types/payload-types.ts"),
  },
  db: process.env.DATABASE_URI?.startsWith("postgresql")
    ? postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI,
        },
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || "file:./data/dev.db",
        },
        push: true,
      }),
  plugins: [
    seoPlugin({
      collections: ["blog-posts", "countries"],
      uploadsCollection: "media",
      generateTitle: ({ doc }: { doc: Record<string, unknown> }) =>
        `${doc.title || doc.name} | CloudTravelSolution`,
      generateDescription: ({ doc }: { doc: Record<string, unknown> }) =>
        typeof doc.excerpt === "string" ? doc.excerpt : "",
    }),
  ],
});
