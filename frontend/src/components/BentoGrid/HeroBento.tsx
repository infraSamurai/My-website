"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { animate } from 'animejs';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroBentoProps {
  className?: string;
}

export default function HeroBento({ className = '' }: HeroBentoProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // AnimeJS animation for text reveal
    if (titleRef.current) {
      // Split text into characters for animation
      const titleText = titleRef.current.textContent || '';
      titleRef.current.innerHTML = titleText
        .split('')
        .map((char, i) => `<span style="opacity: 0; transform: translateY(20px);">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

      animate(titleRef.current.querySelectorAll('span'), {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: (el: any, i: number) => i * 50,
        duration: 600,
        easing: 'easeOutExpo'
      });
    }

    if (subtitleRef.current) {
      animate(subtitleRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: 800
      });
    }

    // 3D-like logo animation
    if (logoRef.current) {
      animate(logoRef.current, {
        rotateY: [0, 360],
        scale: [0.8, 1],
        duration: 2000,
        easing: 'easeOutBack',
        delay: 200
      });
    }
  }, [isClient]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 3D Logo Section */}
      <div className="flex justify-center mb-8">
        <motion.div
          ref={logoRef}
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative">
            <Image 
              src="/img/logo-removebg-preview.png" 
              alt="School Logo" 
              width={200} 
              height={200} 
              className="w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl" 
            />
            {/* 3D Shadow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-full blur-xl -z-10 transform translate-x-2 translate-y-2"></div>
          </div>
        </motion.div>
      </div>

      {/* Animated Badge */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 bg-brand-primary/10 px-4 py-2 rounded-full border border-brand-primary/20">
          <Sparkles className="w-4 h-4 text-brand-primary" />
          <span className="text-brand-beige-800 font-medium text-sm">Admissions Open 2025-26</span>
        </div>
      </div>

      {/* Main Title with AnimeJS */}
      <div className="text-center mb-4">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-beige-900 leading-tight"
        >
          Where Learning Blooms
        </h1>
      </div>

      {/* Subtitle with ReactBits-inspired reveal */}
      <div className="text-center mb-8">
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-brand-beige-700 opacity-0"
        >
          Nurturing Young Minds from Nursery to 10th Grade
        </p>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <motion.button 
          className="flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-primary-dark transition-colors duration-200 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const el = document.getElementById('about');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Explore Our Story
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-4 right-4 opacity-20">
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-6 bg-brand-primary/30 rounded-full"></div>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-4 opacity-20">
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="w-4 h-4 bg-brand-secondary/30 rounded-full"></div>
        </motion.div>
      </div>
    </div>
  );
}