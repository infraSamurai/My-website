"use client";
import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

// AnimatedCard Component
interface AnimatedCardProps {
  children: ReactNode;
  background?: 'gradient' | 'glass' | 'solid';
  hoverEffect?: 'lift' | 'scale' | 'glow';
  className?: string;
  onClick?: () => void;
}

export const AnimatedCard = ({ 
  children, 
  background = 'solid', 
  hoverEffect = 'lift', 
  className = '',
  onClick
}: AnimatedCardProps) => {
  const getBackgroundClass = () => {
    switch (background) {
      case 'gradient':
        return 'bg-gradient-to-br from-nature-secondary/50 to-nature-accent/20 backdrop-blur-sm';
      case 'glass':
        return 'bg-nature-card/80 backdrop-blur-md border border-nature-accent/20';
      default:
        return 'bg-nature-card border border-nature-accent/30';
    }
  };

  const getHoverEffect = () => {
    switch (hoverEffect) {
      case 'scale':
        return { scale: 1.05 };
      case 'glow':
        return { scale: 1.02, boxShadow: '0 20px 40px rgba(74, 124, 89, 0.2)' };
      default:
        return { y: -8 };
    }
  };

  return (
    <motion.div
      className={`rounded-2xl p-6 shadow-lg transition-all duration-300 ${getBackgroundClass()} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      whileHover={getHoverEffect()}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

// ScrollReveal Component
interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale';
  delay?: number;
  className?: string;
}

export const ScrollReveal = ({ 
  children, 
  animation = 'fadeUp', 
  delay = 0, 
  className = '' 
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getAnimation = () => {
    switch (animation) {
      case 'fadeLeft':
        return {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 }
        };
      case 'fadeRight':
        return {
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0 }
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 }
        };
      default:
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 }
        };
    }
  };

  const { initial, animate } = getAnimation();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
    >
      {children}
    </motion.div>
  );
};

// AnimatedText Component
interface AnimatedTextProps {
  text: string;
  className?: string;
  animation?: 'fadeIn' | 'morphing' | 'typewriter' | 'stagger';
  gradient?: boolean;
  duration?: number;
  [key: string]: any;
}

export const AnimatedText = ({ 
  text, 
  className = '', 
  animation = 'fadeIn', 
  gradient = false,
  duration = 0.8,
  ...props
}: AnimatedTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const textClass = gradient 
    ? `${className} bg-gradient-to-r from-nature-accent via-nature-primary to-bamboo-fresh bg-clip-text text-transparent`
    : `${className} text-nature-primary`;

  if (animation === 'typewriter') {
    return (
      <motion.div
        ref={ref}
        className={textClass}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: duration }}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (animation === 'stagger') {
    return (
      <motion.div
        ref={ref}
        className={textClass}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {text.split(' ').map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (animation === 'morphing') {
    return (
      <motion.h1
        ref={ref}
        className={`${textClass} font-japanese`}
        initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
        animate={isInView ? { 
          opacity: 1, 
          scale: 1, 
          rotateX: 0 
        } : { 
          opacity: 0, 
          scale: 0.8, 
          rotateX: -90 
        }}
        transition={{ 
          duration: duration * 1.5, 
          type: "spring", 
          stiffness: 100,
          damping: 15
        }}
      >
        {text}
      </motion.h1>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={textClass}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: duration, type: "spring", stiffness: 100 }}
    >
      {text}
    </motion.div>
  );
};

// AnimatedButton Component
interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  [key: string]: any;
}

export const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: AnimatedButtonProps) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-nature-secondary text-nature-primary border border-nature-accent';
      case 'ghost':
        return 'bg-transparent text-nature-accent border border-nature-accent hover:bg-nature-accent hover:text-white';
      default:
        return 'btn-nature';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3';
    }
  };

  return (
    <motion.button
      className={`${getVariantClass()} ${getSizeClass()} rounded-xl font-medium transition-all duration-300 ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
};

// FloatingElements Component
interface FloatingElementsProps {
  theme?: 'achievement' | 'nature' | 'academic' | 'education' | 'general';
  density?: 'low' | 'medium' | 'high';
  className?: string;
}

export const FloatingElements = ({ 
  theme = 'nature', 
  density = 'medium',
  className = ''
}: FloatingElementsProps) => {
  const getElements = () => {
    switch (theme) {
      case 'achievement':
        return ['🏆', '🌟', '🎖️', '⭐', '🏅'];
      case 'academic':
      case 'education':
        return ['📚', '🎓', '✏️', '🔬', '📐'];
      case 'general':
        return ['🎨', '📸', '🖼️', '✨', '🎭'];
      default:
        return ['🌸', '🍃', '🌿', '🦋', '🌺'];
    }
  };

  const getElementCount = () => {
    switch (density) {
      case 'low':
        return 3;
      case 'high':
        return 8;
      default:
        return 5;
    }
  };

  const elements = getElements();
  const count = getElementCount();

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-10"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        >
          {elements[i % elements.length]}
        </motion.div>
      ))}
    </div>
  );
};

