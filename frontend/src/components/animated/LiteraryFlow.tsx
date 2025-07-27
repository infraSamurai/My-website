"use client";
import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

interface LiteraryFlowProps {
  className?: string;
  text?: string;
  style?: 'manuscript' | 'typewriter' | 'poetry' | 'calligraphy' | 'modern';
  language?: 'english' | 'latin' | 'ancient' | 'symbolic';
  flowDirection?: 'horizontal' | 'vertical' | 'circular' | 'wave';
  speed?: 'slow' | 'medium' | 'fast';
  interactive?: boolean;
  showInk?: boolean;
}

interface TextElement {
  id: string;
  char: string;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  rotation: number;
  delay: number;
  style: string;
}

export default function LiteraryFlow({
  className = '',
  text = 'In the beginning was the Word, and the Word was with God, and the Word was God...',
  style = 'manuscript',
  language = 'english',
  flowDirection = 'horizontal',
  speed = 'medium',
  interactive = false,
  showInk = true
}: LiteraryFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const styleConfigs = {
      manuscript: {
        fonts: ['serif', 'Times New Roman', 'Georgia'],
        colors: ['#8B4513', '#A0522D', '#654321', '#8B4513'],
        sizeRange: [14, 24],
        decorative: true,
        flourishes: true
      },
      typewriter: {
        fonts: ['monospace', 'Courier New', 'Monaco'],
        colors: ['#2D3748', '#4A5568', '#1A202C', '#2D3748'],
        sizeRange: [12, 16],
        decorative: false,
        flourishes: false
      },
      poetry: {
        fonts: ['serif', 'Times New Roman', 'Palatino'],
        colors: ['#4A5568', '#2D3748', '#718096', '#A0AEC0'],
        sizeRange: [16, 28],
        decorative: true,
        flourishes: true
      },
      calligraphy: {
        fonts: ['cursive', 'Brush Script MT', 'Lucida Handwriting'],
        colors: ['#1A202C', '#2D3748', '#4A5568', '#718096'],
        sizeRange: [18, 32],
        decorative: true,
        flourishes: true
      },
      modern: {
        fonts: ['sans-serif', 'Helvetica', 'Arial'],
        colors: ['#2D3748', '#4A5568', '#718096', '#A0AEC0'],
        sizeRange: [14, 20],
        decorative: false,
        flourishes: false
      }
    };

    const languageTexts = {
      english: text,
      latin: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      ancient: 'Αἰὲν ἀρετὴν καὶ σοφίαν ἀσκέ. Φιλοσοφία βίου κυβερνήτης. Τὸ γινώσκειν σαυτὸν ἀρχὴ σοφίας...',
      symbolic: '∞ ∫ ∂ ∇ ∑ ∏ ∆ Ψ Φ Θ Ω α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ τ υ φ χ ψ ω...'
    };

    const generateTextElements = () => {
      const config = styleConfigs[style];
      const textContent = languageTexts[language];
      const characters = textContent.split('');
      const newElements: TextElement[] = [];

      characters.forEach((char, index) => {
        if (char === ' ') return; // Skip spaces for now

        let x, y;
        switch (flowDirection) {
          case 'horizontal':
            x = (index * 3) % 95;
            y = 20 + Math.floor(index / 32) * 8;
            break;
          case 'vertical':
            x = 20 + Math.floor(index / 20) * 8;
            y = (index * 4) % 90;
            break;
          case 'circular':
            const angle = (index / characters.length) * Math.PI * 2;
            x = 50 + Math.cos(angle) * 30;
            y = 50 + Math.sin(angle) * 30;
            break;
          case 'wave':
            x = (index * 2) % 95;
            y = 50 + Math.sin(index * 0.2) * 20;
            break;
          default:
            x = (index * 3) % 95;
            y = 50;
        }

        const element: TextElement = {
          id: `char-${index}`,
          char: char,
          x: x,
          y: y,
          size: config.sizeRange[0] + Math.random() * (config.sizeRange[1] - config.sizeRange[0]),
          color: config.colors[Math.floor(Math.random() * config.colors.length)],
          opacity: 0,
          rotation: config.decorative ? (Math.random() - 0.5) * 10 : 0,
          delay: index * (speed === 'slow' ? 200 : speed === 'fast' ? 50 : 100),
          style: config.fonts[Math.floor(Math.random() * config.fonts.length)]
        };

        newElements.push(element);
      });

      setTextElements(newElements);
    };

    generateTextElements();
  }, [isClient, text, style, language, flowDirection, speed]);

  useEffect(() => {
    if (!isClient || !containerRef.current || textElements.length === 0) return;

    const animateTextFlow = () => {
      textElements.forEach((element, index) => {
        const elementNode = containerRef.current?.querySelector(`[data-char-id="${element.id}"]`);
        if (!elementNode) return;

        // Typewriter effect
        if (style === 'typewriter') {
          animate(elementNode, {
            opacity: [0, 1],
            scale: [0.8, 1.1, 1],
            duration: 300,
            delay: element.delay,
            easing: 'easeOutExpo',
            begin: () => {
              setCurrentIndex(index);
            }
          });
        }
        
        // Manuscript illumination
        else if (style === 'manuscript') {
          animate(elementNode, {
            opacity: [0, 1],
            scale: [0, 1],
            rotateZ: [element.rotation * 2, element.rotation],
            duration: 800,
            delay: element.delay,
            easing: 'easeOutElastic(1, .8)'
          });
        }
        
        // Poetry flowing
        else if (style === 'poetry') {
          animate(elementNode, {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1000,
            delay: element.delay,
            easing: 'easeOutSine'
          });
        }
        
        // Calligraphy brush strokes
        else if (style === 'calligraphy') {
          animate(elementNode, {
            opacity: [0, 1],
            scaleX: [0, 1.2, 1],
            scaleY: [0, 0.8, 1],
            duration: 600,
            delay: element.delay,
            easing: 'easeOutExpo'
          });
        }
        
        // Modern clean appearance
        else if (style === 'modern') {
          animate(elementNode, {
            opacity: [0, 1],
            translateX: [-20, 0],
            duration: 400,
            delay: element.delay,
            easing: 'easeOutQuad'
          });
        }

        // Continuous floating animation
        setTimeout(() => {
          animate(elementNode, {
            translateY: [0, -2, 0],
            duration: 3000 + Math.random() * 2000,
            easing: 'easeInOutSine',
            loop: true
          });
        }, element.delay + 1000);
      });
    };

    animateTextFlow();

    // Ink spreading effect
    if (showInk) {
      const drawInkEffect = () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Create ink blot effects
        ctx.globalAlpha = 0.1;
        textElements.forEach((element, index) => {
          if (index < currentIndex) {
            const x = (element.x / 100) * canvas.width;
            const y = (element.y / 100) * canvas.height;
            
            ctx.fillStyle = element.color;
            ctx.beginPath();
            ctx.arc(x, y, element.size * 0.8, 0, Math.PI * 2);
            ctx.fill();
            
            // Ink spread
            for (let i = 0; i < 5; i++) {
              const spreadX = x + (Math.random() - 0.5) * 20;
              const spreadY = y + (Math.random() - 0.5) * 20;
              ctx.beginPath();
              ctx.arc(spreadX, spreadY, Math.random() * 3, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });
      };

      const inkAnimation = () => {
        drawInkEffect();
        animationFrameRef.current = requestAnimationFrame(inkAnimation);
      };

      inkAnimation();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [textElements, isClient, style, showInk, currentIndex]);

  const handleCharacterClick = (element: TextElement) => {
    if (!interactive) return;

    const elementNode = containerRef.current?.querySelector(`[data-char-id="${element.id}"]`);
    if (!elementNode) return;

    // Character highlight effect
    animate(elementNode, {
      scale: [1, 1.5, 1],
      opacity: [element.opacity, 1, element.opacity],
      duration: 600,
      easing: 'easeOutElastic(1, .8)',
      complete: () => {
        // Ripple effect
        animate(elementNode, {
          boxShadow: [
            `0 0 0px ${element.color}`,
            `0 0 20px ${element.color}80`,
            `0 0 0px ${element.color}`
          ],
          duration: 1000,
          easing: 'easeOutSine'
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
      {/* Ink canvas */}
      {showInk && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.4 }}
        />
      )}

      {/* Text elements */}
      {textElements.map((element) => (
        <div
          key={element.id}
          data-char-id={element.id}
          className={`absolute transform-gpu ${interactive ? 'cursor-pointer' : ''} select-none`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
            color: element.color,
            opacity: element.opacity,
            transform: `rotate(${element.rotation}deg)`,
            fontFamily: element.style,
            fontWeight: style === 'manuscript' ? 'bold' : 'normal',
            textShadow: style === 'manuscript' ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none',
            transition: 'all 0.3s ease'
          }}
          onClick={() => handleCharacterClick(element)}
        >
          {element.char}
        </div>
      ))}

      {/* Decorative elements */}
      {style === 'manuscript' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Decorative borders */}
          <div className="absolute top-4 left-4 w-8 h-8 border-2 border-amber-700 rounded-full opacity-30" />
          <div className="absolute top-4 right-4 w-8 h-8 border-2 border-amber-700 rounded-full opacity-30" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-amber-700 rounded-full opacity-30" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-amber-700 rounded-full opacity-30" />
        </div>
      )}

      {/* Style info */}
      <div className="absolute bottom-4 left-4 text-white/60 text-xs font-mono pointer-events-none">
        <div>{style.charAt(0).toUpperCase() + style.slice(1)} • {language}</div>
        <div>Flow: {flowDirection}</div>
        <div>Characters: {textElements.length}</div>
      </div>

      {/* Typewriter cursor */}
      {style === 'typewriter' && (
        <div
          className="absolute w-0.5 h-4 bg-gray-800 animate-pulse"
          style={{
            left: `${textElements[currentIndex]?.x || 0}%`,
            top: `${textElements[currentIndex]?.y || 0}%`,
            transform: 'translateY(-2px)'
          }}
        />
      )}
    </div>
  );
}