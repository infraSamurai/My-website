"use client";
import { useEffect, useRef } from 'react';

interface AnimatedGradientProps {
  className?: string;
  variant?: 'subtle' | 'vibrant' | 'minimal';
  speed?: 'slow' | 'medium' | 'fast';
  colors?: {
    light: string[];
    dark: string[];
  };
}

export default function AnimatedGradient({
  className = '',
  variant = 'subtle',
  speed = 'medium',
  colors = {
    light: ['#FAF7F2', '#9CAF88', '#4A7C59'],
    dark: ['#0A0A0A', '#1A1A2E', '#16213E']
  }
}: AnimatedGradientProps) {
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

    // Animation variables
    let time = 0;
    const speedMultiplier = speed === 'slow' ? 0.5 : speed === 'fast' ? 2 : 1;

    // Get current theme colors
    const getCurrentColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return isDark ? colors.dark : colors.light;
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const currentColors = getCurrentColors();
      time += 0.01 * speedMultiplier;

      // Create animated gradient
      const gradient = ctx.createLinearGradient(
        0, 0,
        width * (1 + 0.5 * Math.sin(time)),
        height * (1 + 0.5 * Math.cos(time * 0.8))
      );

      // Add color stops with animation
      currentColors.forEach((color, index) => {
        const position = (index / (currentColors.length - 1)) + 
          0.1 * Math.sin(time + index * Math.PI / 2);
        gradient.addColorStop(Math.max(0, Math.min(1, position)), color);
      });

      // Apply gradient based on variant
      switch (variant) {
        case 'vibrant':
          ctx.globalAlpha = 0.8;
          break;
        case 'minimal':
          ctx.globalAlpha = 0.3;
          break;
        default: // subtle
          ctx.globalAlpha = 0.5;
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add subtle noise texture
      if (variant !== 'minimal') {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = `hsl(${time * 50}, 20%, 50%)`;
        for (let i = 0; i < 20; i++) {
          ctx.fillRect(
            Math.random() * width,
            Math.random() * height,
            2, 2
          );
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      animate();
    } else {
      // Static gradient for reduced motion
      const canvasRect = canvas.getBoundingClientRect();
      const currentColors = getCurrentColors();
      const gradient = ctx.createLinearGradient(0, 0, canvasRect.width, canvasRect.height);
      currentColors.forEach((color, index) => {
        gradient.addColorStop(index / (currentColors.length - 1), color);
      });
      ctx.globalAlpha = variant === 'minimal' ? 0.3 : 0.5;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasRect.width, canvasRect.height);
    }

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [variant, speed, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}