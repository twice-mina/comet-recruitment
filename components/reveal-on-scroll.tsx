"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type AnimationVariant = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-in";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number; // delay in ms
  duration?: number; // duration in ms
  as?: keyof JSX.IntrinsicElements;
}

const variantStyles: Record<AnimationVariant, { hidden: string; visible: string }> = {
  "fade-up": {
    hidden: "opacity-0 translate-y-6",
    visible: "opacity-100 translate-y-0",
  },
  "fade-in": {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
  "fade-left": {
    hidden: "opacity-0 -translate-x-6",
    visible: "opacity-100 translate-x-0",
  },
  "fade-right": {
    hidden: "opacity-0 translate-x-6",
    visible: "opacity-100 translate-x-0",
  },
  "scale-in": {
    hidden: "opacity-0 scale-95",
    visible: "opacity-100 scale-100",
  },
};

export function RevealOnScroll({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  as: Tag = "div",
}: RevealOnScrollProps) {
  const [ref, isInView] = useInView<HTMLDivElement>();
  const styles = variantStyles[variant];

  return (
    // @ts-expect-error dynamic tag
    <Tag
      ref={ref}
      className={cn(
        "transition-all will-change-[opacity,transform]",
        isInView ? styles.visible : styles.hidden,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </Tag>
  );
}

// Staggered children wrapper - wraps each child with a delay
interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  staggerDelay?: number; // ms between each child
  baseDelay?: number;
  duration?: number;
}

export function StaggerChildren({
  children,
  className,
  variant = "fade-up",
  staggerDelay = 100,
  baseDelay = 0,
  duration = 600,
}: StaggerChildrenProps) {
  const [ref, isInView] = useInView<HTMLDivElement>();
  const styles = variantStyles[variant];
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, i) => (
        <div
          key={i}
          className={cn(
            "transition-all will-change-[opacity,transform]",
            isInView ? styles.visible : styles.hidden
          )}
          style={{
            transitionDuration: `${duration}ms`,
            transitionDelay: `${baseDelay + i * staggerDelay}ms`,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
