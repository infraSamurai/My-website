"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  RibbonFlow, 
  MorphingBackground, 
  MolecularStructure, 
  AnimatedText,
  AnimatedButton,
  TimelineAnimation,
  QuantumField,
  ArtisticBrush,
  NaturalPhenomena,
  LiteraryFlow
} from '@/components/animated';
import { Atom, Palette, Waves, BookOpen, Sparkles, Zap, Brush, CloudRain, PenTool } from 'lucide-react';

export default function ShowcasePage() {
  const [activeDemo, setActiveDemo] = useState('ribbons');

  const demos = [
    {
      id: 'ribbons',
      title: 'Ribbon Flow',
      description: 'Flowing ribbon animations inspired by modern web design',
      icon: Waves,
      component: (
        <RibbonFlow 
          ribbonCount={12}
          direction="diagonal"
          theme="scientific"
          speed="medium"
          glow={true}
          interactive={true}
        />
      )
    },
    {
      id: 'morphing',
      title: 'Morphing Backgrounds',
      description: 'SVG-based morphing shapes with scientific themes',
      icon: Palette,
      component: (
        <MorphingBackground 
          theme="molecular"
          complexity="complex"
          speed="medium"
          interactive={true}
        />
      )
    },
    {
      id: 'molecular',
      title: '3D Molecular Structure',
      description: 'Interactive 3D molecular visualizations',
      icon: Atom,
      component: (
        <MolecularStructure 
          molecule="benzene"
          interactive={true}
          autoRotate={true}
          showLabels={true}
          scale={1.5}
        />
      )
    },
    {
      id: 'timeline',
      title: 'Enhanced Timeline',
      description: 'Advanced timeline animations with scientific themes',
      icon: BookOpen,
      component: (
        <TimelineAnimation 
          elements={[
            {
              id: 'discovery1',
              title: 'Discovery Phase',
              description: 'Initial research and hypothesis formation',
              delay: 0,
              duration: 1000,
              transform: {
                translateX: [0, 50],
                scale: [0, 1],
                opacity: [0, 1]
              },
              color: '#4F46E5',
              icon: <Sparkles className="w-6 h-6" />
            },
            {
              id: 'analysis1',
              title: 'Analysis Phase',
              description: 'Data collection and systematic analysis',
              delay: 500,
              duration: 1200,
              transform: {
                translateY: [0, -30],
                scale: [0, 1],
                opacity: [0, 1]
              },
              color: '#8B5CF6',
              icon: <Atom className="w-6 h-6" />
            },
            {
              id: 'synthesis1',
              title: 'Synthesis Phase',
              description: 'Combining findings into coherent conclusions',
              delay: 1000,
              duration: 1000,
              transform: {
                translateX: [0, -50],
                scale: [0, 1],
                opacity: [0, 1]
              },
              color: '#10B981',
              icon: <Palette className="w-6 h-6" />
            },
            {
              id: 'application1',
              title: 'Application Phase',
              description: 'Practical implementation and real-world usage',
              delay: 1500,
              duration: 1100,
              transform: {
                translateY: [0, 30],
                scale: [0, 1],
                opacity: [0, 1]
              },
              color: '#F59E0B',
              icon: <BookOpen className="w-6 h-6" />
            }
          ]}
          theme="space"
          interactive={true}
          autoPlay={true}
          duration={2000}
        />
      )
    },
    {
      id: 'quantum',
      title: 'Quantum Field',
      description: 'Advanced quantum physics visualization with particle interactions',
      icon: Zap,
      component: (
        <QuantumField 
          particleCount={30}
          fieldType="quantum"
          intensity="medium"
          interactive={true}
          showWaveFunction={true}
        />
      )
    },
    {
      id: 'artistic',
      title: 'Artistic Brush',
      description: 'Dynamic brush strokes with various painting techniques',
      icon: Brush,
      component: (
        <ArtisticBrush 
          strokeCount={15}
          brushStyle="watercolor"
          palette="warm"
          intensity="medium"
          interactive={true}
          animated={true}
        />
      )
    },
    {
      id: 'natural',
      title: 'Natural Phenomena',
      description: 'Realistic simulation of natural weather and physics',
      icon: CloudRain,
      component: (
        <NaturalPhenomena 
          phenomenon="rainfall"
          intensity="moderate"
          interactive={true}
          realistic={true}
        />
      )
    },
    {
      id: 'literary',
      title: 'Literary Flow',
      description: 'Animated text with manuscript and calligraphy styles',
      icon: PenTool,
      component: (
        <LiteraryFlow 
          text="In the beginning was the Word, and the Word was with God, and the Word was God. All things were made through him, and without him was not any thing made that was made..."
          style="manuscript"
          language="english"
          flowDirection="horizontal"
          speed="medium"
          interactive={true}
          showInk={true}
        />
      )
    }
  ];

  const activeComponent = demos.find(demo => demo.id === activeDemo);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-neutral-900 via-brand-neutral-800 to-brand-neutral-900 text-white">
      {/* Header */}
      <header className="relative z-50 pt-20 pb-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <AnimatedText
              text="Animation Showcase"
              className="text-5xl md:text-7xl font-bold mb-4"
              animation="morphing"
              gradient={true}
              duration={2}
            />
            <p className="text-xl text-brand-neutral-300 max-w-3xl mx-auto">
              Explore our collection of advanced animations combining science, art, and nature
            </p>
          </motion.div>
        </div>
      </header>

      {/* Demo Navigation */}
      <nav className="relative z-40 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {demos.map((demo) => {
              const IconComponent = demo.icon;
              return (
                <AnimatedButton
                  key={demo.id}
                  variant={activeDemo === demo.id ? 'primary' : 'ghost'}
                  animation="glow"
                  onClick={() => setActiveDemo(demo.id)}
                  className="flex items-center gap-2"
                >
                  <IconComponent className="w-5 h-5" />
                  {demo.title}
                </AnimatedButton>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Active Demo */}
      <main className="relative">
        <div className="container mx-auto px-4">
          <motion.div
            key={activeDemo}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-brand-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 border border-brand-neutral-700"
          >
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold mb-2">{activeComponent?.title}</h2>
              <p className="text-brand-neutral-300">{activeComponent?.description}</p>
            </div>

            {/* Demo Container */}
            <div className="relative h-96 bg-brand-neutral-900/50 rounded-xl overflow-hidden border border-brand-neutral-700">
              {activeComponent?.component}
            </div>

            {/* Interactive Instructions */}
            <div className="mt-6 text-center text-brand-neutral-400">
              <p className="text-sm">
                {activeDemo === 'ribbons' && 'Click on ribbons to see interactive effects'}
                {activeDemo === 'morphing' && 'Click on shapes to trigger morphing animations'}
                {activeDemo === 'molecular' && 'Click on atoms to explore molecular structure'}
                {activeDemo === 'timeline' && 'Use controls to play, pause, and restart the timeline'}
                {activeDemo === 'quantum' && 'Click on particles to trigger quantum measurement collapse'}
                {activeDemo === 'artistic' && 'Click on brush strokes to see paint effects'}
                {activeDemo === 'natural' && 'Click anywhere to add interactive elements'}
                {activeDemo === 'literary' && 'Click on characters to highlight and see ink effects'}
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="mt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <AnimatedText
              text="Scientific Renaissance Features"
              className="text-3xl font-bold mb-4"
              animation="stagger"
              gradient={true}
            />
            <p className="text-brand-neutral-300 max-w-2xl mx-auto">
              Our animation system combines scientific accuracy with artistic beauty,
              creating memorable educational experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Molecular Visualization',
                description: 'Interactive 3D molecular structures with realistic bonding',
                icon: Atom,
                color: '#4F46E5'
              },
              {
                title: 'Quantum Physics',
                description: 'Advanced quantum field simulations with wave functions',
                icon: Zap,
                color: '#8B5CF6'
              },
              {
                title: 'Artistic Expressions',
                description: 'Dynamic brush strokes with various painting techniques',
                icon: Brush,
                color: '#EF4444'
              },
              {
                title: 'Natural Phenomena',
                description: 'Realistic weather and physics simulations',
                icon: CloudRain,
                color: '#10B981'
              },
              {
                title: 'Literary Arts',
                description: 'Manuscript and calligraphy text animations',
                icon: PenTool,
                color: '#F59E0B'
              },
              {
                title: 'Interactive Elements',
                description: 'Touch-responsive animations for engaging experiences',
                icon: Sparkles,
                color: '#EC4899'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-brand-neutral-800/30 backdrop-blur-sm rounded-xl p-6 border border-brand-neutral-700 hover:border-brand-primary/50 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${feature.color}20` }}
                    >
                      <IconComponent 
                        className="w-5 h-5" 
                        style={{ color: feature.color }}
                      />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-brand-neutral-300 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clean Background */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-brand-beige-50 to-brand-beige-100 opacity-20"></div>
    </div>
  );
}