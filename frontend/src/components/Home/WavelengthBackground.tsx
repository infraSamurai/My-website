"use client";
import React, { useEffect, useRef } from "react";

// --- Config for the Wavelength Animation ---
const WAVE_CONFIG = {
  // Number of waves to render
  WAVE_COUNT: 5,
  // Base opacity for the waves
  OPACITY: 0.25,
  // Base speed for the animation
  SPEED: 0.002,
  // Range of wave amplitudes
  AMPLITUDE: { MIN: 30, MAX: 100 },
  // Range of wave frequencies
  FREQUENCY: { MIN: 0.01, MAX: 0.03 },
  // Range of line widths
  LINE_WIDTH: { MIN: 1, MAX: 4 },
};

// --- Wave Class ---
class Wave {
  y: number;
  amplitude: number;
  frequency: number;
  lineWidth: number;
  speed: number;
  offset: number;
  hue: number;

  constructor(canvasHeight: number) {
    this.y = Math.random() * canvasHeight;
    this.amplitude = WAVE_CONFIG.AMPLITUDE.MIN + Math.random() * (WAVE_CONFIG.AMPLITUDE.MAX - WAVE_CONFIG.AMPLITUDE.MIN);
    this.frequency = WAVE_CONFIG.FREQUENCY.MIN + Math.random() * (WAVE_CONFIG.FREQUENCY.MAX - WAVE_CONFIG.FREQUENCY.MIN);
    this.lineWidth = WAVE_CONFIG.LINE_WIDTH.MIN + Math.random() * (WAVE_CONFIG.LINE_WIDTH.MAX - WAVE_CONFIG.LINE_WIDTH.MIN);
    this.speed = (Math.random() - 0.5) * WAVE_CONFIG.SPEED * 2;
    this.offset = Math.random() * 1000;
    this.hue = Math.random() * 360;
  }

  update() {
    this.offset += this.speed;
    this.hue = (this.hue + 0.2) % 360;
  }

  draw(ctx: CanvasRenderingContext2D, tick: number) {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = `hsla(${this.hue}, 80%, 60%, ${WAVE_CONFIG.OPACITY})`;
    
    for (let x = 0; x < ctx.canvas.width; x++) {
      const y = this.y + Math.sin(x * this.frequency + this.offset + tick) * this.amplitude;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.closePath();
  }
}

// --- React Component ---
const WavelengthBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const [hasMounted, setHasMounted] = React.useState(false);
  const wavesRef = useRef<Wave[]>([]);

  useEffect(() => {
    setHasMounted(true);
    
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!hasMounted || !dimensions.width || !dimensions.height) return;

    // Initialize waves
    wavesRef.current = [];
    for (let i = 0; i < WAVE_CONFIG.WAVE_COUNT; i++) {
      wavesRef.current.push(new Wave(dimensions.height));
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let tick = 0;

    const render = () => {
      tick += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      wavesRef.current.forEach(wave => {
        wave.update();
        wave.draw(ctx, tick);
      });
      
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [hasMounted, dimensions]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', margin: 0, background: 'rgb(17, 24, 39)' /* brand-neutral-900 */ }}>
      {hasMounted && (
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          style={{ position: 'absolute', left: 0, top: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.5 }}
        />
      )}
    </div>
  );
};

export default WavelengthBackground; 