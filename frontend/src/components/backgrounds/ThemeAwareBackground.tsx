"use client";
import { useEffect, useState } from 'react';
import AnimatedGradient from './AnimatedGradient';
import ParticleField from './ParticleField';
import GeometricGrid from './GeometricGrid';

type BackgroundType = 'gradient' | 'particles' | 'grid' | 'combined';

interface ThemeAwareBackgroundProps {
  type: BackgroundType;
  className?: string;
  intensity?: 'minimal' | 'subtle' | 'moderate' | 'vibrant';
  interactive?: boolean;
  children?: React.ReactNode;
}

export default function ThemeAwareBackground({
  type,
  className = '',
  intensity = 'subtle',
  interactive = false,
  children
}: ThemeAwareBackgroundProps) {
  const [isDark, setIsDark] = useState(false);

  // Track theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Color schemes for different themes
  const colorSchemes = {
    light: {
      gradient: ['#FAF7F2', '#E6E9E6', '#9CAF88'],
      particles: '#4A7C59',
      grid: '#9CAF88'
    },
    dark: {
      gradient: ['#0A0A0A', '#1A1A2E', '#16213E'],
      particles: '#7BA05B',
      grid: '#7BA05B'
    }
  };

  const currentScheme = isDark ? colorSchemes.dark : colorSchemes.light;

  // Intensity settings
  const intensitySettings = {
    minimal: {
      gradientVariant: 'minimal' as const,
      particleDensity: 'low' as const,
      gridOpacity: 0.05,
      speed: 'slow' as const
    },
    subtle: {
      gradientVariant: 'subtle' as const,
      particleDensity: 'medium' as const,
      gridOpacity: 0.1,
      speed: 'medium' as const
    },
    moderate: {
      gradientVariant: 'subtle' as const,
      particleDensity: 'medium' as const,
      gridOpacity: 0.15,
      speed: 'medium' as const
    },
    vibrant: {
      gradientVariant: 'vibrant' as const,
      particleDensity: 'high' as const,
      gridOpacity: 0.2,
      speed: 'fast' as const
    }
  };

  const settings = intensitySettings[intensity];

  const renderBackground = () => {
    switch (type) {
      case 'gradient':
        return (
          <AnimatedGradient
            variant={settings.gradientVariant}
            speed={settings.speed}
            colors={{
              light: colorSchemes.light.gradient,
              dark: colorSchemes.dark.gradient
            }}
          />
        );

      case 'particles':
        return (
          <ParticleField
            density={settings.particleDensity}
            speed={settings.speed}
            interactive={interactive}
            colors={{
              light: currentScheme.particles,
              dark: currentScheme.particles
            }}
          />
        );

      case 'grid':
        return (
          <GeometricGrid
            pattern="dots"
            size="medium"
            opacity={settings.gridOpacity}
            animated={intensity !== 'minimal'}
            colors={{
              light: currentScheme.grid,
              dark: currentScheme.grid
            }}
          />
        );

      case 'combined':
        return (
          <>
            <AnimatedGradient
              variant="minimal"
              speed="slow"
              colors={{
                light: colorSchemes.light.gradient,
                dark: colorSchemes.dark.gradient
              }}
            />
            <ParticleField
              density="low"
              speed={settings.speed}
              interactive={interactive}
              colors={{
                light: currentScheme.particles,
                dark: currentScheme.particles
              }}
            />
            <GeometricGrid
              pattern="dots"
              size="large"
              opacity={settings.gridOpacity * 0.5}
              animated={intensity !== 'minimal'}
              colors={{
                light: currentScheme.grid,
                dark: currentScheme.grid
              }}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background layers */}
      <div className="absolute inset-0">
        {renderBackground()}
      </div>
      
      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}