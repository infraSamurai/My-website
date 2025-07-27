"use client";
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Lightbulb, Star, Trophy, Users } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

interface FloatingElementProps {
  icon: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  amplitude?: number;
}

function FloatingElement({ icon, className = '', delay = 0, duration = 3, amplitude = 20 }: FloatingElementProps) {
  return (
    <motion.div
      className={`absolute opacity-20 ${className}`}
      initial={{ y: 0 }}
      animate={{
        y: [0, -amplitude, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {icon}
    </motion.div>
  );
}

interface FloatingElementsProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  theme?: 'education' | 'achievement' | 'general';
}

export default function FloatingElements({ 
  className = '',
  density = 'medium',
  theme = 'education'
}: FloatingElementsProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />;
  }
  const educationIcons = [
    <BookOpen size={32} className="text-brand-primary" />,
    <GraduationCap size={40} className="text-brand-secondary" />,
    <Lightbulb size={36} className="text-brand-accent" />,
    <Users size={28} className="text-brand-secondary" />,
    <BookOpen size={24} className="text-brand-accent" />,
    <Star size={20} className="text-brand-primary" />
  ];

  const achievementIcons = [
    <Trophy size={36} className="text-brand-secondary" />,
    <Star size={32} className="text-brand-accent" />,
    <GraduationCap size={40} className="text-brand-primary" />,
    <Trophy size={28} className="text-brand-secondary" />,
    <Star size={24} className="text-brand-accent" />,
    <Trophy size={20} className="text-brand-primary" />
  ];

  const generalIcons = [
    <BookOpen size={32} className="text-brand-primary" />,
    <Trophy size={36} className="text-brand-secondary" />,
    <Lightbulb size={40} className="text-brand-accent" />,
    <Star size={28} className="text-brand-secondary" />,
    <Users size={24} className="text-brand-accent" />,
    <GraduationCap size={20} className="text-brand-primary" />
  ];

  const iconSets = {
    education: educationIcons,
    achievement: achievementIcons,
    general: generalIcons
  };

  const densityCount = {
    low: 4,
    medium: 6,
    high: 8
  };

  const selectedIcons = iconSets[theme].slice(0, densityCount[density]);

  const positions = [
    { top: '10%', left: '10%' },
    { top: '20%', right: '15%' },
    { top: '60%', left: '8%' },
    { bottom: '30%', right: '12%' },
    { top: '40%', left: '85%' },
    { bottom: '20%', left: '20%' },
    { top: '80%', right: '25%' },
    { top: '15%', left: '45%' }
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {selectedIcons.map((icon, index) => (
        <FloatingElement
          key={index}
          icon={icon}
          className={`${Object.entries(positions[index]).map(([key, value]) => `${key}:${value}`).join(' ')}`}
          delay={index * 0.5}
          duration={3 + index * 0.3}
          amplitude={15 + index * 5}
        />
      ))}
    </div>
  );
}