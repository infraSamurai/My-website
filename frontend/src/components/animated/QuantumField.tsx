"use client";
import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

interface QuantumFieldProps {
  className?: string;
  particleCount?: number;
  fieldType?: 'electron' | 'photon' | 'quantum' | 'wave';
  intensity?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  showWaveFunction?: boolean;
}

interface QuantumParticle {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  waveAmplitude: number;
  waveFrequency: number;
  spin: number;
  energy: number;
  momentum: [number, number];
  quantumState: 'up' | 'down' | 'superposition';
}

export default function QuantumField({
  className = '',
  particleCount = 20,
  fieldType = 'quantum',
  intensity = 'medium',
  interactive = false,
  showWaveFunction = true
}: QuantumFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<QuantumParticle[]>([]);
  const [isClient, setIsClient] = useState(false);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fieldConfigs = {
      electron: {
        colors: ['#4F46E5', '#6366F1', '#8B5CF6', '#3730A3'],
        sizeRange: [2, 6],
        energyRange: [0.2, 0.8],
        spinOptions: [-0.5, 0.5]
      },
      photon: {
        colors: ['#F59E0B', '#FDE68A', '#FBBF24', '#92400E'],
        sizeRange: [1, 4],
        energyRange: [0.8, 1.2],
        spinOptions: [-1, 0, 1]
      },
      quantum: {
        colors: ['#10B981', '#34D399', '#6EE7B7', '#047857'],
        sizeRange: [1, 8],
        energyRange: [0.1, 1.0],
        spinOptions: [-1, -0.5, 0, 0.5, 1]
      },
      wave: {
        colors: ['#06B6D4', '#22D3EE', '#67E8F9', '#0891B2'],
        sizeRange: [3, 12],
        energyRange: [0.3, 0.9],
        spinOptions: [0]
      }
    };

    const intensityMultipliers = {
      low: 0.5,
      medium: 1.0,
      high: 1.5
    };

    const generateParticles = () => {
      const config = fieldConfigs[fieldType];
      const newParticles: QuantumParticle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        const energy = config.energyRange[0] + Math.random() * (config.energyRange[1] - config.energyRange[0]);
        const particle: QuantumParticle = {
          id: `particle-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: config.sizeRange[0] + Math.random() * (config.sizeRange[1] - config.sizeRange[0]),
          color: config.colors[Math.floor(Math.random() * config.colors.length)],
          waveAmplitude: Math.random() * 20 + 10,
          waveFrequency: Math.random() * 0.02 + 0.01,
          spin: config.spinOptions[Math.floor(Math.random() * config.spinOptions.length)],
          energy: energy,
          momentum: [
            (Math.random() - 0.5) * energy * intensityMultipliers[intensity],
            (Math.random() - 0.5) * energy * intensityMultipliers[intensity]
          ],
          quantumState: ['up', 'down', 'superposition'][Math.floor(Math.random() * 3)] as QuantumParticle['quantumState']
        };
        newParticles.push(particle);
      }
      
      setParticles(newParticles);
    };

    generateParticles();
  }, [isClient, particleCount, fieldType, intensity]);

  useEffect(() => {
    if (!isClient || !containerRef.current || particles.length === 0) return;

    // Animate particles with quantum behaviors
    const animateParticles = () => {
      particles.forEach((particle, index) => {
        const particleElement = containerRef.current?.querySelector(`[data-particle-id="${particle.id}"]`);
        if (!particleElement) return;

        // Quantum tunneling effect
        if (fieldType === 'quantum' && Math.random() < 0.001) {
          animate(particleElement, {
            opacity: [1, 0, 1],
            scale: [1, 0.5, 1],
            duration: 500,
            easing: 'easeInOutSine'
          });
        }

        // Wave-particle duality
        if (fieldType === 'wave' || particle.quantumState === 'superposition') {
          animate(particleElement, {
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.8, 1, 0.6, 0.8],
            duration: 3000 + Math.random() * 2000,
            delay: index * 100,
            easing: 'easeInOutSine',
            loop: true
          });
        }

        // Electron orbital motion
        if (fieldType === 'electron') {
          animate(particleElement, {
            translateX: [0, 30, 0, -30, 0],
            translateY: [0, -20, 0, 20, 0],
            duration: 4000 + Math.random() * 2000,
            delay: index * 200,
            easing: 'easeInOutSine',
            loop: true
          });
        }

        // Photon wave propagation
        if (fieldType === 'photon') {
          animate(particleElement, {
            translateX: [0, 50],
            opacity: [1, 0.5, 1],
            duration: 2000 + Math.random() * 1000,
            delay: index * 150,
            easing: 'linear',
            loop: true
          });
        }

        // Quantum spin animation
        animate(particleElement, {
          rotateZ: [0, 360 * particle.spin],
          duration: 2000 / Math.abs(particle.spin || 1),
          easing: 'linear',
          loop: true
        });

        // Energy level transitions
        if (Math.random() < 0.002) {
          animate(particleElement, {
            scale: [1, particle.energy * 1.5, 1],
            boxShadow: [
              `0 0 ${particle.size}px ${particle.color}40`,
              `0 0 ${particle.size * 3}px ${particle.color}80`,
              `0 0 ${particle.size}px ${particle.color}40`
            ],
            duration: 800,
            easing: 'easeOutElastic(1, .6)'
          });
        }
      });
    };

    // Wave function visualization
    const drawWaveFunction = () => {
      if (!showWaveFunction || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#4F46E520';
      ctx.lineWidth = 1;

      // Draw wave interference patterns
      particles.forEach((particle, index) => {
        const centerX = (particle.x / 100) * canvas.width;
        const centerY = (particle.y / 100) * canvas.height;

        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const radius = particle.waveAmplitude * Math.sin(Date.now() * particle.waveFrequency + angle);
          const x = centerX + Math.cos(angle) * Math.abs(radius);
          const y = centerY + Math.sin(angle) * Math.abs(radius);
          
          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });
    };

    animateParticles();

    // Start wave function animation
    const animateWaveFunction = () => {
      drawWaveFunction();
      animationFrameRef.current = requestAnimationFrame(animateWaveFunction);
    };

    if (showWaveFunction) {
      animateWaveFunction();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particles, isClient, fieldType, showWaveFunction]);

  const handleParticleClick = (particle: QuantumParticle) => {
    if (!interactive) return;

    const particleElement = containerRef.current?.querySelector(`[data-particle-id="${particle.id}"]`);
    if (!particleElement) return;

    // Quantum measurement collapse
    animate(particleElement, {
      scale: [1, 0.1, 1.5, 1],
      opacity: [1, 0.3, 1],
      rotateZ: [0, 720],
      duration: 1000,
      easing: 'easeOutElastic(1, .8)',
      complete: () => {
        // Quantum state change
        animate(particleElement, {
          boxShadow: [
            `0 0 ${particle.size}px ${particle.color}40`,
            `0 0 ${particle.size * 4}px ${particle.color}FF`,
            `0 0 ${particle.size}px ${particle.color}40`
          ],
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
      {/* Wave function canvas */}
      {showWaveFunction && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.3 }}
        />
      )}

      {/* Quantum particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          data-particle-id={particle.id}
          className={`absolute transform-gpu ${interactive ? 'cursor-pointer' : ''}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: '50%',
            boxShadow: `0 0 ${particle.size}px ${particle.color}40`,
            opacity: particle.quantumState === 'superposition' ? 0.7 : 0.9,
            filter: `blur(${particle.quantumState === 'superposition' ? '1px' : '0px'})`,
            transition: 'all 0.3s ease'
          }}
          onClick={() => handleParticleClick(particle)}
        />
      ))}

      {/* Quantum field visualization */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none" />
      
      {/* Energy level indicators */}
      {fieldType === 'electron' && (
        <div className="absolute top-4 right-4 text-white/60 text-xs font-mono pointer-events-none">
          <div>Electron Orbitals</div>
          <div>E = -13.6/n² eV</div>
        </div>
      )}
      
      {fieldType === 'photon' && (
        <div className="absolute top-4 right-4 text-white/60 text-xs font-mono pointer-events-none">
          <div>Photon Field</div>
          <div>E = hf</div>
        </div>
      )}
      
      {fieldType === 'quantum' && (
        <div className="absolute top-4 right-4 text-white/60 text-xs font-mono pointer-events-none">
          <div>Quantum Field</div>
          <div>ψ = α|0⟩ + β|1⟩</div>
        </div>
      )}
    </div>
  );
}