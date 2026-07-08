import type { Metadata } from "next";

import { getAllBlogPosts } from "@/lib/blog-data";
import { SITE_CONFIG } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BlogList } from "./blog-list";

export const metadata: Metadata = {
  title: "Blog — Visa Guides, Travel Tips & Industry Updates",
  description:
    "Expert visa guides, travel tips, country guides, and industry updates from Cloud Travel Solutions. Stay informed about visa requirements and travel advisories.",
  alternates: { canonical: `${SITE_CONFIG.url}/blog` },
};

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />

      <div className="bg-[#e3ebf9]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <h1 className="mb-2 text-3xl font-bold sm:text-4xl">Blog</h1>
            <p className="text-lg text-white/70">
              Expert visa guides, travel tips, and industry updates
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <BlogList posts={blogPosts} />
        </div>
      </div>
    </>
  );
}
