"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { animate, stagger } from 'animejs';
import { Users, GraduationCap, BookOpen, Trophy } from 'lucide-react';

interface StatsBentoProps {
  className?: string;
}

interface StatItem {
  icon: React.ComponentType<any>;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

export default function StatsBento({ className = '' }: StatsBentoProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !statsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            setIsAnimated(true);
            animateStats();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, [isClient, isAnimated]);

  const animateStats = () => {
    if (!statsRef.current) return;

    // Animate containers first
    animate(statsRef.current.querySelectorAll('.stat-container'), {
      opacity: [0, 1],
      translateY: [30, 0],
      scale: [0.8, 1],
      delay: (el: any, i: number) => i * 200,
      duration: 800,
      easing: 'easeOutBack'
    });

    // Animate counters
    stats.forEach((stat, index) => {
      setTimeout(() => {
        const counter = countersRef.current[index];
        if (counter) {
          const obj = { value: 0 };
          animate(obj, {
            value: stat.value,
            duration: 2000,
            easing: 'easeOutExpo',
            update: () => {
              counter.textContent = Math.floor(obj.value) + stat.suffix;
            }
          });
        }
      }, index * 200);
    });
  };

  const stats: StatItem[] = [
    {
      icon: Users,
      value: 1000,
      suffix: '+',
      label: 'Happy Students',
      color: 'text-brand-primary'
    },
    {
      icon: GraduationCap,
      value: 15,
      suffix: '+',
      label: 'Years of Excellence',
      color: 'text-brand-secondary'
    },
    {
      icon: BookOpen,
      value: 100,
      suffix: '%',
      label: 'Success Rate',
      color: 'text-brand-accent'
    },
    {
      icon: Trophy,
      value: 50,
      suffix: '+',
      label: 'Expert Teachers',
      color: 'text-brand-primary'
    }
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-brand-beige-900 mb-2">
          Our Achievements
        </h2>
        <p className="text-brand-beige-700">
          Building excellence through dedication and innovation
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div ref={statsRef} className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="stat-container text-center p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-brand-beige-200 opacity-0"
            >
              <div className="flex justify-center mb-3">
                <motion.div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.color.replace('text-', 'from-')}/10 ${stat.color.replace('text-', 'to-')}/20`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </motion.div>
              </div>
              
              <div className="mb-2">
                <div
                  ref={(el) => {
                    if (el) countersRef.current[index] = el;
                  }}
                  className="text-2xl md:text-3xl font-bold text-brand-beige-900"
                >
                  0{stat.suffix}
                </div>
              </div>
              
              <p className="text-brand-beige-600 text-sm font-medium">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5 rounded-2xl -z-10"></div>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-4 right-4 w-8 h-8 bg-brand-primary/20 rounded-full"
        animate={{ 
          y: [0, -5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-4 left-4 w-6 h-6 bg-brand-secondary/20 rounded-full"
        animate={{ 
          y: [0, 5, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
}