"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Tag } from "lucide-react";

interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
}

const CATEGORIES = [
  { name: "All", slug: "all" },
  { name: "Visa Guides", slug: "visa-guides" },
  { name: "Travel Tips", slug: "travel-tips" },
  { name: "Country Guides", slug: "country-guides" },
  { name: "Travel Advisories", slug: "travel-advisories" },
];

export function BlogList({ posts }: { posts: BlogPostSummary[] }) {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {/* Category filters */}
      <div className="mb-10 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setActive(cat.slug)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === cat.slug
                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                : "border-border hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Blog grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border transition-all hover:border-[var(--color-primary)]/30 hover:shadow-lg"
            >
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5">
                <Tag className="h-8 w-8 text-[var(--color-primary)]/30" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-[var(--color-primary)]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                    {post.category.replace(/-/g, " ")}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <h2 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground transition-colors group-hover:text-[var(--color-primary)]">
                  {post.title}
                </h2>
                <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <span className="flex items-center gap-1 font-medium text-[var(--color-primary)] transition-all group-hover:gap-2">
                    Read
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-muted-foreground">
          No posts in this category yet.
        </p>
      )}
    </>
  );
}
