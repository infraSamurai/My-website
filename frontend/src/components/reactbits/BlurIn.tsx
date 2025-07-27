"use client";
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface BlurInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  blur?: number;
  yOffset?: number;
  trigger?: 'viewport' | 'hover' | 'immediate';
}

export default function BlurIn({
  children,
  className = '',
  delay = 0,
  duration = 1000,
  blur = 10,
  yOffset = 20,
  trigger = 'viewport'
}: BlurInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const shouldAnimate = trigger === 'immediate' || isInView;

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      initial={{
        opacity: 0,
        y: yOffset,
        filter: `blur(${blur}px)`,
      }}
      animate={shouldAnimate ? {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      } : {
        opacity: 0,
        y: yOffset,
        filter: `blur(${blur}px)`,
      }}
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}