"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { animate, stagger } from 'animejs';
import { 
  BookOpen, 
  FlaskConical, 
  Dumbbell, 
  Palette, 
  Computer, 
  Music,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface FacilitiesBentoProps {
  className?: string;
}

interface Facility {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
  image: string;
}

export default function FacilitiesBento({ className = '' }: FacilitiesBentoProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !galleryRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            setIsAnimated(true);
            animateGallery();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(galleryRef.current);

    return () => observer.disconnect();
  }, [isClient, isAnimated]);

  const animateGallery = () => {
    if (!galleryRef.current) return;

    // Animate gallery items
    animate(galleryRef.current.querySelectorAll('.facility-item'), {
      opacity: [0, 1],
      translateY: [30, 0],
      rotateY: [45, 0],
      delay: (el: any, i: number) => i * 200,
      duration: 800,
      easing: 'easeOutBack'
    });
  };

  const facilities: Facility[] = [
    {
      icon: BookOpen,
      title: "Modern Library",
      description: "Extensive collection of books and digital resources",
      color: "text-brand-primary",
      image: "/img/library-placeholder.jpg"
    },
    {
      icon: FlaskConical,
      title: "Science Labs",
      description: "Well-equipped physics, chemistry, and biology labs",
      color: "text-brand-secondary",
      image: "/img/lab-placeholder.jpg"
    },
    {
      icon: Computer,
      title: "Computer Lab",
      description: "Latest technology for digital learning",
      color: "text-brand-accent",
      image: "/img/computer-placeholder.jpg"
    },
    {
      icon: Dumbbell,
      title: "Sports Complex",
      description: "Indoor and outdoor sports facilities",
      color: "text-brand-primary",
      image: "/img/sports-placeholder.jpg"
    },
    {
      icon: Palette,
      title: "Art Studio",
      description: "Creative space for artistic expression",
      color: "text-brand-secondary",
      image: "/img/art-placeholder.jpg"
    },
    {
      icon: Music,
      title: "Music Room",
      description: "Instruments and space for musical learning",
      color: "text-brand-accent",
      image: "/img/music-placeholder.jpg"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % facilities.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + facilities.length) % facilities.length);
  };

  // Auto-advance slides
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isClient]);

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
          Our Facilities
        </h2>
        <p className="text-brand-beige-700">
          World-class infrastructure for holistic development
        </p>
      </motion.div>

      {/* 3D Gallery */}
      <div ref={galleryRef} className="relative overflow-hidden rounded-xl">
        {/* Main Display */}
        <div className="relative h-48 bg-gradient-to-br from-brand-beige-100 to-brand-beige-200 rounded-xl mb-4 overflow-hidden">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            const isActive = index === currentIndex;
            
            return (
              <motion.div
                key={index}
                className={`absolute inset-0 flex items-center justify-center ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 0.8,
                  rotateY: isActive ? 0 : 45
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* 3D Card Effect */}
                <div className="relative w-full h-full">
                  {/* Placeholder for facility image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-beige-200 to-brand-beige-300 flex items-center justify-center">
                    <Icon className={`w-16 h-16 ${facility.color} opacity-40`} />
                  </div>
                  
                  {/* Overlay with facility info */}
                  <div className="absolute inset-0 bg-black/20 flex items-end p-6">
                    <div className="text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5" />
                        <h3 className="font-bold text-lg">{facility.title}</h3>
                      </div>
                      <p className="text-sm opacity-90">{facility.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-brand-beige-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-brand-beige-700" />
          </button>
        </div>

        {/* Facility Grid */}
        <div className="grid grid-cols-3 gap-2">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            const isActive = index === currentIndex;
            
            return (
              <motion.button
                key={index}
                className={`
                  facility-item p-3 rounded-lg border-2 transition-all duration-300 opacity-0
                  ${isActive 
                    ? 'border-brand-primary bg-brand-primary/10' 
                    : 'border-brand-beige-200 bg-white/60 hover:border-brand-primary/50'
                  }
                `}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${
                  isActive ? 'text-brand-primary' : 'text-brand-beige-600'
                }`} />
                <p className={`text-xs font-medium ${
                  isActive ? 'text-brand-primary' : 'text-brand-beige-700'
                }`}>
                  {facility.title}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {facilities.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-brand-primary' : 'w-2 bg-brand-beige-300'
            }`}
          />
        ))}
      </div>

      {/* Decorative 3D Elements */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-brand-primary/20 to-transparent rounded-full blur-lg -z-10"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-br from-brand-secondary/20 to-transparent rounded-full blur-md -z-10"></div>
    </div>
  );
}