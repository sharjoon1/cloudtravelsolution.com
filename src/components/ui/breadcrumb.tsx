import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { generateBreadcrumbSchema } from "@/lib/seo";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Include Schema.org structured data */
  withSchema?: boolean;
}

export function Breadcrumb({ items, withSchema = true }: BreadcrumbProps) {
  return (
    <>
      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbSchema(items)),
          }}
        />
      )}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
            {items.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                )}
                {i === 0 ? (
                  <Link
                    href={crumb.href}
                    className="text-muted-foreground hover:text-[var(--color-primary)] transition-colors"
                    title={crumb.name}
                  >
                    <Home className="h-3.5 w-3.5" />
                  </Link>
                ) : i === items.length - 1 ? (
                  <span className="text-foreground font-medium truncate max-w-[200px]">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-muted-foreground hover:text-[var(--color-primary)] transition-colors"
                  >
                    {crumb.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
