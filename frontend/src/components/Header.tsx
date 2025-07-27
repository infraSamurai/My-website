"use client";
import { Menu, X, BookOpen, Users, Phone, Award, Calendar, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navLinks = [
  { href: '/#about', label: 'About', icon: BookOpen },
  { href: '/#facilities', label: 'Facilities', icon: ImageIcon },
  { href: '/honor-board', label: 'Honor Board', icon: Award },
  { href: '/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/academic-calendar', label: 'Calendar', icon: Calendar },
  { href: '/articles', label: 'Articles', icon: BookOpen },
  { href: '/#contact', label: 'Contact', icon: Phone },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-[100] bg-nature-primary/95 dark:bg-nature-primary/95 backdrop-blur-md border-b border-nature-accent/30 dark:border-nature-accent/20 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex-shrink-0">
          {/* Minimalist space - no logo or text */}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center flex-grow">
          <div className="flex items-center gap-8">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-2 text-nature-secondary hover:text-nature-primary dark:text-nature-secondary dark:hover:text-nature-primary transition-all duration-200 font-medium relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Icon size={16} className="group-hover:scale-105 transition-transform" />
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nature-accent group-hover:w-full transition-all duration-200"></span>
                </motion.a>
              );
            })}
          </div>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center justify-end gap-3 flex-shrink-0">
          <ThemeToggle />
          
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <button 
              disabled 
              className="px-4 py-2 bg-nature-secondary text-nature-secondary/60 dark:bg-nature-card dark:text-nature-secondary/60 rounded-lg font-medium cursor-not-allowed"
            >
              Student Portal
            </button>
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-nature-card text-nature-primary dark:bg-nature-primary dark:text-nature-primary px-3 py-1.5 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-nature-accent/30">
              Coming Soon
            </span>
          </motion.div>
          
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <button 
              disabled 
              className="px-4 py-2 bg-nature-secondary text-nature-secondary/60 dark:bg-nature-card dark:text-nature-secondary/60 rounded-lg font-medium cursor-not-allowed"
            >
              Parent Portal
            </button>
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-nature-card text-nature-primary dark:bg-nature-primary dark:text-nature-primary px-3 py-1.5 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-nature-accent/30">
              Coming Soon
            </span>
          </motion.div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="text-nature-secondary p-2 rounded-lg hover:bg-nature-secondary/20 dark:text-nature-secondary dark:hover:bg-nature-card/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-nature-primary/95 dark:bg-nature-primary/95 backdrop-blur-md border-t border-nature-accent/30 dark:border-nature-accent/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="container mx-auto px-4 py-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 text-nature-secondary hover:text-nature-primary dark:text-nature-secondary dark:hover:text-nature-primary py-3 text-lg font-medium border-b border-nature-accent/30 last:border-b-0 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon size={20} />
                      {link.label}
                    </motion.a>
                  );
                })}
                
                <div className="pt-4 space-y-3">
                  <motion.div
                    className="flex justify-center pb-4 border-b border-nature-accent/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <ThemeToggle />
                  </motion.div>
                  
                  <motion.div
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                  >
                    <button 
                      disabled 
                      className="w-full px-4 py-2 bg-nature-secondary/50 text-nature-secondary rounded-lg font-medium opacity-70 cursor-not-allowed"
                    >
                      Student Portal
                    </button>
                    <span className="text-xs text-nature-secondary/60 mt-1 block">Coming Soon</span>
                  </motion.div>
                  
                  <motion.div
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                  >
                    <button 
                      disabled 
                      className="w-full px-4 py-2 bg-nature-accent/50 text-white rounded-lg font-medium opacity-70 cursor-not-allowed"
                    >
                      Parent Portal
                    </button>
                    <span className="text-xs text-nature-secondary/60 mt-1 block">Coming Soon</span>
                  </motion.div>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 