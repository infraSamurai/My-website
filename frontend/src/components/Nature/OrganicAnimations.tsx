"use client";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

// Gentle leaf floating animation
export const FloatingLeaf = ({ children, delay = 0 }: { children: ReactNode, delay?: number }) => {
  return (
    <motion.div
      initial={{ y: 0, rotate: 0 }}
      animate={{ 
        y: [-5, 5, -5],
        rotate: [-1, 1, -1]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Organic fade-in with natural easing
export const OrganicFadeIn = ({ 
  children, 
  direction = 'up',
  delay = 0 
}: { 
  children: ReactNode, 
  direction?: 'up' | 'down' | 'left' | 'right',
  delay?: number 
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const directionOffset = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        ...directionOffset[direction]
      }}
      animate={inView ? { 
        opacity: 1, 
        x: 0, 
        y: 0 
      } : {}}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] // Natural easing curve
      }}
    >
      {children}
    </motion.div>
  );
};

// Breathing animation for call-to-action elements
export const BreathingElement = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      animate={{ 
        scale: [1, 1.02, 1]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Water ripple effect for button interactions
export const RippleButton = ({ 
  children, 
  onClick,
  className = ""
}: { 
  children: ReactNode, 
  onClick?: () => void,
  className?: string 
}) => {
  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full"
        initial={{ scale: 0, opacity: 1 }}
        whileHover={{ 
          scale: 1.5, 
          opacity: 0 
        }}
        transition={{ duration: 0.6 }}
      />
      {children}
    </motion.button>
  );
};

// Staggered children animation
export const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1 
}: { 
  children: ReactNode, 
  staggerDelay?: number 
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerChild = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Parallax scroll effect
export const ParallaxElement = ({ 
  children, 
  speed = 0.5 
}: { 
  children: ReactNode, 
  speed?: number 
}) => {
  return (
    <motion.div
      style={{ 
        y: useMotionValue(0) 
      }}
      animate={{ 
        y: typeof window !== 'undefined' ? -window.scrollY * speed : 0 
      }}
      transition={{ duration: 0 }}
    >
      {children}
    </motion.div>
  );
};

// Import useMotionValue for ParallaxElement
import { useMotionValue } from 'framer-motion';

// Zen garden drawing animation (for interactive elements)
export const ZenPath = ({ 
  points = 50,
  className = ""
}: { 
  points?: number,
  className?: string 
}) => {
  return (
    <motion.svg 
      className={`absolute inset-0 pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M 0 50 Q 25 25 50 50 Q 75 75 100 50"
        fill="none"
        stroke="rgba(156, 175, 136, 0.3)"
        strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ 
          duration: 3, 
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.svg>
  );
};

// Nature-inspired hover card
export const NatureCard = ({ 
  children, 
  className = "" 
}: { 
  children: ReactNode, 
  className?: string 
}) => {
  return (
    <motion.div
      className={`card-nature ${className}`}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};