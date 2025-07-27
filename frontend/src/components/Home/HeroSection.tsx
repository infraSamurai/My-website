"use client";
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { OrganicFadeIn, BreathingElement, RippleButton } from '../Nature/OrganicAnimations';
import ClientOnly from '../ClientOnly';
import dynamic from 'next/dynamic';

const BlurIn = dynamic(() => import('../reactbits/BlurIn'), { ssr: false });
const GradientText = dynamic(() => import('../reactbits/GradientText'), { ssr: false });
const GlassCard = dynamic(() => import('../reactbits/GlassCard'), { ssr: false });
const ClickSpark = dynamic(() => import('../reactbits/ClickSpark'), { ssr: false });
const MagneticButton = dynamic(() => import('../reactbits/MagneticButton'), { ssr: false });
const ThemeAwareBackground = dynamic(() => import('../backgrounds/ThemeAwareBackground'), { ssr: false });

export default function HeroSection() {
  return (
    <ClientOnly fallback={
      <section className="min-h-screen flex items-center justify-center pt-20 bg-nature-primary/5 dark:bg-nature-primary/10">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="heading-hero text-nature-primary font-primary mb-8">Where Learning Blooms</h1>
          <p className="body-text text-nature-secondary max-w-4xl mx-auto mb-12">Nurturing Young Minds from Nursery to 10th Grade</p>
        </div>
      </section>
    }>
      <ThemeAwareBackground 
        type="combined" 
        intensity="subtle" 
        interactive={true}
        className="min-h-screen flex items-center justify-center pt-20"
      >
      
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

        {/* Main Heading - Modern Typography */}
        <ClientOnly fallback={
          <h1 className="heading-hero text-nature-primary font-primary mb-8">
            Where Learning Blooms
            <div className="text-haiku font-traditional text-nature-secondary mt-4">
              "In nature's embrace, young minds flourish and grow"
            </div>
          </h1>
        }>
          <BlurIn delay={400}>
            <h1 className="heading-hero text-nature-primary font-primary mb-8">
              <GradientText className="bg-gradient-to-r from-nature-secondary via-nature-accent to-nature-secondary">
                Where Learning Blooms
              </GradientText>
            </h1>
            <div className="text-haiku font-traditional text-nature-secondary mt-4">
              "In nature's embrace, young minds flourish and grow"
            </div>
          </BlurIn>
        </ClientOnly>

        {/* Subtitle */}
        <OrganicFadeIn delay={0.6}>
          <p className="body-text text-nature-secondary max-w-4xl mx-auto mb-12 nature-content">
            Nurturing Young Minds from Nursery to 10th Grade
          </p>
        </OrganicFadeIn>

        {/* Action Buttons - Modern CTA with Magnetic Effect */}
        <BlurIn delay={600}>
          <div className="flex flex-wrap gap-6 justify-center mb-16">
            <ClientOnly fallback={
              <button className="bg-nature-accent hover:bg-nature-secondary text-white px-8 py-4 rounded-lg flex items-center gap-3 shadow-lg">
                Start Your Journey <ArrowRight className="w-5 h-5" />
              </button>
            }>
              <ClickSpark>
                <MagneticButton
                  onClick={() => {
                    const el = document.getElementById('admissions');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  variant="primary"
                  size="lg"
                  className="bg-nature-accent hover:bg-nature-secondary text-white flex items-center gap-3 shadow-lg hover:shadow-xl"
                >
                  Start Your Journey 
                  <ArrowRight className="w-5 h-5" />
                </MagneticButton>
              </ClickSpark>
            </ClientOnly>

            <ClientOnly fallback={
              <button className="border-2 border-nature-accent text-nature-secondary hover:bg-nature-accent hover:text-white px-8 py-4 rounded-lg flex items-center gap-3">
                <BookOpen className="w-5 h-5" /> Learn More
              </button>
            }>
              <ClickSpark>
                <MagneticButton
                  onClick={() => {
                    const el = document.getElementById('about');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  variant="outline"
                  size="lg"
                  className="border-2 border-nature-accent text-nature-secondary hover:bg-nature-accent hover:text-white flex items-center gap-3"
                >
                  <BookOpen className="w-5 h-5" /> 
                  Learn More
                </MagneticButton>
              </ClickSpark>
            </ClientOnly>
          </div>
        </BlurIn>

        {/* Core Values - Modern Glass Cards */}
        <BlurIn delay={800}>
          <div className="flex justify-center items-center gap-8 text-nature-subtle max-w-4xl mx-auto">
            <ClientOnly fallback={
              <div className="text-center p-6 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-lg border border-white/30">
                <svg className="w-12 h-12 mx-auto mb-3 text-nature-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 21H5V3H13V9H19Z"/>
                </svg>
                <p className="caption-text text-nature-primary font-medium">Nurture</p>
              </div>
            }>
              <ClickSpark>
                <GlassCard className="text-center p-6" hover={true} glow={true}>
                  <svg className="w-12 h-12 mx-auto mb-3 text-nature-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 21H5V3H13V9H19Z"/>
                  </svg>
                  <p className="caption-text text-nature-primary font-medium">Nurture</p>
                </GlassCard>
              </ClickSpark>
            </ClientOnly>
            
            <ClientOnly fallback={
              <div className="text-center p-6 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-lg border border-white/30">
                <svg className="w-12 h-12 mx-auto mb-3 text-nature-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"/>
                </svg>
                <p className="caption-text text-nature-primary font-medium">Growth</p>
              </div>
            }>
              <ClickSpark>
                <GlassCard className="text-center p-6" hover={true} glow={true}>
                  <svg className="w-12 h-12 mx-auto mb-3 text-nature-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"/>
                  </svg>
                  <p className="caption-text text-nature-primary font-medium">Growth</p>
                </GlassCard>
              </ClickSpark>
            </ClientOnly>
            
            <ClientOnly fallback={
              <div className="text-center p-6 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-lg border border-white/30">
                <svg className="w-12 h-12 mx-auto mb-3 text-nature-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
                </svg>
                <p className="caption-text text-nature-primary font-medium">Wisdom</p>
              </div>
            }>
              <ClickSpark>
                <GlassCard className="text-center p-6" hover={true} glow={true}>
                  <svg className="w-12 h-12 mx-auto mb-3 text-nature-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
                  </svg>
                  <p className="caption-text text-nature-primary font-medium">Wisdom</p>
                </GlassCard>
              </ClickSpark>
            </ClientOnly>
          </div>
        </BlurIn>
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
      </ThemeAwareBackground>
    </ClientOnly>
  );
} 