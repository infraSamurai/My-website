"use client";
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  animation?: 'slideUp' | 'fadeIn' | 'scaleIn' | 'rotateIn';
}

export default function SplitText({
  text,
  className = '',
  delay = 0,
  duration = 0.6,
  staggerDelay = 0.02,
  animation = 'slideUp'
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words = text.split(' ');

  const getAnimationVariants = () => {
    switch (animation) {
      case 'fadeIn':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case 'scaleIn':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 }
        };
      case 'rotateIn':
        return {
          hidden: { opacity: 0, rotateY: 90 },
          visible: { opacity: 1, rotateY: 0 }
        };
      default: // slideUp
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  const variants = getAnimationVariants();

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-2 last:mr-0">
          <motion.span
            className="inline-block"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{
              duration,
              delay: delay + i * staggerDelay,
              ease: "easeOut"
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}