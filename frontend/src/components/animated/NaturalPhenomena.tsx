"use client";
import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

interface NaturalPhenomenaProps {
  className?: string;
  phenomenon?: 'rainfall' | 'snowfall' | 'aurora' | 'lightning' | 'waves' | 'particles' | 'wind';
  intensity?: 'gentle' | 'moderate' | 'intense';
  interactive?: boolean;
  realistic?: boolean;
}

interface NaturalElement {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: [number, number];
  lifespan: number;
  age: number;
  opacity: number;
  shape: string;
}

export default function NaturalPhenomena({
  className = '',
  phenomenon = 'rainfall',
  intensity = 'moderate',
  interactive = false,
  realistic = true
}: NaturalPhenomenaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useState<NaturalElement[]>([]);
  const [isClient, setIsClient] = useState(false);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const phenomenaConfigs = {
      rainfall: {
        count: intensity === 'gentle' ? 50 : intensity === 'intense' ? 200 : 100,
        colors: ['#0891B2', '#06B6D4', '#22D3EE', '#67E8F9'],
        sizeRange: [1, 3],
        velocityRange: [[0, 2], [8, 15]],
        lifespanRange: [100, 200],
        shapes: ['line', 'drop']
      },
      snowfall: {
        count: intensity === 'gentle' ? 30 : intensity === 'intense' ? 120 : 60,
        colors: ['#F8FAFC', '#F1F5F9', '#E2E8F0', '#CBD5E1'],
        sizeRange: [2, 6],
        velocityRange: [[-1, 1], [2, 6]],
        lifespanRange: [150, 300],
        shapes: ['circle', 'hexagon']
      },
      aurora: {
        count: intensity === 'gentle' ? 20 : intensity === 'intense' ? 80 : 40,
        colors: ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#4F46E5', '#8B5CF6'],
        sizeRange: [8, 24],
        velocityRange: [[-2, 2], [-4, 4]],
        lifespanRange: [200, 400],
        shapes: ['wave', 'ribbon']
      },
      lightning: {
        count: intensity === 'gentle' ? 5 : intensity === 'intense' ? 15 : 8,
        colors: ['#FBBF24', '#F59E0B', '#F8FAFC', '#EAB308'],
        sizeRange: [2, 8],
        velocityRange: [[0, 0], [0, 0]],
        lifespanRange: [10, 30],
        shapes: ['zigzag', 'branch']
      },
      waves: {
        count: intensity === 'gentle' ? 15 : intensity === 'intense' ? 60 : 30,
        colors: ['#0891B2', '#06B6D4', '#22D3EE', '#67E8F9'],
        sizeRange: [4, 16],
        velocityRange: [[-8, 8], [-2, 2]],
        lifespanRange: [100, 250],
        shapes: ['wave', 'bubble']
      },
      particles: {
        count: intensity === 'gentle' ? 40 : intensity === 'intense' ? 160 : 80,
        colors: ['#F59E0B', '#EF4444', '#F8FAFC', '#FDE68A'],
        sizeRange: [1, 4],
        velocityRange: [[-6, 6], [-10, 10]],
        lifespanRange: [50, 150],
        shapes: ['circle', 'spark']
      },
      wind: {
        count: intensity === 'gentle' ? 25 : intensity === 'intense' ? 100 : 50,
        colors: ['#D1D5DB', '#9CA3AF', '#6B7280', '#F3F4F6'],
        sizeRange: [3, 12],
        velocityRange: [[6, 20], [-2, 2]],
        lifespanRange: [80, 200],
        shapes: ['line', 'curve']
      }
    };

    const generateElements = () => {
      const config = phenomenaConfigs[phenomenon];
      const newElements: NaturalElement[] = [];

      for (let i = 0; i < config.count; i++) {
        const element: NaturalElement = {
          id: `element-${i}`,
          x: Math.random() * 100,
          y: phenomenon === 'rainfall' || phenomenon === 'snowfall' ? -10 : Math.random() * 100,
          size: config.sizeRange[0] + Math.random() * (config.sizeRange[1] - config.sizeRange[0]),
          color: config.colors[Math.floor(Math.random() * config.colors.length)],
          velocity: [
            config.velocityRange[0][0] + Math.random() * (config.velocityRange[0][1] - config.velocityRange[0][0]),
            config.velocityRange[1][0] + Math.random() * (config.velocityRange[1][1] - config.velocityRange[1][0])
          ],
          lifespan: config.lifespanRange[0] + Math.random() * (config.lifespanRange[1] - config.lifespanRange[0]),
          age: 0,
          opacity: Math.random() * 0.6 + 0.4,
          shape: config.shapes[Math.floor(Math.random() * config.shapes.length)]
        };

        newElements.push(element);
      }

      setElements(newElements);
    };

    generateElements();
  }, [isClient, phenomenon, intensity]);

  useEffect(() => {
    if (!isClient || !canvasRef.current || elements.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const phenomenaConfigs = {
      rainfall: {
        count: intensity === 'gentle' ? 50 : intensity === 'intense' ? 200 : 100,
        colors: ['#0891B2', '#06B6D4', '#22D3EE', '#67E8F9'],
        sizeRange: [1, 3],
        velocityRange: [[0, 2], [8, 15]],
        lifespanRange: [100, 200],
        shapes: ['line', 'drop']
      },
      snowfall: {
        count: intensity === 'gentle' ? 30 : intensity === 'intense' ? 120 : 60,
        colors: ['#F8FAFC', '#F1F5F9', '#E2E8F0', '#CBD5E1'],
        sizeRange: [2, 6],
        velocityRange: [[-1, 1], [2, 6]],
        lifespanRange: [150, 300],
        shapes: ['circle', 'hexagon']
      },
      aurora: {
        count: intensity === 'gentle' ? 20 : intensity === 'intense' ? 80 : 40,
        colors: ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#4F46E5', '#8B5CF6'],
        sizeRange: [8, 24],
        velocityRange: [[-2, 2], [-4, 4]],
        lifespanRange: [200, 400],
        shapes: ['wave', 'ribbon']
      },
      lightning: {
        count: intensity === 'gentle' ? 5 : intensity === 'intense' ? 15 : 8,
        colors: ['#FBBF24', '#F59E0B', '#F8FAFC', '#EAB308'],
        sizeRange: [2, 8],
        velocityRange: [[0, 0], [0, 0]],
        lifespanRange: [10, 30],
        shapes: ['zigzag', 'branch']
      },
      waves: {
        count: intensity === 'gentle' ? 15 : intensity === 'intense' ? 60 : 30,
        colors: ['#0891B2', '#06B6D4', '#22D3EE', '#67E8F9'],
        sizeRange: [4, 16],
        velocityRange: [[-8, 8], [-2, 2]],
        lifespanRange: [100, 250],
        shapes: ['wave', 'bubble']
      },
      particles: {
        count: intensity === 'gentle' ? 40 : intensity === 'intense' ? 160 : 80,
        colors: ['#F59E0B', '#EF4444', '#F8FAFC', '#FDE68A'],
        sizeRange: [1, 4],
        velocityRange: [[-6, 6], [-10, 10]],
        lifespanRange: [50, 150],
        shapes: ['circle', 'spark']
      },
      wind: {
        count: intensity === 'gentle' ? 25 : intensity === 'intense' ? 100 : 50,
        colors: ['#D1D5DB', '#9CA3AF', '#6B7280', '#F3F4F6'],
        sizeRange: [3, 12],
        velocityRange: [[6, 20], [-2, 2]],
        lifespanRange: [80, 200],
        shapes: ['line', 'curve']
      }
    };

    const updateElements = () => {
      setElements(prevElements => {
        const config = phenomenaConfigs[phenomenon];
        
        return prevElements.map(element => {
          const newElement = { ...element };
          
          // Update position based on velocity
          newElement.x += element.velocity[0] * 0.1;
          newElement.y += element.velocity[1] * 0.1;
          
          // Update age
          newElement.age += 1;
          
          // Apply physics based on phenomenon
          if (phenomenon === 'rainfall') {
            newElement.velocity[1] += 0.1; // Gravity
            if (newElement.y > 110) {
              newElement.y = -10;
              newElement.x = Math.random() * 100;
              newElement.age = 0;
            }
          } else if (phenomenon === 'snowfall') {
            newElement.velocity[0] += (Math.random() - 0.5) * 0.05; // Wind drift
            if (newElement.y > 110) {
              newElement.y = -10;
              newElement.x = Math.random() * 100;
              newElement.age = 0;
            }
          } else if (phenomenon === 'aurora') {
            newElement.velocity[0] += Math.sin(newElement.age * 0.1) * 0.02;
            newElement.velocity[1] += Math.cos(newElement.age * 0.1) * 0.02;
            newElement.opacity = 0.5 + Math.sin(newElement.age * 0.05) * 0.3;
          } else if (phenomenon === 'lightning') {
            if (newElement.age > 5) {
              newElement.opacity = Math.random() * 0.8 + 0.2;
            }
          } else if (phenomenon === 'waves') {
            newElement.y += Math.sin(newElement.x * 0.1 + newElement.age * 0.05) * 0.5;
          } else if (phenomenon === 'particles') {
            newElement.velocity[1] -= 0.05; // Buoyancy
            newElement.opacity = Math.max(0, newElement.opacity - 0.01);
          } else if (phenomenon === 'wind') {
            newElement.velocity[0] += (Math.random() - 0.5) * 0.1;
            newElement.opacity = 0.3 + Math.sin(newElement.age * 0.03) * 0.2;
          }
          
          // Reset if out of bounds or aged out
          if (newElement.x > 110 || newElement.x < -10 || newElement.age > newElement.lifespan) {
            newElement.x = Math.random() * 100;
            newElement.y = phenomenon === 'rainfall' || phenomenon === 'snowfall' ? -10 : Math.random() * 100;
            newElement.age = 0;
            newElement.opacity = Math.random() * 0.6 + 0.4;
          }
          
          return newElement;
        });
      });
    };

    const renderElements = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      elements.forEach(element => {
        const x = (element.x / 100) * canvas.width;
        const y = (element.y / 100) * canvas.height;
        const size = element.size;
        
        ctx.save();
        ctx.globalAlpha = element.opacity;
        ctx.fillStyle = element.color;
        ctx.strokeStyle = element.color;
        
        switch (element.shape) {
          case 'circle':
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
            break;
            
          case 'line':
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + element.velocity[0] * 2, y + element.velocity[1] * 2);
            ctx.lineWidth = size;
            ctx.stroke();
            break;
            
          case 'drop':
            ctx.beginPath();
            ctx.ellipse(x, y, size * 0.3, size, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
            
          case 'hexagon':
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (i * Math.PI) / 3;
              const hx = x + Math.cos(angle) * size;
              const hy = y + Math.sin(angle) * size;
              if (i === 0) ctx.moveTo(hx, hy);
              else ctx.lineTo(hx, hy);
            }
            ctx.closePath();
            ctx.fill();
            break;
            
          case 'wave':
            ctx.beginPath();
            ctx.moveTo(x - size, y);
            ctx.quadraticCurveTo(x, y - size, x + size, y);
            ctx.quadraticCurveTo(x + size * 2, y + size, x + size * 3, y);
            ctx.lineWidth = 2;
            ctx.stroke();
            break;
            
          case 'zigzag':
            ctx.beginPath();
            ctx.moveTo(x, y);
            for (let i = 0; i < 5; i++) {
              const zx = x + (Math.random() - 0.5) * size * 4;
              const zy = y + i * size;
              ctx.lineTo(zx, zy);
            }
            ctx.lineWidth = 2;
            ctx.stroke();
            break;
            
          case 'spark':
            ctx.beginPath();
            for (let i = 0; i < 4; i++) {
              const angle = (i * Math.PI) / 2;
              const sx = x + Math.cos(angle) * size;
              const sy = y + Math.sin(angle) * size;
              ctx.moveTo(x, y);
              ctx.lineTo(sx, sy);
            }
            ctx.lineWidth = 1;
            ctx.stroke();
            break;
            
          default:
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
      });
    };

    const animate = () => {
      updateElements();
      renderElements();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [elements, phenomenon, isClient]);

  const handleCanvasClick = (event: React.MouseEvent) => {
    if (!interactive || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Add interactive element at click position
    const newElement: NaturalElement = {
      id: `interactive-${Date.now()}`,
      x: x,
      y: y,
      size: 8,
      color: '#F59E0B',
      velocity: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10],
      lifespan: 100,
      age: 0,
      opacity: 1,
      shape: 'spark'
    };

    setElements(prev => [...prev, newElement]);
  };

  if (!isClient) {
    return <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />;
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${interactive ? 'pointer-events-auto' : 'pointer-events-none'} ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onClick={handleCanvasClick}
        style={{ cursor: interactive ? 'pointer' : 'default' }}
      />

      {/* Phenomenon info */}
      <div className="absolute top-4 right-4 text-white/60 text-xs font-mono pointer-events-none">
        <div>{phenomenon.charAt(0).toUpperCase() + phenomenon.slice(1)}</div>
        <div>Intensity: {intensity}</div>
        {realistic && <div>Physics: ON</div>}
      </div>

      {/* Environmental effects */}
      {phenomenon === 'aurora' && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent pointer-events-none" />
      )}
      
      {phenomenon === 'lightning' && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent pointer-events-none animate-pulse" />
      )}
      
      {phenomenon === 'waves' && (
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  );
}