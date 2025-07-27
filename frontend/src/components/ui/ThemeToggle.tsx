"use client";
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { ZenToggle } from '../Nature/RippleButton';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ZenToggle
      isActive={theme === 'dark'}
      onToggle={toggleTheme}
      activeIcon={<Moon className="w-5 h-5" />}
      inactiveIcon={<Sun className="w-5 h-5" />}
      className="shadow-organic"
    />
  );
}