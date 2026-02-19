import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { Countries } from "./src/collections/Countries";
import { VisaTypes } from "./src/collections/VisaTypes";
import { Locations } from "./src/collections/Locations";
import { BlogPosts } from "./src/collections/BlogPosts";
import { Testimonials } from "./src/collections/Testimonials";
import { FAQs } from "./src/collections/FAQs";
import { Inquiries } from "./src/collections/Inquiries";
import { Leads } from "./src/collections/Leads";
import { TeamMembers } from "./src/collections/TeamMembers";
import { Media } from "./src/collections/Media";
import { Users } from "./src/collections/Users";
import { Customers } from "./src/collections/Customers";
import { VisaApplications } from "./src/collections/VisaApplications";
import { Payments } from "./src/collections/Payments";
import { Activities } from "./src/collections/Activities";
import { Partners } from "./src/collections/Partners";
import { Documents } from "./src/collections/Documents";
import { ServiceRequests } from "./src/collections/ServiceRequests";
import { SiteSettings } from "./src/globals/SiteSettings";
import { Homepage } from "./src/globals/Homepage";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL || "",
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "— CloudTravelSolution Admin",
      openGraph: {
        title: "CloudTravelSolution Admin",
        description: "Admin panel for Cloud Travel Solution - Visa consulting & travel services",
        siteName: "CloudTravelSolution",
      },
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
    Customers,
    VisaApplications,
    Payments,
    Activities,
    Partners,
    Documents,
    ServiceRequests,
  ],
  globals: [SiteSettings, Homepage],
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
