"use client";
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'rotate' | 'none';
  delay?: number;
  duration?: number;
  background?: 'glass' | 'dark' | 'gradient';
  onClick?: () => void;
}

export default function AnimatedCard({
  children,
  className = '',
  hoverEffect = 'lift',
  delay = 0,
  duration = 0.5,
  background = 'glass',
  onClick
}: AnimatedCardProps) {
  const backgroundClasses = {
    glass: 'bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl',
    dark: 'bg-brand-neutral-800/50 backdrop-blur-md border border-brand-neutral-700/50 shadow-xl',
    gradient: 'bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 backdrop-blur-lg border border-brand-primary/20 shadow-2xl'
  };

  const hoverVariants = {
    lift: {
      y: -10,
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.3 }
    },
    glow: {
      boxShadow: [
        '0 0 20px rgba(79, 70, 229, 0.3)',
        '0 0 40px rgba(79, 70, 229, 0.5)',
        '0 0 20px rgba(79, 70, 229, 0.3)'
      ],
      transition: { duration: 1.5, repeat: Infinity }
    },
    scale: {
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    rotate: {
      rotate: [0, 1, -1, 0],
      scale: 1.02,
      transition: { duration: 0.4 }
    },
    none: {}
  };

  return (
    <motion.div
      className={`
        ${backgroundClasses[background]}
        rounded-2xl p-6 ${onClick ? 'cursor-pointer' : ''} overflow-hidden
        ${className}
      `}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
      whileHover={hoverEffect !== 'none' ? hoverVariants[hoverEffect] : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}