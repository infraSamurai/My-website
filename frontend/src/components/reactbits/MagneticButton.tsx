"use client";
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  range?: number;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  range = 100,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md'
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(springY, [-range, range], [10, -10]);
  const rotateY = useTransform(springX, [-range, range], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    
    if (distance < range) {
      x.set(mouseX * strength);
      y.set(mouseY * strength);
    }
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    x.set(0);
    y.set(0);
  };

  const variantClasses = {
    primary: 'bg-nature-accent text-white hover:shadow-lg',
    secondary: 'bg-nature-secondary text-white hover:shadow-lg',
    ghost: 'bg-transparent border-2 border-nature-accent text-nature-accent hover:bg-nature-accent hover:text-white',
    outline: 'bg-transparent border-2 border-nature-secondary text-nature-secondary hover:bg-nature-secondary hover:text-white'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      ref={ref}
      className={`
        relative rounded-full font-semibold transition-all duration-300 
        ${variantClasses[variant]} 
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
        ${className}
      `}
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Magnetic attraction indicator */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/20 opacity-0"
        animate={{
          opacity: [0, 0.3, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.button>
  );
}