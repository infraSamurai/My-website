"use client";
import { useEffect, useRef } from 'react';

interface GeometricGridProps {
  className?: string;
  pattern?: 'dots' | 'lines' | 'hexagons' | 'triangles';
  size?: 'small' | 'medium' | 'large';
  opacity?: number;
  animated?: boolean;
  colors?: {
    light: string;
    dark: string;
  };
}

export default function GeometricGrid({
  className = '',
  pattern = 'dots',
  size = 'medium',
  opacity = 0.1,
  animated = true,
  colors = {
    light: '#4A7C59',
    dark: '#7BA05B'
  }
}: GeometricGridProps) {
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

    // Grid configuration
    const sizeMap = { small: 20, medium: 40, large: 80 };
    const gridSize = sizeMap[size];
    let time = 0;

    // Get current theme color
    const getCurrentColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return isDark ? colors.dark : colors.light;
    };

    const drawDots = (width: number, height: number, animatedOpacity: number) => {
      const currentColor = getCurrentColor();
      ctx.fillStyle = currentColor;
      
      for (let x = gridSize; x < width; x += gridSize) {
        for (let y = gridSize; y < height; y += gridSize) {
          ctx.save();
          ctx.globalAlpha = animatedOpacity;
          
          if (animated) {
            const wave = Math.sin(time + (x + y) * 0.01) * 0.5 + 0.5;
            ctx.globalAlpha *= wave;
          }
          
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    };

    const drawLines = (width: number, height: number, animatedOpacity: number) => {
      const currentColor = getCurrentColor();
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = 1;
      
      ctx.save();
      ctx.globalAlpha = animatedOpacity;
      
      // Vertical lines
      for (let x = gridSize; x < width; x += gridSize) {
        if (animated) {
          const wave = Math.sin(time + x * 0.01) * 0.5 + 0.5;
          ctx.globalAlpha = animatedOpacity * wave;
        }
        
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = gridSize; y < height; y += gridSize) {
        if (animated) {
          const wave = Math.sin(time + y * 0.01) * 0.5 + 0.5;
          ctx.globalAlpha = animatedOpacity * wave;
        }
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      ctx.restore();
    };

    const drawHexagons = (width: number, height: number, animatedOpacity: number) => {
      const currentColor = getCurrentColor();
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = 1;
      
      const hexRadius = gridSize / 2;
      const hexHeight = hexRadius * Math.sqrt(3);
      
      for (let row = 0; row * hexHeight < height + hexHeight; row++) {
        for (let col = 0; col * gridSize * 1.5 < width + gridSize; col++) {
          const x = col * gridSize * 1.5 + (row % 2) * gridSize * 0.75;
          const y = row * hexHeight;
          
          if (x < width + gridSize && y < height + hexHeight) {
            ctx.save();
            ctx.globalAlpha = animatedOpacity;
            
            if (animated) {
              const wave = Math.sin(time + (x + y) * 0.005) * 0.5 + 0.5;
              ctx.globalAlpha *= wave;
            }
            
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) * i;
              const hexX = x + hexRadius * Math.cos(angle);
              const hexY = y + hexRadius * Math.sin(angle);
              
              if (i === 0) {
                ctx.moveTo(hexX, hexY);
              } else {
                ctx.lineTo(hexX, hexY);
              }
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    const drawTriangles = (width: number, height: number, animatedOpacity: number) => {
      const currentColor = getCurrentColor();
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = 1;
      
      const triangleHeight = gridSize * Math.sqrt(3) / 2;
      
      for (let row = 0; row * triangleHeight < height + triangleHeight; row++) {
        for (let col = 0; col * gridSize < width + gridSize; col++) {
          const x = col * gridSize + (row % 2) * (gridSize / 2);
          const y = row * triangleHeight;
          
          if (x < width + gridSize && y < height + triangleHeight) {
            ctx.save();
            ctx.globalAlpha = animatedOpacity;
            
            if (animated) {
              const wave = Math.sin(time + (x + y) * 0.01) * 0.5 + 0.5;
              ctx.globalAlpha *= wave;
            }
            
            // Draw triangle
            ctx.beginPath();
            if ((row + col) % 2 === 0) {
              // Upward triangle
              ctx.moveTo(x, y + triangleHeight);
              ctx.lineTo(x + gridSize / 2, y);
              ctx.lineTo(x + gridSize, y + triangleHeight);
            } else {
              // Downward triangle
              ctx.moveTo(x, y);
              ctx.lineTo(x + gridSize / 2, y + triangleHeight);
              ctx.lineTo(x + gridSize, y);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      if (animated) {
        time += 0.02;
      }

      const animatedOpacity = animated ? 
        opacity * (0.5 + 0.5 * Math.sin(time * 0.5)) : 
        opacity;

      switch (pattern) {
        case 'dots':
          drawDots(width, height, animatedOpacity);
          break;
        case 'lines':
          drawLines(width, height, animatedOpacity);
          break;
        case 'hexagons':
          drawHexagons(width, height, animatedOpacity);
          break;
        case 'triangles':
          drawTriangles(width, height, animatedOpacity);
          break;
      }

      if (animated) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion && animated) {
      animate();
    } else {
      // Static version
      const rect = canvas.getBoundingClientRect();
      switch (pattern) {
        case 'dots':
          drawDots(rect.width, rect.height, opacity);
          break;
        case 'lines':
          drawLines(rect.width, rect.height, opacity);
          break;
        case 'hexagons':
          drawHexagons(rect.width, rect.height, opacity);
          break;
        case 'triangles':
          drawTriangles(rect.width, rect.height, opacity);
          break;
      }
    }

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [pattern, size, opacity, animated, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}