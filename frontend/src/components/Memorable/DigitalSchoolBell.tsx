"use client";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

interface DigitalSchoolBellProps {
  children: React.ReactNode;
  delay?: number;
  intensity?: 'gentle' | 'medium' | 'strong';
  bellColor?: string;
}

export const DigitalSchoolBell = ({ 
  children, 
  delay = 0,
  intensity = 'gentle',
  bellColor = '#9CAF88'
}: DigitalSchoolBellProps) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [showRipple, setShowRipple] = useState(false);
  const [hasChimed, setHasChimed] = useState(false);

  const intensityConfig = {
    gentle: { scale: 1.02, duration: 2000 },
    medium: { scale: 1.05, duration: 1500 },
    strong: { scale: 1.08, duration: 1000 }
  };

  const config = intensityConfig[intensity];

  useEffect(() => {
    if (inView && !hasChimed) {
      const timer = setTimeout(() => {
        setShowRipple(true);
        setHasChimed(true);
        
        // Create gentle chime effect (visual only for now)
        const chimeTimer = setTimeout(() => {
          setShowRipple(false);
        }, config.duration);

        return () => clearTimeout(chimeTimer);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [inView, hasChimed, delay, config.duration]);

  return (
    <div ref={ref} className="relative">
      {/* Digital School Bell Ripple Effect */}
      {showRipple && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: -1 }}
        >
          {/* Multiple ripple rings for temple bell effect */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute top-1/2 left-1/2 rounded-full border-2 opacity-30"
              style={{
                borderColor: bellColor,
                marginTop: '-50%',
                marginLeft: '-50%'
              }}
              initial={{ 
                width: 0, 
                height: 0, 
                opacity: 0.6 
              }}
              animate={{ 
                width: `${200 + ring * 100}%`, 
                height: `${200 + ring * 100}%`,
                opacity: 0
              }}
              transition={{
                duration: config.duration / 1000,
                delay: ring * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
          
          {/* Central glow effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${bellColor}20 0%, transparent 70%)`,
              marginTop: '-25%',
              marginLeft: '-25%'
            }}
            initial={{ 
              width: 0, 
              height: 0, 
              opacity: 0 
            }}
            animate={{ 
              width: '150%', 
              height: '150%',
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: config.duration / 1000,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}

      {/* Content with gentle discovery animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { 
          opacity: 1, 
          y: 0,
          scale: showRipple ? config.scale : 1
        } : {}}
        transition={{
          duration: 1.2,
          delay: delay / 1000,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Section Bell Wrapper - Auto-detects when sections come into view
export const SectionBell = ({ 
  children,
  sectionName = "Section",
  className = ""
}: {
  children: React.ReactNode;
  sectionName?: string;
  className?: string;
}) => {
  return (
    <div className={`relative ${className}`}>
      <DigitalSchoolBell 
        delay={300}
        intensity="gentle"
        bellColor="#9CAF88"
      >
        {children}
      </DigitalSchoolBell>
    </div>
  );
};

// Gentle Page Entry Bell - For major page transitions
export const PageEntryBell = ({ 
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {hasEntered && (
          <DigitalSchoolBell 
            delay={800}
            intensity="gentle"
            bellColor="#8B7355"
          >
            {children}
          </DigitalSchoolBell>
        )}
      </motion.div>
    </div>
  );
};

// Discovery Bell - For interactive elements
export const DiscoveryBell = ({ 
  children,
  onDiscovery,
  className = ""
}: {
  children: React.ReactNode;
  onDiscovery?: () => void;
  className?: string;
}) => {
  const [discovered, setDiscovered] = useState(false);

  const handleDiscovery = () => {
    if (!discovered) {
      setDiscovered(true);
      onDiscovery?.();
    }
  };

  return (
    <div 
      className={`cursor-pointer ${className}`}
      onMouseEnter={handleDiscovery}
      onClick={handleDiscovery}
    >
      {discovered ? (
        <DigitalSchoolBell 
          delay={0}
          intensity="medium"
          bellColor="#F8BBD9"
        >
          {children}
        </DigitalSchoolBell>
      ) : (
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};