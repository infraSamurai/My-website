"use client";
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const socialLinks = [
  { href: '#', icon: Facebook, label: 'Facebook' },
  { href: '#', icon: Twitter, label: 'Twitter' },
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Youtube, label: 'Youtube' },
];

const quickLinks = [
  { href: '/#about', label: 'About Us' },
  { href: '/#admissions', label: 'Admissions' },
  { href: '/#academics', label: 'Academics' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-neutral-800/50 backdrop-blur-sm border-t border-brand-neutral-700 text-brand-neutral-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-brand-neutral-50">Akshararambh Public School</h3>
            <p className="text-brand-neutral-400">
              Nurturing young minds for a brighter, more compassionate future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-brand-neutral-100">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-brand-neutral-400 hover:text-brand-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-brand-neutral-100">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-brand-neutral-400 hover:text-brand-primary transition-colors">
                  <link.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-brand-neutral-100">Contact Us</h4>
            <p className="text-brand-neutral-400">123 Learning Lane, Knowledge City</p>
            <p className="text-brand-neutral-400">contact@akshararambh.edu</p>
            <p className="text-brand-neutral-400">+1 (234) 567-890</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-brand-neutral-700 text-center text-brand-neutral-400">
          <p>&copy; {new Date().getFullYear()} Akshararambh Public School. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
} 