// Additional animated components for compatibility
export const RibbonFlow = ({ className = '', ...props }: { className?: string; [key: string]: any }) => (
  <div className={`absolute inset-0 pointer-events-none ${className}`}>
    <motion.div
      className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-nature-accent to-transparent opacity-20"
      animate={{ x: [-100, typeof window !== 'undefined' ? window.innerWidth : 1000] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export const MorphingBackground = ({ className = '', ...props }: { className?: string; [key: string]: any }) => (
  <div className={`absolute inset-0 overflow-hidden ${className}`}>
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-nature-secondary/20 to-nature-accent/20"
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

export const MolecularStructure = ({ className = '', ...props }: { className?: string; [key: string]: any }) => (
  <div className={`absolute inset-0 pointer-events-none ${className}`}>
    {Array.from({ length: 6 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-nature-accent rounded-full opacity-30"
        style={{
          left: `${20 + i * 15}%`,
          top: `${30 + i * 10}%`,
        }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
      />
    ))}
  </div>
);

export const TimelineAnimation = ({ className = '', ...props }: { className?: string; [key: string]: any }) => (
  <div className={`relative ${className}`}>
    <motion.div
      className="absolute left-4 top-0 w-0.5 h-full bg-nature-accent"
      initial={{ height: 0 }}
      animate={{ height: '100%' }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
  </div>
);

export const QuantumField = ({ className = '', ...props }: { className?: string; [key: string]: any }) => (
  <div className={`absolute inset-0 pointer-events-none ${className}`}>
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-nature-accent rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0]
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          delay: Math.random() * 2
        }}
      />
    ))}
  </div>
);

export const ArtisticBrush = ({ className = '', ...props }: { className?: string; [key: string]: any }) => (
  <motion.div
    className={`absolute top-0 left-0 w-full h-full pointer-events-none ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.3, 0] }}
    transition={{ duration: 5, repeat: Infinity }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cherry-whisper/20 to-transparent" />
  </motion.div>
);

export const NaturalPhenomena = ({ className = '', ...props }: { className?: string; [key: string]: any }) => (
  <div className={`absolute inset-0 pointer-events-none ${className}`}>
    <motion.div
      className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-nature-accent/10"
      animate={{ scale: [1, 2, 1], opacity: [0.1, 0.3, 0.1] }}
      transition={{ duration: 8, repeat: Infinity }}
    />
  </div>
);

export const LiteraryFlow = ({ className = '', ...props }: { className?: string; [key: string]: any }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
    <motion.div
      className="absolute top-0 left-0 text-nature-accent/20 text-6xl font-traditional"
      animate={{ x: [-50, 50], y: [0, 20, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    >
      文
    </motion.div>
  </div>
);