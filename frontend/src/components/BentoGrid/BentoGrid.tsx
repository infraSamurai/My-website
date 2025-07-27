"use client";
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  delay?: number;
  interactive?: boolean;
  onClick?: () => void;
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 ${className}`}>
      {children}
    </div>
  );
}

export function BentoItem({ 
  children, 
  className = '', 
  size = 'md', 
  delay = 0,
  interactive = false,
  onClick 
}: BentoItemProps) {
  const sizeClasses = {
    sm: 'col-span-1 row-span-1',
    md: 'col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-1',
    lg: 'col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-4 row-span-2',
    xl: 'col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-6 row-span-2',
    full: 'col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-6 row-span-1'
  };

  return (
    <motion.div
      className={`
        ${sizeClasses[size]}
        bg-white/60 backdrop-blur-sm rounded-xl md:rounded-2xl border border-brand-beige-200 
        p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300
        ${interactive ? 'cursor-pointer hover:scale-[1.02]' : ''}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      onClick={onClick}
      whileHover={interactive ? { scale: 1.02 } : undefined}
    >
      {children}
    </motion.div>
  );
}

export default BentoGrid;