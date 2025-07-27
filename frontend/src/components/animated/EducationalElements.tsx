"use client";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { 
  BookOpen, GraduationCap, Calculator, Microscope, 
  Globe, Palette, Music, Trophy, Brain, Lightbulb,
  Atom, Dna, FlaskConical, Telescope
} from 'lucide-react';

interface EducationalElementsProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  theme?: 'books' | 'science' | 'arts' | 'math' | 'mixed';
  interactive?: boolean;
  gamified?: boolean;
}

interface EducationalElement {
  id: string;
  type: 'book' | 'science' | 'art' | 'math' | 'achievement';
  icon: React.ElementType;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function EducationalElements({
  className = '',
  density = 'medium',
  theme = 'mixed',
  interactive = false,
  gamified = false
}: EducationalElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<EducationalElement[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [clickedElements, setClickedElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const densityCount = {
      low: 12,
      medium: 20,
      high: 32
    };

    const elementTypes = {
      books: [
        { type: 'book', icon: BookOpen, colors: ['#4F46E5', '#8B5CF6', '#06B6D4'], subjects: ['Literature', 'History', 'Language'] },
        { type: 'book', icon: GraduationCap, colors: ['#10B981', '#F59E0B', '#EF4444'], subjects: ['Education', 'Philosophy', 'Psychology'] }
      ],
      science: [
        { type: 'science', icon: Microscope, colors: ['#06B6D4', '#10B981', '#8B5CF6'], subjects: ['Biology', 'Chemistry', 'Physics'] },
        { type: 'science', icon: Atom, colors: ['#EF4444', '#F59E0B', '#8B5CF6'], subjects: ['Physics', 'Chemistry', 'Astronomy'] },
        { type: 'science', icon: Dna, colors: ['#10B981', '#06B6D4', '#4F46E5'], subjects: ['Biology', 'Genetics', 'Medicine'] },
        { type: 'science', icon: FlaskConical, colors: ['#8B5CF6', '#F59E0B', '#10B981'], subjects: ['Chemistry', 'Lab Work', 'Experiments'] },
        { type: 'science', icon: Telescope, colors: ['#4F46E5', '#8B5CF6', '#06B6D4'], subjects: ['Astronomy', 'Physics', 'Space'] }
      ],
      arts: [
        { type: 'art', icon: Palette, colors: ['#EF4444', '#F59E0B', '#8B5CF6'], subjects: ['Art', 'Design', 'Creativity'] },
        { type: 'art', icon: Music, colors: ['#8B5CF6', '#4F46E5', '#10B981'], subjects: ['Music', 'Performance', 'Theory'] }
      ],
      math: [
        { type: 'math', icon: Calculator, colors: ['#4F46E5', '#06B6D4', '#10B981'], subjects: ['Mathematics', 'Algebra', 'Geometry'] },
        { type: 'math', icon: Brain, colors: ['#8B5CF6', '#EF4444', '#F59E0B'], subjects: ['Logic', 'Problem Solving', 'Analysis'] }
      ],
      mixed: [
        { type: 'book', icon: BookOpen, colors: ['#4F46E5', '#8B5CF6'], subjects: ['Literature', 'History'] },
        { type: 'science', icon: Microscope, colors: ['#06B6D4', '#10B981'], subjects: ['Biology', 'Chemistry'] },
        { type: 'art', icon: Palette, colors: ['#EF4444', '#F59E0B'], subjects: ['Art', 'Design'] },
        { type: 'math', icon: Calculator, colors: ['#4F46E5', '#06B6D4'], subjects: ['Mathematics', 'Logic'] },
        { type: 'achievement', icon: Trophy, colors: ['#F59E0B', '#EF4444'], subjects: ['Achievement', 'Success'] }
      ]
    };

    const generateElements = () => {
      const count = densityCount[density];
      const types = elementTypes[theme];
      const newElements: EducationalElement[] = [];

      for (let i = 0; i < count; i++) {
        const typeData = types[Math.floor(Math.random() * types.length)];
        const element: EducationalElement = {
          id: `edu-${i}`,
          type: typeData.type as EducationalElement['type'],
          icon: typeData.icon,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 18 + 14,
          color: typeData.colors[Math.floor(Math.random() * typeData.colors.length)],
          speed: Math.random() * 0.6 + 0.3,
          subject: typeData.subjects[Math.floor(Math.random() * typeData.subjects.length)],
          difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as EducationalElement['difficulty']
        };
        newElements.push(element);
      }

      setElements(newElements);
    };

    generateElements();
  }, [density, theme, isClient]);

  useEffect(() => {
    if (!isClient || !containerRef.current || elements.length === 0) return;

    // Animate elements with anime.js
    const animateElements = () => {
      elements.forEach((element, index) => {
        const elementNode = containerRef.current?.querySelector(`[data-id="${element.id}"]`);
        if (!elementNode) return;

        if (element.type === 'book') {
          // Floating books with page flip effect
          animate(elementNode, {
            translateY: [0, -12, 0],
            rotate: [0, 3, -3, 0],
            duration: 4000 + Math.random() * 2000,
            delay: index * 200,
            easing: 'easeInOutSine',
            loop: true
          });
        } else if (element.type === 'science') {
          // Scientific elements with discovery animation
          animate(elementNode, {
            scale: [1, 1.15, 1],
            opacity: [0.7, 1, 0.7],
            duration: 3500 + Math.random() * 1500,
            delay: index * 180,
            easing: 'easeInOutSine',
            loop: true
          });
        } else if (element.type === 'art') {
          // Creative elements with artistic flair
          animate(elementNode, {
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            duration: 8000 + Math.random() * 4000,
            delay: index * 250,
            easing: 'easeInOutSine',
            loop: true
          });
        } else if (element.type === 'math') {
          // Mathematical precision with calculated movements
          animate(elementNode, {
            translateX: [0, 15, -15, 0],
            translateY: [0, -8, 8, 0],
            duration: 6000 + Math.random() * 3000,
            delay: index * 300,
            easing: 'easeInOutExpo',
            loop: true
          });
        } else if (element.type === 'achievement') {
          // Achievement badges with celebration effect
          animate(elementNode, {
            scale: [1, 1.3, 1],
            rotate: [0, 15, -15, 0],
            duration: 2500 + Math.random() * 1000,
            delay: index * 400,
            easing: 'easeOutElastic(1, .8)',
            loop: true
          });
        }
      });
    };

    animateElements();
  }, [elements, isClient]);

  const handleElementClick = (element: EducationalElement) => {
    if (!interactive) return;

    const elementNode = containerRef.current?.querySelector(`[data-id="${element.id}"]`);
    if (!elementNode) return;

    // Mark as clicked for gamification
    if (gamified) {
      setClickedElements(prev => new Set([...prev, element.id]));
    }

    // Learning animation on click
    animate(elementNode, {
      scale: [1, 1.6, 1],
      rotate: [0, 360],
      duration: 1000,
      easing: 'easeOutElastic(1, .6)',
      complete: () => {
        // Success sparkle effect
        animate(elementNode, {
          opacity: [1, 0.3, 1],
          scale: [1, 1.1, 1],
          duration: 600,
          easing: 'easeInOutSine'
        });
      }
    });
  };

  if (!isClient) {
    return <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />;
  }

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${interactive ? 'pointer-events-auto' : 'pointer-events-none'} ${className}`}
    >
      {elements.map((element) => {
        const IconComponent = element.icon;
        const isClicked = clickedElements.has(element.id);
        
        return (
          <motion.div
            key={element.id}
            data-id={element.id}
            className={`absolute ${interactive ? 'cursor-pointer' : ''} group`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              color: element.color,
              fontSize: `${element.size}px`
            }}
            onClick={() => handleElementClick(element)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isClicked ? 1 : 0.6, scale: 1 }}
            transition={{ duration: 0.8, delay: elements.indexOf(element) * 0.08 }}
          >
            <IconComponent 
              size={element.size} 
              className={`
                drop-shadow-lg transition-all duration-300
                ${element.type === 'book' ? 'animate-float' : ''}
                ${element.type === 'science' ? 'animate-pulse-slow' : ''}
                ${element.type === 'art' ? 'animate-spin-slow' : ''}
                ${element.type === 'math' ? 'animate-bounce-slow' : ''}
                ${element.type === 'achievement' ? 'animate-glow' : ''}
                ${isClicked ? 'animate-cosmic-pulse' : ''}
                ${interactive ? 'group-hover:scale-110' : ''}
              `}
            />
            
            {/* Tooltip for interactive mode */}
            {interactive && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {element.subject} • {element.difficulty}
              </div>
            )}
            
            {/* Gamification indicator */}
            {gamified && isClicked && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
            )}
          </motion.div>
        );
      })}
      
      {/* Gamification progress indicator */}
      {gamified && clickedElements.size > 0 && (
        <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-sm">
              {clickedElements.size}/{elements.length} Discovered
            </span>
          </div>
        </div>
      )}
    </div>
  );
}