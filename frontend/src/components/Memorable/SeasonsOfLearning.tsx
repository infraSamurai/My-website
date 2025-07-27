"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Season {
  name: string;
  colors: string[];
  elements: string[];
  description: string;
  schoolPhase: string;
}

const seasons: Record<string, Season> = {
  spring: {
    name: "Spring",
    colors: ["#9CAF88", "#F8BBD9", "#E8F5E8"],
    elements: ["🌸", "🌱", "🦋", "🌿"],
    description: "New beginnings and fresh admissions",
    schoolPhase: "Admission Season"
  },
  summer: {
    name: "Summer", 
    colors: ["#4A7C59", "#F4A460", "#FFF8DC"],
    elements: ["🌞", "🌻", "🦜", "🍃"],
    description: "Vacation time and summer programs",
    schoolPhase: "Summer Break"
  },
  autumn: {
    name: "Autumn",
    colors: ["#D2B48C", "#CD853F", "#F4E4BC"],
    elements: ["🍂", "🍁", "🦔", "🌰"],
    description: "New academic year begins",
    schoolPhase: "New Semester"
  },
  winter: {
    name: "Winter",
    colors: ["#E8E8E8", "#9CAF88", "#F0F8FF"],
    elements: ["❄️", "🌙", "⭐", "🕊️"],
    description: "Reflection and exam season",
    schoolPhase: "Assessment Period"
  }
};

const getCurrentSeason = (): string => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
};

interface SeasonalBackgroundProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'visible';
  children: React.ReactNode;
}

export const SeasonsOfLearning = ({ 
  className = "",
  intensity = 'subtle',
  children
}: SeasonalBackgroundProps) => {
  const [currentSeason, setCurrentSeason] = useState<string>('spring');
  const [elements, setElements] = useState<Array<{
    id: number;
    element: string;
    x: number;
    y: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    setCurrentSeason(getCurrentSeason());
  }, []);

  useEffect(() => {
    const season = seasons[currentSeason];
    const intensityCount = { subtle: 3, medium: 5, visible: 8 };
    const count = intensityCount[intensity];

    const newElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      element: season.elements[Math.floor(Math.random() * season.elements.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 20 + Math.random() * 30
    }));

    setElements(newElements);
  }, [currentSeason, intensity]);

  const season = seasons[currentSeason];

  return (
    <div className={`relative ${className}`}>
      {/* Seasonal Gradient Background */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${season.colors[0]}10 0%, ${season.colors[1]}08 50%, ${season.colors[2]}05 100%)`
        }}
      />

      {/* Floating Seasonal Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {elements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0.5, 1, 0.5],
              y: [0, -50, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut"
            }}
          >
            {element.element}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Seasonal Information Badge */}
      <motion.div
        className="absolute top-20 left-4 lg:top-4 lg:left-4 bg-nature-card border border-nature-accent rounded-full px-4 py-2 shadow-lg z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{season.elements[0]}</span>
          <div className="text-xs">
            <div className="font-medium text-nature-primary">{season.name}</div>
            <div className="text-nature-secondary">{season.schoolPhase}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Season Transition Effect for major page changes
export const SeasonTransition = ({ onComplete }: { onComplete?: () => void }) => {
  const [currentSeason] = useState(getCurrentSeason());
  const season = seasons[currentSeason];

  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      onAnimationComplete={onComplete}
    >
      {/* Seasonal overlay effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, ${season.colors[0]}30 0%, ${season.colors[1]}20 50%, transparent 100%)`
        }}
      />
      
      {/* Floating elements during transition */}
      <div className="absolute inset-0">
        {season.elements.slice(0, 12).map((element, index) => (
          <motion.div
            key={index}
            className="absolute text-6xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            initial={{ 
              opacity: 0, 
              scale: 0,
              rotate: -180
            }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360],
              y: [0, -200, -400]
            }}
            transition={{
              duration: 3,
              delay: index * 0.2,
              ease: "easeOut"
            }}
          >
            {element}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Seasonal Indicator for UI
export const SeasonalIndicator = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const [currentSeason] = useState(getCurrentSeason());
  const season = seasons[currentSeason];
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg', 
    lg: 'w-16 h-16 text-2xl'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center shadow-lg border-2`}
      style={{
        background: `linear-gradient(135deg, ${season.colors[0]} 0%, ${season.colors[1]} 100%)`,
        borderColor: season.colors[2]
      }}
      animate={{
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      title={`${season.name} - ${season.schoolPhase}`}
    >
      <span>{season.elements[0]}</span>
    </motion.div>
  );
};