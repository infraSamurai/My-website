"use client";
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  border?: boolean;
  glow?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  blur = 'md',
  opacity = 0.1,
  border = true,
  glow = false
}: GlassCardProps) {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  const borderClass = border ? 'border border-white/20 dark:border-gray-700/30' : '';
  const glowClass = glow ? 'shadow-2xl shadow-nature-accent/20' : '';

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-xl
        ${blurClasses[blur]}
        ${borderClass}
        ${glowClass}
        ${className}
      `}
      style={{
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: `blur(${blur === 'sm' ? '4px' : blur === 'md' ? '8px' : blur === 'lg' ? '12px' : '16px'})`
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={hover ? {
        y: -5,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      } : {}}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Animated border */}
      {border && (
        <div className="absolute inset-0 rounded-xl border border-transparent bg-gradient-to-r from-nature-accent/20 via-transparent to-nature-secondary/20 bg-clip-border">
          <div className="absolute inset-[1px] rounded-xl bg-transparent" />
        </div>
      )}
    </motion.div>
  );
}