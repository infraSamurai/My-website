"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  offset?: number;
  opacity?: boolean;
  scale?: boolean;
  rotate?: boolean;
}

export default function ParallaxText({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
  offset = 0,
  opacity = false,
  scale = false,
  rotate = false
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const getTransform = () => {
    const range = 100 * speed;
    
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [range + offset, -range + offset]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [-range + offset, range + offset]);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [range + offset, -range + offset]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [-range + offset, range + offset]);
      default:
        return useTransform(scrollYProgress, [0, 1], [range + offset, -range + offset]);
    }
  };

  const transform = getTransform();
  
  const opacityValue = opacity 
    ? useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])
    : 1;
    
  const scaleValue = scale 
    ? useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
    : 1;
    
  const rotateValue = rotate 
    ? useTransform(scrollYProgress, [0, 1], [0, 360])
    : 0;

  const motionProps = {
    style: {
      opacity: opacityValue,
      scale: scaleValue,
      rotate: rotateValue,
      ...(direction === 'up' || direction === 'down' 
        ? { y: transform }
        : { x: transform }
      )
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}