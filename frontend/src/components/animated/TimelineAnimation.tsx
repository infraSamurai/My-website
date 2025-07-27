"use client";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Timeline, stagger } from 'animejs';

interface TimelineAnimationProps {
  className?: string;
  elements: TimelineElement[];
  theme?: 'default' | 'space' | 'tech' | 'educational';
  autoPlay?: boolean;
  interactive?: boolean;
  duration?: number;
}

interface TimelineElement {
  id: string;
  title: string;
  description?: string;
  delay: number;
  duration: number;
  easing?: string;
  transform?: {
    translateX?: number[];
    translateY?: number[];
    scale?: number[];
    rotate?: number[];
    opacity?: number[];
  };
  color?: string;
  icon?: React.ReactNode;
}

export default function TimelineAnimation({
  className = '',
  elements,
  theme = 'default',
  autoPlay = true,
  interactive = false,
  duration = 1000
}: TimelineAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [currentElement, setCurrentElement] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current || elements.length === 0) return;

    const createTimeline = () => {
      const timeline = new Timeline({
        duration: duration,
        autoplay: autoPlay,
        onUpdate: (anim) => {
          const progress = anim.progress || 0;
          const elementIndex = Math.floor((progress / 100) * elements.length);
          setCurrentElement(elementIndex);
        },
        onBegin: () => {
          setIsPlaying(true);
        },
        onComplete: () => {
          setIsPlaying(false);
          if (autoPlay) {
            // Restart animation after delay
            setTimeout(() => {
              timeline.restart();
            }, 2000);
          }
        }
      });

      elements.forEach((element, index) => {
        const elementNode = containerRef.current?.querySelector(`[data-id="${element.id}"]`);
        if (!elementNode) return;

        const transform = element.transform || {};
        
        timeline.add(elementNode, {
          translateX: transform.translateX || [0, 0],
          translateY: transform.translateY || [0, 0],
          scale: transform.scale || [0, 1],
          rotate: transform.rotate || [0, 0],
          opacity: transform.opacity || [0, 1],
          duration: element.duration,
          delay: element.delay,
          easing: element.easing || 'easeOutExpo',
          begin: () => {
            setCurrentElement(index);
          }
        }, index * 200);
      });

      // Add stagger effect for multiple elements
      if (elements.length > 1) {
        const allElements = containerRef.current?.querySelectorAll('[data-timeline-element]');
        if (allElements) {
          timeline.add(allElements, {
            scale: [1, 1.05, 1],
            duration: 300,
            delay: stagger(100),
            easing: 'easeInOutSine'
          }, '-=500');
        }
      }

      timelineRef.current = timeline;
    };

    createTimeline();

    return () => {
      if (timelineRef.current) {
        timelineRef.current.pause();
      }
    };
  }, [elements, isClient, autoPlay, duration]);

  const handlePlay = () => {
    if (timelineRef.current) {
      timelineRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (timelineRef.current) {
      timelineRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    if (timelineRef.current) {
      timelineRef.current.restart();
      setIsPlaying(true);
    }
  };

  const handleElementClick = (index: number) => {
    if (!interactive || !timelineRef.current) return;

    const progress = (index / elements.length) * 100;
    timelineRef.current.seek(progress);
    setCurrentElement(index);
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'space':
        return 'bg-gradient-space text-white';
      case 'tech':
        return 'bg-gradient-tech text-white';
      case 'educational':
        return 'bg-gradient-rainbow text-white';
      default:
        return 'bg-gradient-primary text-white';
    }
  };

  if (!isClient) {
    return <div className={`w-full h-64 ${className}`} />;
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div 
        ref={containerRef}
        className="relative w-full h-64 overflow-hidden rounded-2xl p-8"
      >
        {/* Timeline Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-300"
            style={{ 
              width: `${currentElement >= 0 ? ((currentElement + 1) / elements.length) * 100 : 0}%` 
            }}
          />
        </div>

        {/* Timeline Elements */}
        <div className="flex items-center justify-center h-full">
          {elements.map((element, index) => (
            <motion.div
              key={element.id}
              data-id={element.id}
              data-timeline-element
              className={`
                absolute flex flex-col items-center justify-center
                p-4 rounded-xl backdrop-blur-lg border border-white/20
                ${interactive ? 'cursor-pointer' : ''}
                ${index === currentElement ? 'ring-2 ring-white/50' : ''}
                ${getThemeClasses()}
              `}
              style={{
                left: `${(index / Math.max(elements.length - 1, 1)) * 80 + 10}%`,
                top: '50%',
                transform: 'translateY(-50%)',
                color: element.color || 'inherit'
              }}
              onClick={() => handleElementClick(index)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: index <= currentElement ? 1 : 0.3,
                scale: index === currentElement ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              {element.icon && (
                <div className="mb-2 text-2xl">
                  {element.icon}
                </div>
              )}
              <h3 className="text-sm font-bold text-center mb-1">
                {element.title}
              </h3>
              {element.description && (
                <p className="text-xs text-center opacity-80">
                  {element.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Timeline Connection Lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-0.5 bg-white/30">
          <div 
            className="h-full bg-white transition-all duration-500"
            style={{ 
              width: `${currentElement >= 0 ? ((currentElement + 1) / elements.length) * 100 : 0}%` 
            }}
          />
        </div>
      </div>

      {/* Controls */}
      {interactive && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={handlePlay}
            disabled={isPlaying}
            className="px-4 py-2 bg-brand-primary text-white rounded-lg disabled:opacity-50 hover:bg-brand-primary-dark transition-colors"
          >
            Play
          </button>
          <button
            onClick={handlePause}
            disabled={!isPlaying}
            className="px-4 py-2 bg-brand-secondary text-white rounded-lg disabled:opacity-50 hover:bg-brand-secondary-dark transition-colors"
          >
            Pause
          </button>
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-brand-accent text-white rounded-lg hover:bg-brand-accent-dark transition-colors"
          >
            Restart
          </button>
        </div>
      )}

      {/* Element Info Panel */}
      {currentElement >= 0 && elements[currentElement] && (
        <motion.div
          className="mt-6 p-4 glass-card rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="text-lg font-bold mb-2">
            {elements[currentElement].title}
          </h4>
          {elements[currentElement].description && (
            <p className="text-brand-neutral-300">
              {elements[currentElement].description}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}