"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { animate, stagger } from 'animejs';
import { Baby, BookOpen, GraduationCap, Users, ChevronRight } from 'lucide-react';

interface ProgramsBentoProps {
  className?: string;
}

interface Program {
  icon: React.ComponentType<any>;
  title: string;
  age: string;
  description: string;
  color: string;
  gradient: string;
}

export default function ProgramsBento({ className = '' }: ProgramsBentoProps) {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !cardsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            setIsAnimated(true);
            animateCards();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(cardsRef.current);

    return () => observer.disconnect();
  }, [isClient, isAnimated]);

  const animateCards = () => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.program-card');
    
    // Create stacked card effect
    cards.forEach((card, index) => {
      const element = card as HTMLElement;
      element.style.transform = `translateY(${index * 20}px) scale(${1 - index * 0.05})`;
      element.style.zIndex = (programs.length - index).toString();
    });

    // Animate cards in with stagger
    animate(cards, {
      opacity: [0, 1],
      translateY: [60, (el: any, i: number) => i * 20],
      scale: [0.8, (el: any, i: number) => 1 - i * 0.05],
      rotate: [5, 0],
      delay: (el: any, i: number) => i * 300,
      duration: 800,
      easing: 'easeOutBack'
    });
  };

  const programs: Program[] = [
    {
      icon: Baby,
      title: "Early Years",
      age: "Nursery - KG2",
      description: "Play-based learning with focus on creativity and social skills",
      color: "text-brand-primary",
      gradient: "from-brand-primary/20 to-brand-primary/10"
    },
    {
      icon: BookOpen,
      title: "Primary School",
      age: "Grades 1-5",
      description: "Foundation building with comprehensive curriculum",
      color: "text-brand-secondary",
      gradient: "from-brand-secondary/20 to-brand-secondary/10"
    },
    {
      icon: GraduationCap,
      title: "Middle School",
      age: "Grades 6-8",
      description: "Advanced learning with focus on critical thinking",
      color: "text-brand-accent",
      gradient: "from-brand-accent/20 to-brand-accent/10"
    },
    {
      icon: Users,
      title: "High School",
      age: "Grades 9-10",
      description: "Specialized programs preparing for board examinations",
      color: "text-brand-primary",
      gradient: "from-brand-primary/20 to-brand-primary/10"
    }
  ];

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    
    if (!cardsRef.current) return;
    
    const cards = cardsRef.current.querySelectorAll('.program-card');
    
    // Animate to bring clicked card to front
    animate(cards, {
      translateY: (el: any, i: number) => {
        if (i === index) return 0;
        return i < index ? -20 : (i - index) * 20;
      },
      scale: (el: any, i: number) => {
        if (i === index) return 1;
        return i < index ? 0.95 : 1 - ((i - index) * 0.05);
      },
      zIndex: (el: any, i: number) => {
        if (i === index) return programs.length + 1;
        return programs.length - i;
      },
      duration: 600,
      easing: 'easeOutExpo'
    });
  };

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-brand-beige-900 mb-2">
          Our Programs
        </h2>
        <p className="text-brand-beige-700">
          Age-appropriate learning for every stage
        </p>
      </motion.div>

      {/* Stacked Cards */}
      <div ref={cardsRef} className="relative h-80">
        {programs.map((program, index) => {
          const Icon = program.icon;
          return (
            <motion.div
              key={index}
              className={`
                program-card absolute inset-0 p-6 bg-white/60 backdrop-blur-sm rounded-2xl 
                border border-brand-beige-200 shadow-lg cursor-pointer opacity-0
                bg-gradient-to-br ${program.gradient}
              `}
              onClick={() => handleCardClick(index)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${program.color.replace('text-', 'from-')}/20 ${program.color.replace('text-', 'to-')}/30`}>
                  <Icon className={`w-6 h-6 ${program.color}`} />
                </div>
                <ChevronRight className="w-5 h-5 text-brand-beige-400" />
              </div>

              <div className="space-y-2">
                <div>
                  <h3 className="text-xl font-bold text-brand-beige-900">
                    {program.title}
                  </h3>
                  <p className="text-brand-primary font-semibold text-sm">
                    {program.age}
                  </p>
                </div>
                
                <p className="text-brand-beige-700 text-sm leading-relaxed">
                  {program.description}
                </p>
              </div>

              {/* Active indicator */}
              {index === activeIndex && (
                <motion.div
                  className="absolute bottom-4 left-6 w-8 h-1 bg-brand-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Program counter */}
      <div className="flex justify-center mt-6 space-x-2">
        {programs.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === activeIndex ? 'bg-brand-primary' : 'bg-brand-beige-300'
            }`}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-brand-primary/10 to-transparent rounded-full blur-xl -z-10"></div>
    </div>
  );
}