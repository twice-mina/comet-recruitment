"use client";

import { useCountUp } from "@/hooks/use-count-up";

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({ target, suffix = "", prefix = "", duration = 1500, className }: CountUpProps) {
  const { ref, count } = useCountUp(target, duration);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
