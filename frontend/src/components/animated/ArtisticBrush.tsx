"use client";
import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

interface ArtisticBrushProps {
  className?: string;
  strokeCount?: number;
  brushStyle?: 'watercolor' | 'oil' | 'acrylic' | 'ink' | 'digital';
  palette?: 'warm' | 'cool' | 'monochrome' | 'vibrant' | 'pastel';
  intensity?: 'light' | 'medium' | 'bold';
  interactive?: boolean;
  animated?: boolean;
}

interface BrushStroke {
  id: string;
  path: string;
  color: string;
  opacity: number;
  width: number;
  length: number;
  angle: number;
  x: number;
  y: number;
  texture: string;
  blendMode: string;
  dryness: number;
}

export default function ArtisticBrush({
  className = '',
  strokeCount = 12,
  brushStyle = 'watercolor',
  palette = 'warm',
  intensity = 'medium',
  interactive = false,
  animated = true
}: ArtisticBrushProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokes, setStrokes] = useState<BrushStroke[]>([]);
  const [isClient, setIsClient] = useState(false);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const palettes = {
      warm: ['#EF4444', '#F59E0B', '#F97316', '#DC2626', '#EA580C', '#B91C1C'],
      cool: ['#3B82F6', '#06B6D4', '#8B5CF6', '#1D4ED8', '#0891B2', '#7C3AED'],
      monochrome: ['#111827', '#374151', '#6B7280', '#9CA3AF', '#D1D5DB', '#F3F4F6'],
      vibrant: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'],
      pastel: ['#FCA5A5', '#FDE68A', '#A7F3D0', '#93C5FD', '#C4B5FD', '#F9A8D4']
    };

    const brushConfigs = {
      watercolor: {
        opacityRange: [0.3, 0.7],
        widthRange: [8, 24],
        blendModes: ['multiply', 'overlay', 'soft-light'],
        texture: 'rough',
        dryness: 0.2
      },
      oil: {
        opacityRange: [0.7, 0.9],
        widthRange: [12, 32],
        blendModes: ['normal', 'multiply'],
        texture: 'smooth',
        dryness: 0.8
      },
      acrylic: {
        opacityRange: [0.6, 0.8],
        widthRange: [6, 20],
        blendModes: ['normal', 'overlay'],
        texture: 'medium',
        dryness: 0.5
      },
      ink: {
        opacityRange: [0.8, 1.0],
        widthRange: [2, 8],
        blendModes: ['normal', 'multiply'],
        texture: 'sharp',
        dryness: 0.9
      },
      digital: {
        opacityRange: [0.4, 0.8],
        widthRange: [4, 16],
        blendModes: ['normal', 'screen', 'overlay'],
        texture: 'clean',
        dryness: 0.6
      }
    };

    const generateStrokes = () => {
      const colors = palettes[palette];
      const config = brushConfigs[brushStyle];
      const newStrokes: BrushStroke[] = [];

      for (let i = 0; i < strokeCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const length = Math.random() * 200 + 50;
        const width = config.widthRange[0] + Math.random() * (config.widthRange[1] - config.widthRange[0]);
        
        // Generate organic brush stroke path
        const pathPoints = [];
        const steps = 20;
        for (let j = 0; j <= steps; j++) {
          const t = j / steps;
          const pressure = Math.sin(t * Math.PI) * (intensity === 'light' ? 0.5 : intensity === 'bold' ? 1.2 : 0.8);
          const wobble = (Math.random() - 0.5) * 10;
          const x = t * length * Math.cos(angle) + wobble;
          const y = t * length * Math.sin(angle) + wobble;
          pathPoints.push({ x, y, pressure });
        }

        const stroke: BrushStroke = {
          id: `stroke-${i}`,
          path: generateSVGPath(pathPoints),
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: config.opacityRange[0] + Math.random() * (config.opacityRange[1] - config.opacityRange[0]),
          width: width,
          length: length,
          angle: angle,
          x: Math.random() * 100,
          y: Math.random() * 100,
          texture: config.texture,
          blendMode: config.blendModes[Math.floor(Math.random() * config.blendModes.length)],
          dryness: config.dryness
        };

        newStrokes.push(stroke);
      }

      setStrokes(newStrokes);
    };

    generateStrokes();
  }, [isClient, strokeCount, brushStyle, palette, intensity]);

  const generateSVGPath = (points: { x: number; y: number; pressure: number }[]) => {
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currentPoint = points[i];
      
      // Create smooth curves with pressure variation
      const cpx = (prevPoint.x + currentPoint.x) / 2;
      const cpy = (prevPoint.y + currentPoint.y) / 2;
      
      path += ` Q ${prevPoint.x} ${prevPoint.y} ${cpx} ${cpy}`;
    }
    
    return path;
  };

  useEffect(() => {
    if (!isClient || !containerRef.current || strokes.length === 0) return;

    if (animated) {
      const animateStrokes = () => {
        strokes.forEach((stroke, index) => {
          const strokeElement = containerRef.current?.querySelector(`[data-stroke-id="${stroke.id}"]`);
          if (!strokeElement) return;

          // Paint application animation
          animate(strokeElement, {
            opacity: [0, stroke.opacity],
            scale: [0.8, 1, 1.02, 1],
            duration: 2000 + Math.random() * 1000,
            delay: index * 300,
            easing: 'easeOutExpo'
          });

          // Brush texture animation
          if (brushStyle === 'watercolor') {
            animate(strokeElement, {
              filter: [
                `blur(0px) saturate(100%)`,
                `blur(1px) saturate(120%)`,
                `blur(0.5px) saturate(110%)`
              ],
              duration: 4000 + Math.random() * 2000,
              delay: index * 400,
              easing: 'easeInOutSine',
              loop: true
            });
          }

          // Drying effect
          setTimeout(() => {
            animate(strokeElement, {
              opacity: [stroke.opacity, stroke.opacity * stroke.dryness],
              duration: 3000,
              easing: 'easeOutSine'
            });
          }, 5000 + index * 500);
        });
      };

      animateStrokes();
    }

    // Canvas-based texture rendering
    const renderTexture = () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add paper texture
      if (brushStyle === 'watercolor' || brushStyle === 'acrylic') {
        ctx.globalAlpha = 0.1;
        for (let i = 0; i < 1000; i++) {
          ctx.fillStyle = '#000';
          ctx.fillRect(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            1,
            1
          );
        }
      }

      ctx.globalAlpha = 1;
    };

    renderTexture();
  }, [strokes, isClient, animated, brushStyle]);

  const handleStrokeClick = (stroke: BrushStroke) => {
    if (!interactive) return;

    const strokeElement = containerRef.current?.querySelector(`[data-stroke-id="${stroke.id}"]`);
    if (!strokeElement) return;

    // Paint splash effect
    animate(strokeElement, {
      scale: [1, 1.1, 1],
      opacity: [stroke.opacity, 1, stroke.opacity],
      duration: 600,
      easing: 'easeOutElastic(1, .8)',
      complete: () => {
        // Color bleeding effect
        animate(strokeElement, {
          filter: [
            `blur(0px) saturate(100%)`,
            `blur(2px) saturate(150%)`,
            `blur(0px) saturate(100%)`
          ],
          duration: 1000,
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
      {/* Canvas for texture */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.3 }}
      />

      {/* SVG brush strokes */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        {/* Filters for artistic effects */}
        <defs>
          <filter id="watercolor-filter">
            <feTurbulence baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
          
          <filter id="oil-filter">
            <feGaussianBlur stdDeviation="0.3" />
            <feColorMatrix values="1.1 0 0 0 0  0 1.1 0 0 0  0 0 1.1 0 0  0 0 0 1 0" />
          </filter>
          
          <filter id="ink-filter">
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 .5 .5 .7 .7 .8 .9 1" />
            </feComponentTransfer>
          </filter>
        </defs>

        {strokes.map((stroke) => (
          <path
            key={stroke.id}
            data-stroke-id={stroke.id}
            d={stroke.path}
            fill="none"
            stroke={stroke.color}
            strokeWidth={stroke.width / 10}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={stroke.opacity}
            style={{
              mixBlendMode: stroke.blendMode as any,
              filter: 
                brushStyle === 'watercolor' ? 'url(#watercolor-filter)' :
                brushStyle === 'oil' ? 'url(#oil-filter)' :
                brushStyle === 'ink' ? 'url(#ink-filter)' :
                'none',
              transform: `translate(${stroke.x}%, ${stroke.y}%)`,
              cursor: interactive ? 'pointer' : 'default'
            }}
            onClick={() => handleStrokeClick(stroke)}
          />
        ))}
      </svg>

      {/* Artistic info */}
      <div className="absolute bottom-4 left-4 text-white/60 text-xs font-mono pointer-events-none">
        <div>{brushStyle.charAt(0).toUpperCase() + brushStyle.slice(1)} • {palette}</div>
        <div>Strokes: {strokeCount}</div>
      </div>
    </div>
  );
}