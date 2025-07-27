"use client";
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { useState, useRef } from 'react';
import { ReactNode } from 'react';

interface RippleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'nature' | 'zen';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const RippleButton = ({ 
  children, 
  onClick,
  className = "",
  variant = 'nature',
  size = 'md',
  disabled = false
}: RippleButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-sage-soft hover:bg-bamboo-fresh text-white',
    secondary: 'bg-transparent border-2 border-sage-soft text-sage-soft hover:bg-sage-soft hover:text-white',
    nature: 'btn-nature',
    zen: 'bg-stone-calm hover:bg-earth-warm text-earth-warm hover:text-white'
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 800);

    onClick?.();
  };

  const [springProps, setSpringProps] = useSpring(() => ({
    scale: 1,
    config: { tension: 300, friction: 10 }
  }));

  return (
    <animated.button
      ref={buttonRef}
      className={`
        relative overflow-hidden rounded-2xl font-medium transition-all duration-300
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}
        ${className}
      `}
      style={springProps}
      onClick={handleClick}
      onMouseDown={() => setSpringProps({ scale: 0.95 })}
      onMouseUp={() => setSpringProps({ scale: 1 })}
      onMouseLeave={() => setSpringProps({ scale: 1 })}
      disabled={disabled}
    >
      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Water Ripple Effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className={`absolute rounded-full pointer-events-none ${
            variant === 'nature' || variant === 'primary' 
              ? 'bg-white/70 dark:bg-white/80' 
              : 'bg-sage-soft/60 dark:bg-moss-glow/60'
          }`}
          style={{
            left: ripple.x - 15,
            top: ripple.y - 15,
            width: 30,
            height: 30
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 15, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      ))}

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent rounded-2xl opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </animated.button>
  );
};

// Enhanced CTA Button with Breathing Animation
export const BreathingCTA = ({ 
  children, 
  onClick,
  className = "",
  intensity = 'gentle'
}: { 
  children: ReactNode, 
  onClick?: () => void,
  className?: string,
  intensity?: 'gentle' | 'medium' | 'strong'
}) => {
  const intensityConfig = {
    gentle: { scale: [1, 1.02, 1], duration: 4 },
    medium: { scale: [1, 1.05, 1], duration: 3 },
    strong: { scale: [1, 1.08, 1], duration: 2 }
  };

  const config = intensityConfig[intensity];

  return (
    <motion.div
      animate={{ scale: config.scale }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <RippleButton
        onClick={onClick}
        className={`shadow-glow-gentle ${className}`}
        variant="nature"
        size="lg"
      >
        {children}
      </RippleButton>
    </motion.div>
  );
};

// Professional Floating Action Button
export const FloatingActionButton = ({ 
  children, 
  onClick,
  position = 'bottom-right',
  className = ""
}: { 
  children: ReactNode, 
  onClick?: () => void,
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left',
  className?: string
}) => {
  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6'
  };

  return (
    <motion.div
      className={`${positionClasses[position]} z-50 ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <RippleButton
          onClick={onClick}
          className="w-14 h-14 rounded-full shadow-2xl"
          variant="nature"
        >
          {children}
        </RippleButton>
      </motion.div>
    </motion.div>
  );
};

// Zen-style Toggle Button
export const ZenToggle = ({ 
  isActive, 
  onToggle,
  activeIcon,
  inactiveIcon,
  className = ""
}: { 
  isActive: boolean,
  onToggle: () => void,
  activeIcon: ReactNode,
  inactiveIcon: ReactNode,
  className?: string
}) => {
  return (
    <motion.button
      className={`
        relative p-3 rounded-full border-2 transition-all duration-500
        ${isActive 
          ? 'bg-sage-soft border-sage-soft text-white' 
          : 'bg-transparent border-stone-calm text-earth-warm hover:border-sage-soft'
        }
        ${className}
      `}
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        key={isActive ? 'active' : 'inactive'}
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: 90 }}
        transition={{ duration: 0.3 }}
      >
        {isActive ? activeIcon : inactiveIcon}
      </motion.div>
    </motion.button>
  );
};