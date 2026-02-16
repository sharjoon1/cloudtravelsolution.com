import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight, Tag } from "lucide-react";

import { getAllBlogPosts } from "@/lib/blog-data";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Blog — Visa Guides, Travel Tips & Industry Updates",
  description:
    "Expert visa guides, travel tips, country guides, and industry updates from CloudTravelSolution. Stay informed about visa requirements and travel advisories.",
};

const categories = [
  { name: "All", slug: "all" },
  { name: "Visa Guides", slug: "visa-guides" },
  { name: "Travel Tips", slug: "travel-tips" },
  { name: "Country Guides", slug: "country-guides" },
  { name: "Travel Advisories", slug: "travel-advisories" },
];

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

    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Blog</h1>
          <p className="text-white/70 text-lg">
            Expert visa guides, travel tips, and industry updates
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              className="px-4 py-2 text-sm font-medium rounded-full border border-border hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl border border-border hover:border-[var(--color-primary)]/30 hover:shadow-lg transition-all overflow-hidden"
            >
              {/* Placeholder image */}
              <div className="h-48 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 flex items-center justify-center">
                <Tag className="h-8 w-8 text-[var(--color-primary)]/30" />
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full">
                    {post.category.replace("-", " ")}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-foreground group-hover:text-[var(--color-primary)] transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <span className="flex items-center gap-1 text-[var(--color-primary)] font-medium group-hover:gap-2 transition-all">
                    Read
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
