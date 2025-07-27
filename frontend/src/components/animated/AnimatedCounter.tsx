"use client";
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
  delay?: number;
  decimals?: number;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  className = '',
  duration = 2,
  delay = 0,
  decimals = 0
}: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return Math.round(latest * Math.pow(10, decimals)) / Math.pow(10, decimals);
  });
  const displayValue = useTransform(rounded, (latest) => {
    return `${prefix}${latest.toFixed(decimals)}${suffix}`;
  });
  
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const controls = animate(count, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (nodeRef.current) {
            nodeRef.current.textContent = `${prefix}${Math.round(latest * Math.pow(10, decimals)) / Math.pow(10, decimals)}${suffix}`;
          }
        }
      });
      return controls.stop;
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [count, value, duration, delay, prefix, suffix, decimals]);

  return (
    <motion.span
      ref={nodeRef}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {prefix}0{suffix}
    </motion.span>
  );
}