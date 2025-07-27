"use client";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Spark {
  id: string;
  x: number;
  y: number;
  angle: number;
  delay: number;
}

interface ClickSparkProps {
  children: React.ReactNode;
  className?: string;
  sparkCount?: number;
  colors?: string[];
  disabled?: boolean;
}

export default function ClickSpark({
  children,
  className = '',
  sparkCount = 8,
  colors = ['#9CAF88', '#4A7C59', '#7BA05B'],
  disabled = false
}: ClickSparkProps) {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const createSparks = (e: React.MouseEvent) => {
    if (disabled || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSparks: Spark[] = [];
    for (let i = 0; i < sparkCount; i++) {
      newSparks.push({
        id: `${Date.now()}-${i}`,
        x,
        y,
        angle: (360 / sparkCount) * i,
        delay: i * 0.05
      });
    }

    setSparks(newSparks);

    // Clear sparks after animation
    setTimeout(() => setSparks([]), 1000);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-visible ${className}`}
      onClick={createSparks}
    >
      {children}
      
      <AnimatePresence>
        {sparks.map((spark, index) => (
          <motion.div
            key={spark.id}
            className="absolute pointer-events-none"
            style={{
              left: spark.x,
              top: spark.y,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: [0, Math.cos(spark.angle * Math.PI / 180) * 50],
              y: [0, Math.sin(spark.angle * Math.PI / 180) * 50],
              rotate: [0, 360]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: spark.delay,
              ease: "easeOut"
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: colors[index % colors.length],
                boxShadow: `0 0 8px ${colors[index % colors.length]}`
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}