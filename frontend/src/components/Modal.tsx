"use client";
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Japanese-inspired backdrop with soft blur */}
          <div 
            className="absolute inset-0 backdrop-blur-md"
            style={{ 
              background: 'linear-gradient(135deg, rgba(156, 175, 136, 0.15) 0%, rgba(74, 124, 89, 0.1) 50%, rgba(248, 187, 217, 0.05) 100%)'
            }}
          />
          
          {/* Floating nature elements in background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl opacity-5"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              >
                {['🌸', '🍃', '🌿', '🦋', '🌺', '🌱'][i]}
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nature-inspired card with organic styling */}
            <div className="card-nature relative overflow-hidden">
              {/* Subtle organic background texture */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full" style={{ background: 'var(--cherry-whisper)' }} />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full" style={{ background: 'var(--sage-soft)' }} />
              </div>

              {/* Header with Japanese aesthetic */}
              <div className="relative z-10 flex justify-between items-center p-6 border-b border-nature-accent/20">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-nature-accent"></div>
                  <h3 className="heading-card text-nature-primary font-japanese">
                    {title}
                  </h3>
                </div>
                <motion.button 
                  onClick={onClose} 
                  className="w-10 h-10 rounded-full bg-nature-secondary hover:bg-nature-accent/20 transition-all duration-300 flex items-center justify-center group"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-nature-secondary group-hover:text-nature-primary transition-colors duration-300" />
                </motion.button>
              </div>

              {/* Content area with natural scrolling */}
              <div className="relative z-10 p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {children}
                </motion.div>
              </div>

              {/* Subtle footer accent */}
              <div className="relative z-10 h-2 bg-gradient-to-r from-transparent via-nature-accent/30 to-transparent"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Custom scrollbar styles for Japanese aesthetic
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: var(--stone-calm);
    border-radius: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: var(--sage-soft);
    border-radius: 4px;
    transition: background 0.3s ease;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: var(--bamboo-fresh);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = scrollbarStyles;
  document.head.appendChild(styleElement);
} 