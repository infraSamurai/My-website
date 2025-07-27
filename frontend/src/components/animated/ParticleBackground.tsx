"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

interface ParticleProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
}

function Particles({ count = 100, color = '#4F46E5', size = 2, speed = 0.01 }: ParticleProps) {
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
    }
    return new Float32Array(temp);
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * speed;
      mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation={false}
      />
    </points>
  );
}

interface ParticleBackgroundProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
  particleSize?: number;
  animationSpeed?: number;
}

export default function ParticleBackground({
  className = '',
  particleCount = 100,
  particleColor = '#4F46E5',
  particleSize = 2,
  animationSpeed = 0.01
}: ParticleBackgroundProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className={`fixed inset-0 -z-10 ${className}`} />;
  }

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Particles
          count={particleCount}
          color={particleColor}
          size={particleSize}
          speed={animationSpeed}
        />
      </Canvas>
    </div>
  );
}