"use client";
import Image from 'next/image';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-start justify-center pt-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 opacity-20"></div>
      </div>
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="flex justify-center">
          <div className="mb-[-4rem] flex justify-center">
            <Image src="/img/logo-removebg-preview.png" alt="School Logo" width={384} height={384} className="w-96 h-96" />
          </div>
        </div>
        <div className="inline-flex items-center gap-2 bg-brand-neutral-900/50 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-brand-neutral-700">
          <Sparkles className="w-5 h-5 text-brand-accent" />
          <span className="text-brand-neutral-100 font-medium">Admissions Open 2025-26</span>
          <Sparkles className="w-5 h-5 text-brand-accent" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-brand-neutral-50">
          <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
            Where Learning Blooms
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-brand-neutral-300 mb-16 max-w-3xl mx-auto">
          Nurturing Young Minds from Nursery to 10th Grade
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            className="group bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
            onClick={() => {
              const el = document.getElementById('admissions');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="relative group">
            <button disabled className="bg-brand-neutral-800/50 backdrop-blur-sm text-brand-neutral-100 px-8 py-4 rounded-full font-semibold transition-all border-2 border-brand-neutral-700 flex items-center gap-2 cursor-not-allowed opacity-70">
              <Play className="w-5 h-5" /> Virtual Tour
            </button>
            <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-brand-neutral-700 text-white px-3 py-1.5 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowRight className="w-8 h-8 text-purple-400 rotate-90" />
      </div>
    </section>
  );
} 