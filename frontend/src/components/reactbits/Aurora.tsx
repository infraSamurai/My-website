"use client";
import { useEffect, useRef } from 'react';

interface AuroraProps {
  className?: string;
  colors?: string[];
  speed?: number;
  opacity?: number;
}

export default function Aurora({
  className = '',
  colors = ['#9CAF88', '#4A7C59', '#7BA05B', '#F8BBD9'],
  speed = 1,
  opacity = 0.3
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    let time = 0;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);
      
      time += 0.01 * speed;

      // Create multiple aurora layers
      for (let i = 0; i < colors.length; i++) {
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        
        // Create flowing gradient stops
        const offset1 = 0.2 + 0.3 * Math.sin(time + i * Math.PI / 2);
        const offset2 = 0.5 + 0.3 * Math.sin(time * 1.2 + i * Math.PI / 3);
        const offset3 = 0.8 + 0.2 * Math.sin(time * 0.8 + i * Math.PI / 4);

        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(Math.max(0, Math.min(1, offset1)), `${colors[i]}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(Math.max(0, Math.min(1, offset2)), `${colors[i]}${Math.floor(opacity * 128).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(Math.max(0, Math.min(1, offset3)), `${colors[i]}${Math.floor(opacity * 64).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        
        // Create aurora wave shape
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        for (let x = 0; x <= width; x += 10) {
          const y = height * 0.5 + 
            Math.sin((x / width) * Math.PI * 2 + time + i) * height * 0.2 +
            Math.sin((x / width) * Math.PI * 4 + time * 1.5 + i) * height * 0.1;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      animate();
    } else {
      // Static aurora for reduced motion
      const rect = canvas.getBoundingClientRect();
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), `${color}${Math.floor(opacity * 128).toString(16).padStart(2, '0')}`);
      });
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);
    }

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors, speed, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}