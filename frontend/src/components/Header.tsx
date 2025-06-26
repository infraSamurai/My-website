"use client";
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#facilities', label: 'Facilities' },
  { href: '#admissions', label: 'Admissions' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-neutral-900/50 backdrop-blur-sm border-b border-brand-neutral-700/50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image src="/img/logo-removebg-preview.png" alt="Akshararambh Public School Logo" width={50} height={50} />
          <span className="text-xl font-bold text-brand-neutral-100 hidden sm:inline">Akshararambh Public School</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-grow">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-brand-neutral-300 hover:text-brand-primary transition-colors font-medium">
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="hidden md:flex items-center justify-end gap-4 flex-shrink-0">
          <div className="relative group">
            <button disabled className="bg-brand-secondary text-white px-5 py-2 rounded-full font-semibold transition-all cursor-not-allowed opacity-70">
              Virtual Tour
            </button>
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-brand-neutral-700 text-white px-3 py-1.5 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Coming Soon
            </span>
          </div>
          <div className="relative group">
            <button disabled className="bg-brand-primary text-white px-5 py-2 rounded-full font-semibold transition-all cursor-not-allowed opacity-70">
              Parent Portal
            </button>
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-brand-neutral-700 text-white px-3 py-1.5 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Coming Soon
            </span>
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-brand-neutral-100">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-neutral-900/80 backdrop-blur-md px-4 pb-4">
          <nav className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-brand-neutral-100 hover:text-brand-primary py-2 text-center text-lg">
                {link.label}
              </a>
            ))}
            <div className="relative group mt-2">
               <button disabled className="w-full bg-brand-secondary text-white px-5 py-2.5 rounded-full font-semibold transition-all cursor-not-allowed opacity-70">
                Virtual Tour
              </button>
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-brand-neutral-700 text-white px-3 py-1.5 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Coming Soon
              </span>
            </div>
            <div className="relative group mt-2">
              <button disabled className="w-full bg-brand-primary text-white px-5 py-2.5 rounded-full font-semibold transition-all cursor-not-allowed opacity-70">
                Parent Portal
              </button>
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-brand-neutral-700 text-white px-3 py-1.5 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Coming Soon
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
} 