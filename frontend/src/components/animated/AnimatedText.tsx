"use client";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

interface AnimatedTextProps {
  text: string;
  className?: string;
  animation?: 'fade' | 'slide' | 'typewriter' | 'morphing' | 'stagger' | 'wave';
  delay?: number;
  duration?: number;
  gradient?: boolean;
  shimmer?: boolean;
}

export default function AnimatedText({
  text,
  className = '',
  animation = 'fade',
  delay = 0,
  duration = 0.8,
  gradient = false,
  shimmer = false
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (animation === 'typewriter') {
      let currentIndex = 0;
      setDisplayText('');
      
      const typeWriter = () => {
        if (currentIndex < text.length) {
          setDisplayText(prev => prev + text.charAt(currentIndex));
          currentIndex++;
          setTimeout(typeWriter, 100);
        }
      };
      
      setTimeout(() => typeWriter(), delay * 1000);
    } else if (animation === 'morphing' && textRef.current) {
      const element = textRef.current;
      element.innerHTML = text.split('').map((char, i) => 
        `<span style="display:inline-block; opacity:0; transform:translateY(20px);">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');

      // Use anime.js for morphing animation
      setTimeout(() => {
        animate(element.querySelectorAll('span'), {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: stagger(50),
          duration: 800,
          easing: 'easeOutExpo'
        });
      }, delay * 1000);
    } else if (animation === 'wave' && textRef.current) {
      const element = textRef.current;
      element.innerHTML = text.split('').map((char, i) => 
        `<span style="display:inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');

      // Use anime.js for wave animation
      setTimeout(() => {
        animate(element.querySelectorAll('span'), {
          translateY: [0, -10, 0],
          delay: stagger(100),
          duration: 2000,
          easing: 'easeInOutSine',
          loop: true
        });
      }, delay * 1000);
    }
  }, [text, animation, delay, duration]);

  const textClasses = `
    ${gradient ? 'bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent' : ''}
    ${shimmer ? 'text-shimmer' : ''}
    ${className}
  `;

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const staggerChildVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (animation === 'stagger') {
    return (
      <motion.div
        className={textClasses}
        variants={staggerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {text.split(' ').map((word, i) => (
          <motion.span
            key={i}
            variants={staggerChildVariants}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (animation === 'typewriter') {
    return (
      <div className={textClasses}>
        {displayText}
        <span className="animate-pulse">|</span>
      </div>
    );
  }

  if (animation === 'morphing' || animation === 'wave') {
    return (
      <div ref={textRef} className={textClasses} />
    );
  }

  const motionVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    slide: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 }
    }
  };

  return (
    <motion.div
      className={textClasses}
      initial={motionVariants[animation]?.initial}
      whileInView={motionVariants[animation]?.animate}
      viewport={{ once: true }}
      transition={{ duration, delay }}
    >
      {text}
    </motion.div>
  );
}