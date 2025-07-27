"use client";
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { OrganicFadeIn, BreathingElement, RippleButton } from '../Nature/OrganicAnimations';
import { FloatingLeaf, FloatingBackground } from '../Nature/FloatingLeaves';
import { RippleButton as EnhancedRippleButton, BreathingCTA } from '../Nature/RippleButton';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 bg-nature-primary texture-paper overflow-hidden">
      {/* Nature-inspired gradient overlay */}
      <div className="absolute inset-0 gradient-nature-warm"></div>
      <FloatingBackground density="low" className="opacity-10" />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image 
            src="/img/logo-removebg-preview.png" 
            alt="School Logo" 
            width={240} 
            height={240} 
            className="w-48 h-48 md:w-60 md:h-60 drop-shadow-lg" 
          />
        </motion.div>

        {/* Admission Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-brand-primary/10 dark:bg-brand-primary/20 px-6 py-3 rounded-full mb-8 border border-brand-primary/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
          <span className="text-brand-beige-800 dark:text-brand-neutral-200 font-medium">Admissions Open 2025-26</span>
          <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
        </motion.div>

        {/* Main Heading - Japanese Typography */}
        <OrganicFadeIn delay={0.4}>
          <h1 className="heading-hero text-nature-primary font-primary mb-8">
            Where Learning Blooms
          </h1>
          <div className="text-haiku font-traditional text-nature-secondary mt-4">
            "In nature's embrace, young minds flourish and grow"
          </div>
        </OrganicFadeIn>

        {/* Subtitle */}
        <OrganicFadeIn delay={0.6}>
          <p className="body-text text-nature-secondary max-w-4xl mx-auto mb-12 nature-content">
            Nurturing Young Minds from Nursery to 10th Grade
          </p>
        </OrganicFadeIn>

        {/* Action Buttons - Nature-inspired */}
        <OrganicFadeIn delay={0.8}>
          <div className="flex flex-wrap gap-6 justify-center mb-16">
            <BreathingCTA 
              onClick={() => {
                const el = document.getElementById('admissions');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="asymmetrical-border"
            >
              Start Your Journey 
              <ArrowRight className="w-5 h-5" />
            </BreathingCTA>

            <EnhancedRippleButton 
              variant="secondary"
              size="lg"
              className="asymmetrical-border"
              onClick={() => {
                const el = document.getElementById('about');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <BookOpen className="w-5 h-5" /> 
              Learn More
            </EnhancedRippleButton>
          </div>
        </OrganicFadeIn>

        {/* Professional Nature Elements Preview */}
        <OrganicFadeIn delay={1}>
          <div className="flex justify-center items-center gap-12 text-nature-subtle max-w-3xl mx-auto">
            <FloatingLeaf leafType="cherry" intensity="gentle">
              <div className="text-center card-nature asymmetrical-border p-6">
                <svg className="w-12 h-12 mx-auto mb-3 text-nature-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 21H5V3H13V9H19Z"/>
                </svg>
                <p className="caption-text text-nature-primary font-minimalist">Nurture</p>
              </div>
            </FloatingLeaf>
            <FloatingLeaf leafType="leaf" intensity="medium">
              <div className="text-center card-nature asymmetrical-border p-6">
                <svg className="w-12 h-12 mx-auto mb-3 text-nature-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"/>
                </svg>
                <p className="caption-text text-nature-primary font-minimalist">Growth</p>
              </div>
            </FloatingLeaf>
            <FloatingLeaf leafType="bamboo" intensity="gentle">
              <div className="text-center card-nature asymmetrical-border p-6">
                <svg className="w-12 h-12 mx-auto mb-3 text-nature-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
                </svg>
                <p className="caption-text text-nature-primary font-minimalist">Wisdom</p>
              </div>
            </FloatingLeaf>
          </div>
        </OrganicFadeIn>
      </div>

      {/* Zen Scroll Indicator */}
      <OrganicFadeIn delay={1.2}>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-nature-subtle">
            <span className="caption-text">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-6 h-6 rotate-90 opacity-60" />
            </motion.div>
          </div>
        </div>
      </OrganicFadeIn>
    </section>
  );
} 