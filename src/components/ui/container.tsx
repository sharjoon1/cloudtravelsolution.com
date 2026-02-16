import * as React from "react";
import { cn } from "@/lib/utils";

const containerSizes = {
  sm: "max-w-3xl",      // 768px
  md: "max-w-5xl",      // 1024px
  lg: "max-w-6xl",      // 1152px — closest Tailwind default to 1280
  xl: "max-w-[1400px]", // 1400px
  full: "max-w-full",
} as const;

type ContainerSize = keyof typeof containerSizes;

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width of the container */
  size?: ContainerSize;
  /** Render as a semantic HTML element */
  as?: "div" | "section" | "main" | "article";
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "xl", as: Tag = "div", ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        containerSizes[size],
        className
      )}
      {...props}
    />
  )
);

Container.displayName = "Container";

export { Container, containerSizes };
