"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { animate, stagger } from 'animejs';
import { Heart, Book, Users, Sparkles } from 'lucide-react';

interface AboutBentoProps {
  className?: string;
}

export default function AboutBento({ className = '' }: AboutBentoProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !textRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isRevealed) {
            setIsRevealed(true);
            revealText();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(textRef.current);

    return () => observer.disconnect();
  }, [isClient, isRevealed]);

  const revealText = () => {
    if (!textRef.current) return;

    const text = "Welcome to Akshararambh Public School, where every child's journey is filled with wonder, discovery, and joy.";
    
    // Split text into words and wrap each in a span
    textRef.current.innerHTML = text
      .split(' ')
      .map((word, i) => `<span style="opacity: 0; transform: translateY(20px); display: inline-block; margin-right: 8px;">${word}</span>`)
      .join('');

    // Animate words with stagger effect
    animate(textRef.current.querySelectorAll('span'), {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: (el: any, i: number) => i * 100,
      duration: 600,
      easing: 'easeOutExpo'
    });

    // Animate features after text
    setTimeout(() => {
      if (featuresRef.current) {
        animate(featuresRef.current.children, {
          opacity: [0, 1],
          translateY: [30, 0],
          scale: [0.8, 1],
          delay: (el: any, i: number) => i * 200,
          duration: 800,
          easing: 'easeOutBack'
        });
      }
    }, 1000);
  };

  const features = [
    {
      icon: Heart,
      title: "Caring Environment",
      description: "Where every child feels loved and supported"
    },
    {
      icon: Book,
      title: "Excellence in Education",
      description: "Strong academics with innovative teaching"
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Building lifelong friendships and connections"
    }
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <motion.div
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Sparkles className="w-6 h-6 text-brand-primary" />
          <span className="text-brand-primary font-semibold">About Us</span>
        </motion.div>
        
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-brand-beige-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          A Magical Place to Learn & Grow
        </motion.h2>
      </div>

      {/* Animated Text Content */}
      <div className="mb-8">
        <div 
          ref={textRef}
          className="text-brand-beige-700 text-lg leading-relaxed"
        >
          {/* Text will be injected by animation */}
        </div>
      </div>

      {/* Features Grid */}
      <div ref={featuresRef} className="space-y-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              className="flex items-start gap-3 opacity-0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center border border-brand-primary/20">
                <Icon className="w-5 h-5 text-brand-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-brand-beige-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-brand-beige-600 text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-full blur-2xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-brand-accent/10 to-brand-primary/10 rounded-full blur-xl -z-10"></div>
    </div>
  );
}