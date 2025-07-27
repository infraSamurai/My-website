"use client";
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  separator?: string;
  decimals?: number;
}

export default function CountUp({
  to,
  from = 0,
  duration = 2,
  className = '',
  suffix = '',
  prefix = '',
  separator = ',',
  decimals = 0
}: CountUpProps) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;

    hasAnimated.current = true;
    const startTime = Date.now();
    const startValue = from;
    const endValue = to;
    const totalDuration = duration * 1000; // Convert to milliseconds

    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4);
    };

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      
      const easedProgress = easeOutQuart(progress);
      const currentValue = startValue + (endValue - startValue) * easedProgress;
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, from, to, duration]);

  const formatNumber = (num: number): string => {
    const rounded = decimals > 0 ? num.toFixed(decimals) : Math.floor(num).toString();
    
    if (separator && num >= 1000) {
      return rounded.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }
    
    return rounded;
  };

  return (
    <span ref={ref} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}