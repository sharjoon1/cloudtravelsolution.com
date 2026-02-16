import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ChevronRight,
  Calendar,
  User,
  Clock,
  Tag,
  ArrowRight,
} from "lucide-react";

import { generateBreadcrumbSchema } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";
import {
  getBlogPostBySlug,
  getAllBlogSlugs,
  getRelatedPosts,
} from "@/lib/blog-data";
import { ShareButtons } from "./share-buttons";

// ---------------------------------------------------------------------------
// Static generation helpers
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | ${SITE_CONFIG.name}`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${SITE_CONFIG.name}`,
      description: post.excerpt,
      url: `${SITE_CONFIG.url}/blog/${post.slug}`,
      siteName: SITE_CONFIG.name,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page component (server)
// ---------------------------------------------------------------------------

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/images/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category.replace(/-/g, " "),
  };

  const shareUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-sm"
            >
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                  )}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-muted-foreground hover:text-[var(--color-primary)] transition-colors whitespace-nowrap"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>

        {/* Post header */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-white/15 backdrop-blur rounded-full mb-4">
                {post.category.replace(/-/g, " ")}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
                {post.title}
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Article body */}
            <div className="lg:col-span-2">
              <article
                className="prose prose-lg max-w-none
                  prose-headings:text-foreground prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-foreground/80 prose-p:leading-relaxed
                  prose-li:text-foreground/80
                  prose-strong:text-foreground
                  prose-a:text-[var(--color-primary)] prose-a:no-underline hover:prose-a:underline
                  prose-ul:my-4 prose-li:my-1"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="mt-10 pt-8 border-t border-border">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-[var(--color-muted)] text-muted-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share buttons */}
              <div className="mt-6 pt-6 border-t border-border">
                <ShareButtons url={shareUrl} title={post.title} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* CTA — Book consultation */}
                <div className="p-6 rounded-xl border border-border bg-white shadow-sm">
                  <h3 className="font-semibold text-foreground mb-1">
                    Need Visa Help?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get expert guidance from our visa specialists. Free
                    consultation, no obligations.
                  </p>
                  <Link
                    href="/inquiry/visa"
                    className="block w-full text-center px-5 py-3 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold rounded-lg transition-colors text-sm"
                  >
                    Book Free Consultation
                  </Link>
                  <Link
                    href="/contact/callback"
                    className="block w-full text-center px-5 py-3 mt-2 border border-border text-foreground/80 font-medium rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm"
                  >
                    Request Callback
                  </Link>
                </div>

                {/* Contact info */}
                <div className="p-6 rounded-xl border border-border bg-[var(--color-muted)]">
                  <h3 className="font-semibold text-foreground mb-3">
                    Contact Our Visa Team
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      <strong>Toll Free:</strong> {SITE_CONFIG.tollFree}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Email:</strong> visa@cloudtravelsolution.com
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Hours:</strong> Mon-Sat, 9 AM - 6 PM
                    </p>
                  </div>
                </div>

                {/* Back to blog */}
                <div className="p-6 rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-3">
                    Explore More
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/blog"
                      className="flex items-center gap-2 text-sm text-foreground/70 hover:text-[var(--color-primary)] transition-colors"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                      All Blog Posts
                    </Link>
                    <Link
                      href="/visa"
                      className="flex items-center gap-2 text-sm text-foreground/70 hover:text-[var(--color-primary)] transition-colors"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                      Visa Services
                    </Link>
                    <Link
                      href="/services"
                      className="flex items-center gap-2 text-sm text-foreground/70 hover:text-[var(--color-primary)] transition-colors"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                      All Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="border-t border-border bg-[var(--color-muted)]/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.slice(0, 3).map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col rounded-xl border border-border bg-white hover:border-[var(--color-primary)]/30 hover:shadow-lg transition-all overflow-hidden"
                  >
                    {/* Placeholder image */}
                    <div className="h-40 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 flex items-center justify-center">
                      <Tag className="h-8 w-8 text-[var(--color-primary)]/30" />
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full">
                          {related.category.replace(/-/g, " ")}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {related.readTime}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-foreground group-hover:text-[var(--color-primary)] transition-colors mb-2 line-clamp-2">
                        {related.title}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-2">
                        {related.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" />
                          {new Date(related.publishedAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
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
        )}

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Need Visa Assistance?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Our visa experts have helped thousands of Indian travellers secure
              visas for 50+ countries. Book a free consultation and let us
              handle the paperwork.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/inquiry/visa"
                className="px-8 py-3 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold rounded-lg transition-colors text-sm"
              >
                Book Free Consultation
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
