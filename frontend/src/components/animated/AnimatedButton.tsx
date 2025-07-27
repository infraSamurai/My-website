"use client";
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  animation?: 'hover' | 'tap' | 'glow' | 'bounce';
}

export default function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  animation = 'hover'
}: AnimatedButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-gradient-primary text-white hover:shadow-glow focus:ring-brand-primary',
    secondary: 'bg-gradient-secondary text-white hover:shadow-glow focus:ring-brand-secondary',
    accent: 'bg-gradient-accent text-white hover:shadow-glow focus:ring-brand-accent',
    ghost: 'bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus:ring-brand-primary'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const animationVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 30px rgba(79, 70, 229, 0.3)',
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    },
    glow: {
      scale: 1.02,
      boxShadow: [
        '0 0 20px rgba(79, 70, 229, 0.3)',
        '0 0 40px rgba(79, 70, 229, 0.5)',
        '0 0 20px rgba(79, 70, 229, 0.3)'
      ],
      transition: { duration: 1.5, repeat: Infinity }
    },
    bounce: {
      scale: [1, 1.05, 1],
      transition: { duration: 0.6, repeat: Infinity }
    }
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={animation === 'hover' ? animationVariants.hover : undefined}
      whileTap={animation === 'tap' ? animationVariants.tap : undefined}
      animate={animation === 'glow' ? animationVariants.glow : animation === 'bounce' ? animationVariants.bounce : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.button>
  );
}