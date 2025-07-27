"use client";
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { animate } from 'animejs';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  animationType?: 'fade' | 'slide' | 'scale' | 'rotate' | 'split' | 'typewriter';
  direction?: 'up' | 'down' | 'left' | 'right';
  stagger?: number;
  repeat?: boolean;
  trigger?: 'viewport' | 'hover' | 'immediate';
}

export default function TextReveal({
  children,
  className = '',
  delay = 0,
  duration = 1000,
  animationType = 'fade',
  direction = 'up',
  stagger = 50,
  repeat = false,
  trigger = 'viewport'
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: !repeat });

  const getMotionVariants = () => {
    switch (animationType) {
      case 'slide':
        return {
          hidden: { 
            opacity: 0, 
            y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
            x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0
          },
          visible: { opacity: 1, y: 0, x: 0 }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 }
        };
      case 'rotate':
        return {
          hidden: { opacity: 0, rotate: -10 },
          visible: { opacity: 1, rotate: 0 }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  const variants = getMotionVariants();

  if (animationType === 'split') {
    return (
      <span ref={ref} className={`inline-block ${className}`}>
        {children.split('').map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={variants}
            initial="hidden"
            animate={trigger === 'immediate' ? 'visible' : isInView ? 'visible' : 'hidden'}
            transition={{
              duration: duration / 1000,
              delay: delay / 1000 + (index * stagger) / 1000,
              ease: "easeOut"
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    );
  }

  if (animationType === 'typewriter') {
    return (
      <motion.span
        ref={ref}
        className={`inline-block ${className}`}
        initial={{ width: 0 }}
        animate={trigger === 'immediate' ? { width: 'auto' } : isInView ? { width: 'auto' } : { width: 0 }}
        transition={{
          duration: duration / 1000,
          delay: delay / 1000,
          ease: "easeOut"
        }}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={variants}
      initial="hidden"
      animate={trigger === 'immediate' ? 'visible' : isInView ? 'visible' : 'hidden'}
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.span>
  );
}