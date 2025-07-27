"use client";
import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

interface RibbonFlowProps {
  className?: string;
  ribbonCount?: number;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  speed?: 'slow' | 'medium' | 'fast';
  theme?: 'scientific' | 'artistic' | 'natural' | 'literary';
  interactive?: boolean;
  glow?: boolean;
}

interface RibbonSegment {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color: string;
  opacity: number;
  delay: number;
}

export default function RibbonFlow({
  className = '',
  ribbonCount = 5,
  direction = 'diagonal',
  speed = 'medium',
  theme = 'scientific',
  interactive = false,
  glow = true
}: RibbonFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ribbons, setRibbons] = useState<RibbonSegment[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const themeColors = {
      scientific: [
        '#4F46E5', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B',
        '#EF4444', '#EC4899', '#14B8A6', '#6366F1', '#8B5CF6'
      ],
      artistic: [
        '#EF4444', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4',
        '#10B981', '#6366F1', '#F97316', '#D946EF', '#0EA5E9'
      ],
      natural: [
        '#10B981', '#059669', '#34D399', '#6EE7B7', '#A7F3D0',
        '#065F46', '#047857', '#1F2937', '#374151', '#4B5563'
      ],
      literary: [
        '#6B7280', '#374151', '#1F2937', '#111827', '#F9FAFB',
        '#8B5CF6', '#6366F1', '#4F46E5', '#3730A3', '#312E81'
      ]
    };

    const speedMultipliers = {
      slow: 0.5,
      medium: 1,
      fast: 1.5
    };

    const generateRibbons = () => {
      const colors = themeColors[theme];
      const newRibbons: RibbonSegment[] = [];
      
      for (let i = 0; i < ribbonCount; i++) {
        const ribbon: RibbonSegment = {
          id: `ribbon-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          width: Math.random() * 200 + 100,
          height: Math.random() * 8 + 4,
          rotation: direction === 'horizontal' ? 0 : 
                   direction === 'vertical' ? 90 : 
                   Math.random() * 60 - 30,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.6 + 0.3,
          delay: i * 200
        };
        newRibbons.push(ribbon);
      }
      
      setRibbons(newRibbons);
    };

    generateRibbons();
  }, [isClient, ribbonCount, direction, theme]);

  useEffect(() => {
    if (!isClient || !containerRef.current || ribbons.length === 0) return;

    const speedMultiplier = speed === 'slow' ? 0.5 : speed === 'fast' ? 1.5 : 1;

    // Animate ribbons with flowing motion
    const animateRibbons = () => {
      ribbons.forEach((ribbon, index) => {
        const ribbonElement = containerRef.current?.querySelector(`[data-ribbon-id="${ribbon.id}"]`);
        if (!ribbonElement) return;

        // Main flowing animation
        animate(ribbonElement, {
          translateX: direction === 'horizontal' ? [0, 100, 0] : [0, 20, 0],
          translateY: direction === 'vertical' ? [0, 100, 0] : [0, 10, 0],
          scaleX: [1, 1.1, 1],
          scaleY: [1, 0.9, 1],
          opacity: [ribbon.opacity, ribbon.opacity + 0.2, ribbon.opacity],
          duration: (4000 + Math.random() * 2000) / speedMultiplier,
          delay: ribbon.delay,
          easing: 'easeInOutSine',
          loop: true
        });

        // Secondary wave animation
        animate(ribbonElement, {
          skewX: [0, 2, -2, 0],
          skewY: [0, 1, -1, 0],
          duration: (3000 + Math.random() * 1500) / speedMultiplier,
          delay: ribbon.delay + 500,
          easing: 'easeInOutSine',
          loop: true
        });

        // Glow effect if enabled
        if (glow) {
          animate(ribbonElement, {
            boxShadow: [
              `0 0 10px ${ribbon.color}40`,
              `0 0 20px ${ribbon.color}80`,
              `0 0 10px ${ribbon.color}40`
            ],
            duration: (2500 + Math.random() * 1000) / speedMultiplier,
            delay: ribbon.delay + 1000,
            easing: 'easeInOutSine',
            loop: true
          });
        }
      });
    };

    animateRibbons();
  }, [ribbons, isClient, speed, glow, direction]);

  const handleRibbonClick = (ribbon: RibbonSegment) => {
    if (!interactive) return;

    const ribbonElement = containerRef.current?.querySelector(`[data-ribbon-id="${ribbon.id}"]`);
    if (!ribbonElement) return;

    // Interactive pulse animation
    animate(ribbonElement, {
      scale: [1, 1.2, 1],
      rotateZ: [0, 360],
      duration: 800,
      easing: 'easeOutElastic(1, .6)',
      complete: () => {
        // Ripple effect
        animate(ribbonElement, {
          opacity: [1, 0.5, 1],
          scale: [1, 1.05, 1],
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
      {ribbons.map((ribbon) => (
        <div
          key={ribbon.id}
          data-ribbon-id={ribbon.id}
          className={`absolute transform-gpu ${interactive ? 'cursor-pointer' : ''}`}
          style={{
            left: `${ribbon.x}%`,
            top: `${ribbon.y}%`,
            width: `${ribbon.width}px`,
            height: `${ribbon.height}px`,
            backgroundColor: ribbon.color,
            opacity: ribbon.opacity,
            transform: `rotate(${ribbon.rotation}deg)`,
            borderRadius: `${ribbon.height / 2}px`,
            filter: glow ? `drop-shadow(0 0 ${ribbon.height}px ${ribbon.color}40)` : 'none',
            transition: 'all 0.3s ease'
          }}
          onClick={() => handleRibbonClick(ribbon)}
        />
      ))}
      
      {/* Overlay gradients for enhanced visual depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-white/5 pointer-events-none" />
    </div>
  );
}