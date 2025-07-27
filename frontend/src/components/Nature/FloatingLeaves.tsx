"use client";
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';

// Professional SVG Leaf Component
const LeafSVG = ({ className = "", color = "#9CAF88" }: { className?: string, color?: string }) => (
  <svg 
    className={className}
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none"
  >
    <path
      d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22.35C8.1 16.7 10.64 12.38 17.16 10.93C22.38 9.75 22.75 4.25 22.75 4.25S17.25 4.63 17 8Z"
      fill={color}
      opacity="0.8"
    />
    <path
      d="M12.5 2C12.5 2 10.5 4.5 12.5 8.5C14.5 12.5 18 14 18 14"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

// Cherry Blossom SVG
const CherryBlossomSVG = ({ className = "", color = "#F8BBD9" }: { className?: string, color?: string }) => (
  <svg 
    className={className}
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none"
  >
    <circle cx="10" cy="10" r="2" fill={color} opacity="0.9"/>
    <path
      d="M10 6C10 6 8 8 10 10C12 8 10 6 10 6Z"
      fill={color}
      opacity="0.7"
    />
    <path
      d="M14 10C14 10 12 8 10 10C12 12 14 10 14 10Z"
      fill={color}
      opacity="0.7"
    />
    <path
      d="M10 14C10 14 12 12 10 10C8 12 10 14 10 14Z"
      fill={color}
      opacity="0.7"
    />
    <path
      d="M6 10C6 10 8 12 10 10C8 8 6 10 6 10Z"
      fill={color}
      opacity="0.7"
    />
    <path
      d="M8.5 7.5C8.5 7.5 9.5 8.5 10 10C9.5 8.5 8.5 7.5 8.5 7.5Z"
      fill={color}
      opacity="0.6"
    />
  </svg>
);

// Bamboo SVG
const BambooSVG = ({ className = "", color = "#4A7C59" }: { className?: string, color?: string }) => (
  <svg 
    className={className}
    width="16" 
    height="32" 
    viewBox="0 0 16 32" 
    fill="none"
  >
    <rect x="6" y="0" width="4" height="32" fill={color} opacity="0.8" rx="2"/>
    <line x1="4" y1="8" x2="12" y2="8" stroke={color} strokeWidth="1" opacity="0.6"/>
    <line x1="4" y1="16" x2="12" y2="16" stroke={color} strokeWidth="1" opacity="0.6"/>
    <line x1="4" y1="24" x2="12" y2="24" stroke={color} strokeWidth="1" opacity="0.6"/>
  </svg>
);

// Professional Floating Leaf Animation
export const FloatingLeaf = ({ 
  children, 
  delay = 0,
  leafType = 'leaf',
  intensity = 'gentle' 
}: { 
  children: React.ReactNode, 
  delay?: number,
  leafType?: 'leaf' | 'cherry' | 'bamboo',
  intensity?: 'gentle' | 'medium' | 'strong'
}) => {
  const intensityConfig = {
    gentle: { y: [-3, 3, -3], rotate: [-0.5, 0.5, -0.5], duration: 6 },
    medium: { y: [-6, 6, -6], rotate: [-1, 1, -1], duration: 4 },
    strong: { y: [-10, 10, -10], rotate: [-2, 2, -2], duration: 3 }
  };

  const config = intensityConfig[intensity];

  return (
    <motion.div
      className="relative"
      initial={{ y: 0, rotate: 0 }}
      animate={{ 
        y: config.y,
        rotate: config.rotate
      }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    >
      {children}
      
      {/* Floating Nature Elements */}
      <motion.div
        className="absolute -top-2 -right-2 pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 1, duration: 0.5 }}
      >
        {leafType === 'leaf' && <LeafSVG className="w-4 h-4" />}
        {leafType === 'cherry' && <CherryBlossomSVG className="w-3 h-3" />}
        {leafType === 'bamboo' && <BambooSVG className="w-2 h-4" />}
      </motion.div>
    </motion.div>
  );
};

// Professional Floating Elements Background
export const FloatingBackground = ({ 
  density = 'low',
  className = ""
}: { 
  density?: 'low' | 'medium' | 'high',
  className?: string 
}) => {
  const [elements, setElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    type: 'leaf' | 'cherry' | 'bamboo';
    delay: number;
    size: number;
  }>>([]);

  useEffect(() => {
    const densityCount = { low: 8, medium: 15, high: 25 };
    const count = densityCount[density];
    
    const newElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      type: (['leaf', 'cherry', 'bamboo'] as const)[Math.floor(Math.random() * 3)],
      delay: Math.random() * 5,
      size: 0.5 + Math.random() * 0.8
    }));
    
    setElements(newElements);
  }, [density]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            transform: `scale(${element.size})`
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            y: [0, -8, 0],
            scale: [1, 1.02, 1],
            rotate: [0, 2, 0]
          }}
          transition={{
            duration: 25 + Math.random() * 15,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        >
          {element.type === 'leaf' && (
            <LeafSVG 
              className="w-6 h-6" 
              color={`rgba(156, 175, 136, ${0.2 + Math.random() * 0.3})`} 
            />
          )}
          {element.type === 'cherry' && (
            <CherryBlossomSVG 
              className="w-5 h-5" 
              color={`rgba(248, 187, 217, ${0.2 + Math.random() * 0.3})`} 
            />
          )}
          {element.type === 'bamboo' && (
            <BambooSVG 
              className="w-4 h-8" 
              color={`rgba(74, 124, 89, ${0.2 + Math.random() * 0.3})`} 
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Professional Particle System
export const NatureParticles = ({ theme = 'spring' }: { theme?: 'spring' | 'autumn' | 'zen' }) => {
  const themeConfig = {
    spring: { colors: ['#9CAF88', '#F8BBD9', '#4A7C59'], count: 20 },
    autumn: { colors: ['#D2B48C', '#CD853F', '#F4A460'], count: 25 },
    zen: { colors: ['#E8E8E8', '#9CAF88', '#8B7355'], count: 15 }
  };

  const config = themeConfig[theme];
  const [particles, setParticles] = useState<Array<any>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: config.count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      size: 2 + Math.random() * 4,
      duration: 8 + Math.random() * 6
    }));
    
    setParticles(newParticles);
  }, [theme, config]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            bottom: '0%',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color
          }}
          initial={{ y: 0, opacity: 0.8 }}
          animate={{ 
            y: -window.innerHeight - 100,
            opacity: [0.8, 1, 0],
            x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};