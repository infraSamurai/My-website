"use client";
import { motion } from 'framer-motion';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  direction?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl';
  animate?: boolean;
  duration?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
}

export default function GradientText({
  children,
  className = '',
  colors = ['#4F46E5', '#8B5CF6', '#06B6D4'],
  direction = 'to-r',
  animate = false,
  duration = 3000,
  size = 'md',
  weight = 'normal'
}: GradientTextProps) {
  const gradientColors = colors.join(', ');
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl'
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold'
  };

  const baseStyles = {
    background: `linear-gradient(${direction}, ${gradientColors})`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: animate ? '200% 200%' : '100% 100%',
  };

  const AnimatedComponent = motion.span;

  return (
    <AnimatedComponent
      className={`inline-block ${sizeClasses[size]} ${weightClasses[weight]} ${className}`}
      style={baseStyles}
      animate={animate ? {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      } : {}}
      transition={animate ? {
        duration: duration / 1000,
        repeat: Infinity,
        ease: "linear"
      } : {}}
    >
      {children}
    </AnimatedComponent>
  );
}