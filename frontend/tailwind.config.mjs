/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-poppins)', 'sans-serif'],
        display: ['var(--font-poppins)', 'sans-serif'],
      },
      colors: {
        brand: {
          // Professional Beige System
          primary: '#D4AF37',     // Sophisticated Gold
          'primary-light': '#E6C558',
          'primary-dark': '#B8941F',
          
          // Professional Blue - Trust and reliability
          secondary: '#4A90E2',   // Professional Blue
          'secondary-light': '#6BA3E8',
          'secondary-dark': '#3577D1',
          
          // Fresh Green - Growth and success
          accent: '#27AE60',      // Success Green
          'accent-light': '#4CBD7A',
          'accent-dark': '#1E8449',
          
          // Warm Beige Backgrounds
          beige: {
            50: '#FAF7F2',        // Primary background
            100: '#F5F1E8',       // Secondary background
            200: '#E8E3D8',       // Subtle borders
            300: '#DDD6C7',       // Muted elements
            400: '#C7BDA8',       // Disabled states
            500: '#A69680',       // Medium contrast
            600: '#8B7B61',       // Text secondary
            700: '#6B5B43',       // Text primary
            800: '#4A3F2F',       // Dark text
            900: '#2C2C2C',       // Charcoal text
          },
          
          // Grays for text and UI
          gray: {
            50: '#F8F9FA',
            100: '#F1F3F4',
            200: '#E8EAED',
            300: '#DADCE0',
            400: '#BDC1C6',
            500: '#9AA0A6',
            600: '#80868B',
            700: '#5F6368',
            800: '#3C4043',
            900: '#202124',
          },
          
          // Space Theme Colors
          space: {
            nebula: '#6B46C1',     // Deep purple for nebula effects
            star: '#F59E0B',       // Golden star color
            planet: '#3B82F6',     // Blue planet
            galaxy: '#8B5CF6',     // Purple galaxy
            cosmic: '#14B8A6',     // Cosmic teal
            void: '#111827',       // Deep space black
          },
          
          // Tech Theme Colors
          tech: {
            neon: '#00FF88',       // Neon green
            circuit: '#22D3EE',    // Electric blue
            matrix: '#10B981',     // Matrix green
            hologram: '#A78BFA',   // Holographic purple
            cyber: '#F59E0B',      // Cyber orange
            digital: '#06B6D4',    // Digital cyan
          },
          
          // Neutral System - Enhanced for dual theme
          neutral: {
            50: '#F8FAFC',   // Off-white background
            100: '#F1F5F9',  // Light gray
            200: '#E2E8F0',  // Border color
            300: '#CBD5E1',  // Muted text
            400: '#94A3B8',  // Placeholder text
            500: '#64748B',  // Secondary text
            600: '#475569',  // Primary text
            700: '#334155',  // Dark text
            800: '#1E293B',  // Dark surface
            900: '#0F172A',  // Dark background
            950: '#020617',  // Deepest dark
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)",
        "gradient-secondary": "linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)",
        "gradient-accent": "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
        "gradient-rainbow": "linear-gradient(135deg, #4F46E5 0%, #8B5CF6 25%, #06B6D4 50%, #10B981 75%, #F59E0B 100%)",
        "gradient-hero": "linear-gradient(135deg, #4F46E5 0%, #8B5CF6 35%, #06B6D4 70%, #10B981 100%)",
        
        // Space Theme Gradients
        "gradient-space": "linear-gradient(135deg, #6B46C1 0%, #8B5CF6 25%, #3B82F6 50%, #14B8A6 75%, #F59E0B 100%)",
        "gradient-nebula": "radial-gradient(ellipse at center, #6B46C1 0%, #8B5CF6 40%, #111827 100%)",
        "gradient-galaxy": "conic-gradient(from 180deg at 50% 50%, #6B46C1 0deg, #8B5CF6 90deg, #3B82F6 180deg, #14B8A6 270deg, #6B46C1 360deg)",
        "gradient-cosmic": "linear-gradient(45deg, #111827 0%, #6B46C1 25%, #8B5CF6 50%, #111827 75%, #6B46C1 100%)",
        
        // Tech Theme Gradients
        "gradient-tech": "linear-gradient(135deg, #00FF88 0%, #22D3EE 25%, #10B981 50%, #A78BFA 75%, #F59E0B 100%)",
        "gradient-neon": "linear-gradient(90deg, #00FF88 0%, #22D3EE 50%, #A78BFA 100%)",
        "gradient-circuit": "linear-gradient(45deg, #22D3EE 0%, #10B981 25%, #06B6D4 50%, #22D3EE 75%, #10B981 100%)",
        "gradient-matrix": "linear-gradient(135deg, #10B981 0%, #00FF88 50%, #10B981 100%)",
        "gradient-hologram": "linear-gradient(135deg, #A78BFA 0%, #22D3EE 25%, #00FF88 50%, #A78BFA 75%, #22D3EE 100%)",
        
        // Light Theme Gradients
        "gradient-light-primary": "linear-gradient(135deg, #6366F1 0%, #A78BFA 100%)",
        "gradient-light-secondary": "linear-gradient(135deg, #FB923C 0%, #FDE68A 100%)",
        "gradient-light-accent": "linear-gradient(135deg, #34D399 0%, #A7F3D0 100%)",
        "gradient-light-hero": "linear-gradient(135deg, #6366F1 0%, #A78BFA 35%, #22D3EE 70%, #34D399 100%)",
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(79, 70, 229, 0.3)',
        'glow-lg': '0 0 40px rgba(79, 70, 229, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};
export default config; 