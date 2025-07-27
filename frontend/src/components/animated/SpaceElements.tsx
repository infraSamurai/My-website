"use client";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { Star, Rocket, Satellite, Globe, Zap } from 'lucide-react';

interface SpaceElementsProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  theme?: 'stars' | 'planets' | 'satellites' | 'rockets' | 'mixed';
  interactive?: boolean;
}

interface SpaceElement {
  id: string;
  type: 'star' | 'planet' | 'satellite' | 'rocket' | 'asteroid';
  icon: React.ElementType;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  orbitRadius?: number;
}

export default function SpaceElements({
  className = '',
  density = 'medium',
  theme = 'mixed',
  interactive = false
}: SpaceElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<SpaceElement[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const densityCount = {
      low: 8,
      medium: 15,
      high: 25
    };

    const elementTypes = {
      stars: [{ type: 'star', icon: Star, colors: ['#F59E0B', '#FDE68A', '#FBBF24'] }],
      planets: [{ type: 'planet', icon: Globe, colors: ['#3B82F6', '#06B6D4', '#8B5CF6'] }],
      satellites: [{ type: 'satellite', icon: Satellite, colors: ['#10B981', '#14B8A6', '#22D3EE'] }],
      rockets: [{ type: 'rocket', icon: Rocket, colors: ['#F59E0B', '#EF4444', '#8B5CF6'] }],
      mixed: [
        { type: 'star', icon: Star, colors: ['#F59E0B', '#FDE68A'] },
        { type: 'planet', icon: Globe, colors: ['#3B82F6', '#8B5CF6'] },
        { type: 'satellite', icon: Satellite, colors: ['#10B981', '#22D3EE'] },
        { type: 'rocket', icon: Rocket, colors: ['#F59E0B', '#EF4444'] }
      ]
    };

    const generateElements = () => {
      const count = densityCount[density];
      const types = elementTypes[theme];
      const newElements: SpaceElement[] = [];

      for (let i = 0; i < count; i++) {
        const typeData = types[Math.floor(Math.random() * types.length)];
        const element: SpaceElement = {
          id: `space-${i}`,
          type: typeData.type as SpaceElement['type'],
          icon: typeData.icon,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 15,
          color: typeData.colors[Math.floor(Math.random() * typeData.colors.length)],
          speed: Math.random() * 0.5 + 0.1,
          orbitRadius: typeData.type === 'planet' ? Math.random() * 50 + 30 : undefined
        };
        newElements.push(element);
      }

      setElements(newElements);
    };

    generateElements();
  }, [density, theme, isClient]);

  useEffect(() => {
    if (!isClient || !containerRef.current || elements.length === 0) return;

    // Animate elements with anime.js
    const animateElements = () => {
      elements.forEach((element, index) => {
        const elementNode = containerRef.current?.querySelector(`[data-id="${element.id}"]`);
        if (!elementNode) return;

        if (element.type === 'star') {
          // Twinkling stars
          animate(elementNode, {
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
            duration: 3000 + Math.random() * 2000,
            delay: index * 200,
            easing: 'easeInOutSine',
            loop: true
          });
        } else if (element.type === 'planet') {
          // Orbiting planets
          animate(elementNode, {
            rotate: '1turn',
            duration: 20000 + Math.random() * 10000,
            easing: 'linear',
            loop: true
          });
        } else if (element.type === 'satellite') {
          // Floating satellites
          animate(elementNode, {
            translateY: [0, -20, 0],
            rotate: [0, 360],
            duration: 8000 + Math.random() * 4000,
            delay: index * 300,
            easing: 'easeInOutSine',
            loop: true
          });
        } else if (element.type === 'rocket') {
          // Moving rockets
          animate(elementNode, {
            translateX: [0, 30, 0],
            translateY: [0, -15, 0],
            rotate: [0, 10, -10, 0],
            duration: 6000 + Math.random() * 3000,
            delay: index * 400,
            easing: 'easeInOutExpo',
            loop: true
          });
        }
      });
    };

    animateElements();
  }, [elements, isClient]);

  const handleElementClick = (element: SpaceElement) => {
    if (!interactive) return;

    const elementNode = containerRef.current?.querySelector(`[data-id="${element.id}"]`);
    if (!elementNode) return;

    // Pulse animation on click
    animate(elementNode, {
      scale: [1, 1.5, 1],
      duration: 600,
      easing: 'easeOutElastic(1, .8)'
    });
  };

  if (!isClient) {
    return <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />;
  }

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${interactive ? 'pointer-events-auto' : 'pointer-events-none'} ${className}`}
    >
      {elements.map((element) => {
        const IconComponent = element.icon;
        return (
          <motion.div
            key={element.id}
            data-id={element.id}
            className={`absolute ${interactive ? 'cursor-pointer' : ''}`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              color: element.color,
              fontSize: `${element.size}px`
            }}
            onClick={() => handleElementClick(element)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 0.8, delay: elements.indexOf(element) * 0.1 }}
          >
            <IconComponent 
              size={element.size} 
              className={`
                drop-shadow-lg
                ${element.type === 'star' ? 'animate-twinkle' : ''}
                ${element.type === 'planet' ? 'animate-orbit' : ''}
                ${element.type === 'satellite' ? 'animate-float' : ''}
                ${element.type === 'rocket' ? 'animate-stellar-drift' : ''}
              `}
            />
          </motion.div>
        );
      })}
    </div>
  );
}