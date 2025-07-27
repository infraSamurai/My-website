"use client";
import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

interface MorphingBackgroundProps {
  className?: string;
  theme?: 'molecular' | 'artistic' | 'natural' | 'literary';
  complexity?: 'simple' | 'medium' | 'complex';
  speed?: 'slow' | 'medium' | 'fast';
  interactive?: boolean;
}

interface MorphingShape {
  id: string;
  pathData: string;
  color: string;
  size: number;
  x: number;
  y: number;
  rotation: number;
  morphTargets: string[];
}

export default function MorphingBackground({
  className = '',
  theme = 'molecular',
  complexity = 'medium',
  speed = 'medium',
  interactive = false
}: MorphingBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shapes, setShapes] = useState<MorphingShape[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const themeConfig = {
      molecular: {
        colors: ['#4F46E5', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'],
        shapes: {
          // DNA helix segments
          helix1: "M10,10 Q20,5 30,10 Q40,15 50,10 Q60,5 70,10",
          helix2: "M10,20 Q20,25 30,20 Q40,15 50,20 Q60,25 70,20",
          // Molecular bonds
          bond1: "M20,20 L60,20 M40,10 L40,30",
          bond2: "M30,15 L50,25 M35,25 L45,15",
          // Atomic orbits
          orbit1: "M40,40 Q60,20 80,40 Q60,60 40,40",
          orbit2: "M20,40 Q40,60 60,40 Q40,20 20,40"
        }
      },
      artistic: {
        colors: ['#EF4444', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4'],
        shapes: {
          // Brush strokes
          brush1: "M5,30 Q20,10 35,30 Q50,50 65,30 Q80,10 95,30",
          brush2: "M10,20 Q30,40 50,20 Q70,5 90,20",
          // Paint splatters
          splatter1: "M40,40 Q45,35 50,40 Q55,45 50,50 Q45,55 40,50 Q35,45 40,40",
          splatter2: "M30,30 Q35,25 40,30 Q45,35 40,40 Q35,45 30,40 Q25,35 30,30",
          // Flowing curves
          curve1: "M10,50 Q30,20 50,50 Q70,80 90,50",
          curve2: "M20,60 Q40,30 60,60 Q80,90 100,60"
        }
      },
      natural: {
        colors: ['#10B981', '#059669', '#34D399', '#6EE7B7', '#065F46'],
        shapes: {
          // Tree branches
          branch1: "M50,80 Q45,60 40,40 Q35,20 30,10 M40,40 Q50,35 60,30",
          branch2: "M60,80 Q55,60 50,40 Q45,20 40,10 M50,40 Q60,35 70,30",
          // Leaf shapes
          leaf1: "M40,20 Q50,10 60,20 Q55,30 50,40 Q45,30 40,20",
          leaf2: "M30,30 Q40,20 50,30 Q45,40 40,50 Q35,40 30,30",
          // Wave patterns
          wave1: "M10,40 Q30,20 50,40 Q70,60 90,40",
          wave2: "M20,50 Q40,30 60,50 Q80,70 100,50"
        }
      },
      literary: {
        colors: ['#6B7280', '#374151', '#8B5CF6', '#6366F1', '#4F46E5'],
        shapes: {
          // Manuscript flourishes
          flourish1: "M20,30 Q40,10 60,30 Q80,50 100,30",
          flourish2: "M30,40 Q50,20 70,40 Q90,60 110,40",
          // Quill strokes
          quill1: "M10,50 Q30,30 50,50 Q70,70 90,50",
          quill2: "M20,60 Q40,40 60,60 Q80,80 100,60",
          // Book spines
          spine1: "M40,10 L40,90 M35,15 L45,15 M35,85 L45,85",
          spine2: "M60,10 L60,90 M55,15 L65,15 M55,85 L65,85"
        }
      }
    };

    const complexityCount = {
      simple: 3,
      medium: 6,
      complex: 12
    };

    const generateShapes = () => {
      const config = themeConfig[theme];
      const shapeKeys = Object.keys(config.shapes);
      const count = complexityCount[complexity];
      const newShapes: MorphingShape[] = [];

      for (let i = 0; i < count; i++) {
        const shapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
        const morphTargets = shapeKeys.filter(key => key !== shapeKey).slice(0, 3);
        
        const shape: MorphingShape = {
          id: `shape-${i}`,
          pathData: config.shapes[shapeKey as keyof typeof config.shapes],
          color: config.colors[Math.floor(Math.random() * config.colors.length)],
          size: Math.random() * 80 + 40,
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          rotation: Math.random() * 360,
          morphTargets: morphTargets.map(key => config.shapes[key as keyof typeof config.shapes])
        };
        
        newShapes.push(shape);
      }

      setShapes(newShapes);
    };

    generateShapes();
  }, [isClient, theme, complexity]);

  useEffect(() => {
    if (!isClient || !containerRef.current || shapes.length === 0) return;

    const speedMultiplier = speed === 'slow' ? 0.5 : speed === 'fast' ? 1.5 : 1;

    const animateShapes = () => {
      shapes.forEach((shape, index) => {
        const shapeElement = containerRef.current?.querySelector(`[data-shape-id="${shape.id}"]`);
        if (!shapeElement) return;

        // Main morphing animation
        if (shape.morphTargets.length > 0) {
          const pathElement = shapeElement.querySelector('path');
          if (pathElement) {
            animate(pathElement, {
              d: [shape.pathData, ...shape.morphTargets, shape.pathData],
              duration: (8000 + Math.random() * 4000) / speedMultiplier,
              delay: index * 1000,
              easing: 'easeInOutSine',
              loop: true
            });
          }
        }

        // Floating animation
        animate(shapeElement, {
          translateX: [0, 20, -20, 0],
          translateY: [0, -15, 15, 0],
          duration: (6000 + Math.random() * 3000) / speedMultiplier,
          delay: index * 500,
          easing: 'easeInOutSine',
          loop: true
        });

        // Rotation animation
        animate(shapeElement, {
          rotateZ: [0, 360],
          duration: (12000 + Math.random() * 6000) / speedMultiplier,
          delay: index * 300,
          easing: 'linear',
          loop: true
        });

        // Scale pulsing
        animate(shapeElement, {
          scale: [1, 1.1, 0.9, 1],
          duration: (4000 + Math.random() * 2000) / speedMultiplier,
          delay: index * 800,
          easing: 'easeInOutSine',
          loop: true
        });

        // Opacity breathing
        animate(shapeElement, {
          opacity: [0.3, 0.7, 0.3],
          duration: (5000 + Math.random() * 2500) / speedMultiplier,
          delay: index * 600,
          easing: 'easeInOutSine',
          loop: true
        });
      });
    };

    animateShapes();
  }, [shapes, isClient, speed]);

  const handleShapeClick = (shape: MorphingShape) => {
    if (!interactive) return;

    const shapeElement = containerRef.current?.querySelector(`[data-shape-id="${shape.id}"]`);
    if (!shapeElement) return;

    // Interactive explosion animation
    animate(shapeElement, {
      scale: [1, 1.5, 1],
      rotateZ: [0, 180],
      duration: 1000,
      easing: 'easeOutElastic(1, .8)',
      complete: () => {
        // Ripple effect
        animate(shapeElement, {
          opacity: [1, 0.2, 1],
          scale: [1, 1.2, 1],
          duration: 600,
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
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0"
      >
        {/* Gradient definitions */}
        <defs>
          {shapes.map((shape) => (
            <linearGradient
              key={`gradient-${shape.id}`}
              id={`gradient-${shape.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={shape.color} stopOpacity="0.8" />
              <stop offset="50%" stopColor={shape.color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={shape.color} stopOpacity="0.2" />
            </linearGradient>
          ))}
        </defs>

        {/* Morphing shapes */}
        {shapes.map((shape) => (
          <g
            key={shape.id}
            data-shape-id={shape.id}
            className={`transform-gpu ${interactive ? 'cursor-pointer' : ''}`}
            onClick={() => handleShapeClick(shape)}
          >
            <path
              d={shape.pathData}
              fill={`url(#gradient-${shape.id})`}
              stroke={shape.color}
              strokeWidth="0.5"
              opacity="0.6"
              filter="blur(0.5px)"
              transform={`translate(${shape.x}, ${shape.y}) rotate(${shape.rotation}) scale(${shape.size / 100})`}
            />
          </g>
        ))}
      </svg>

      {/* Overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-white/5 pointer-events-none" />
    </div>
  );
}