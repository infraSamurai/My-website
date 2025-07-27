"use client";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { Cpu, Zap, Wifi, Code, Database, Monitor, Smartphone, Headphones } from 'lucide-react';

interface TechElementsProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  theme?: 'circuits' | 'devices' | 'data' | 'mixed';
  interactive?: boolean;
  glitchEffect?: boolean;
}

interface TechElement {
  id: string;
  type: 'circuit' | 'device' | 'data' | 'signal';
  icon: React.ElementType;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  glitchIntensity?: number;
}

export default function TechElements({
  className = '',
  density = 'medium',
  theme = 'mixed',
  interactive = false,
  glitchEffect = false
}: TechElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<TechElement[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const densityCount = {
      low: 10,
      medium: 18,
      high: 28
    };

    const elementTypes = {
      circuits: [
        { type: 'circuit', icon: Cpu, colors: ['#00FF88', '#22D3EE', '#A78BFA'] },
        { type: 'circuit', icon: Zap, colors: ['#22D3EE', '#10B981', '#F59E0B'] }
      ],
      devices: [
        { type: 'device', icon: Monitor, colors: ['#A78BFA', '#22D3EE', '#10B981'] },
        { type: 'device', icon: Smartphone, colors: ['#00FF88', '#A78BFA', '#F59E0B'] },
        { type: 'device', icon: Headphones, colors: ['#22D3EE', '#00FF88', '#A78BFA'] }
      ],
      data: [
        { type: 'data', icon: Database, colors: ['#10B981', '#22D3EE', '#A78BFA'] },
        { type: 'data', icon: Code, colors: ['#00FF88', '#22D3EE', '#F59E0B'] },
        { type: 'signal', icon: Wifi, colors: ['#A78BFA', '#22D3EE', '#10B981'] }
      ],
      mixed: [
        { type: 'circuit', icon: Cpu, colors: ['#00FF88', '#22D3EE'] },
        { type: 'device', icon: Monitor, colors: ['#A78BFA', '#22D3EE'] },
        { type: 'data', icon: Database, colors: ['#10B981', '#22D3EE'] },
        { type: 'signal', icon: Wifi, colors: ['#A78BFA', '#00FF88'] }
      ]
    };

    const generateElements = () => {
      const count = densityCount[density];
      const types = elementTypes[theme];
      const newElements: TechElement[] = [];

      for (let i = 0; i < count; i++) {
        const typeData = types[Math.floor(Math.random() * types.length)];
        const element: TechElement = {
          id: `tech-${i}`,
          type: typeData.type as TechElement['type'],
          icon: typeData.icon,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 16 + 12,
          color: typeData.colors[Math.floor(Math.random() * typeData.colors.length)],
          speed: Math.random() * 0.8 + 0.2,
          glitchIntensity: glitchEffect ? Math.random() * 0.5 + 0.1 : 0
        };
        newElements.push(element);
      }

      setElements(newElements);
    };

    generateElements();
  }, [density, theme, isClient, glitchEffect]);

  useEffect(() => {
    if (!isClient || !containerRef.current || elements.length === 0) return;

    // Animate elements with anime.js
    const animateElements = () => {
      elements.forEach((element, index) => {
        const elementNode = containerRef.current?.querySelector(`[data-id="${element.id}"]`);
        if (!elementNode) return;

        if (element.type === 'circuit') {
          // Pulsing circuits with neon glow
          animate(elementNode, {
            opacity: [0.6, 1, 0.6],
            scale: [0.9, 1.1, 0.9],
            duration: 2000 + Math.random() * 1000,
            delay: index * 150,
            easing: 'easeInOutSine',
            loop: true
          });
        } else if (element.type === 'device') {
          // Floating devices with rotation
          animate(elementNode, {
            translateY: [0, -15, 0],
            rotate: [0, 10, -10, 0],
            duration: 5000 + Math.random() * 2000,
            delay: index * 200,
            easing: 'easeInOutSine',
            loop: true
          });
        } else if (element.type === 'data') {
          // Matrix-like data flow
          animate(elementNode, {
            translateX: [0, 20, 0],
            opacity: [0.4, 1, 0.4],
            duration: 4000 + Math.random() * 2000,
            delay: index * 250,
            easing: 'easeInOutExpo',
            loop: true
          });
        } else if (element.type === 'signal') {
          // Signal waves
          animate(elementNode, {
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
            duration: 3000 + Math.random() * 1500,
            delay: index * 300,
            easing: 'easeInOutSine',
            loop: true
          });
        }

        // Add glitch effect if enabled
        if (glitchEffect && element.glitchIntensity) {
          animate(elementNode, {
            translateX: [0, -2, 2, 0],
            duration: 200,
            delay: Math.random() * 5000,
            easing: 'easeInOutSine',
            loop: true,
            loopComplete: () => {
              // Random glitch intervals
              setTimeout(() => {
                animate(elementNode, {
                  translateX: [0, -3, 3, -1, 1, 0],
                  duration: 150,
                  easing: 'easeInOutSine'
                });
              }, Math.random() * 10000);
            }
          });
        }
      });
    };

    animateElements();
  }, [elements, isClient, glitchEffect]);

  const handleElementClick = (element: TechElement) => {
    if (!interactive) return;

    const elementNode = containerRef.current?.querySelector(`[data-id="${element.id}"]`);
    if (!elementNode) return;

    // Cyber pulse animation on click
    animate(elementNode, {
      scale: [1, 1.8, 1],
      duration: 800,
      easing: 'easeOutElastic(1, .6)',
      complete: () => {
        // Add neon glow effect
        animate(elementNode, {
          opacity: [1, 0.5, 1],
          duration: 400,
          easing: 'easeInOutSine'
        });
      }
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
              fontSize: `${element.size}px`,
              filter: glitchEffect ? 'drop-shadow(0 0 8px currentColor)' : 'drop-shadow(0 0 4px currentColor)'
            }}
            onClick={() => handleElementClick(element)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 0.6, delay: elements.indexOf(element) * 0.05 }}
          >
            <IconComponent 
              size={element.size} 
              className={`
                ${element.type === 'circuit' ? 'animate-neon-pulse' : ''}
                ${element.type === 'device' ? 'animate-float' : ''}
                ${element.type === 'data' ? 'animate-matrix-rain' : ''}
                ${element.type === 'signal' ? 'animate-cyber-scan' : ''}
                ${glitchEffect ? 'animate-digital-glitch' : ''}
              `}
            />
          </motion.div>
        );
      })}
    </div>
  );
}