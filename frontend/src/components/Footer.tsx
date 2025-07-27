"use client";
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Phone, MapPin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  { href: '#', icon: Facebook, label: 'Facebook', color: '#9CAF88' },
  { href: '#', icon: Twitter, label: 'Twitter', color: '#4A7C59' },
  { href: '#', icon: Instagram, label: 'Instagram', color: '#F8BBD9' },
  { href: '#', icon: Youtube, label: 'Youtube', color: '#F4A460' },
];

const quickLinks = [
  { href: '/#about', label: 'About Us' },
  { href: '/#admissions', label: 'Admissions' },
  { href: '/#academics', label: 'Academics' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/articles', label: 'Articles' },
  { href: '/#contact', label: 'Contact' },
];

const contactInfo = [
  {
    icon: MapPin,
    text: 'Near Daitrababa Mandir, Murdaha, Varanasi',
    label: 'Address'
  },
  {
    icon: Phone,
    text: '+91 9451016643',
    label: 'Phone'
  },
  {
    icon: Mail,
    text: 'info@akshararambh.edu.in',
    label: 'Email'
  }
];

export default function Footer() {
  return (
    <footer className="relative bg-nature-secondary border-t border-nature-accent overflow-hidden">
      {/* Subtle organic background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full" style={{ background: 'var(--sage-soft)' }} />
        <div className="absolute bottom-20 right-20 w-16 h-16 rounded-full" style={{ background: 'var(--cherry-whisper)' }} />
        <div className="absolute top-1/3 right-10 w-12 h-12 rounded-full" style={{ background: 'var(--bamboo-fresh)' }} />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* School Info */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <h3 className="heading-section text-nature-primary font-japanese mb-2">
                Akshararambh Public School
              </h3>
              <div className="w-16 h-0.5 bg-nature-accent opacity-50"></div>
            </div>
            <p className="body-text text-nature-secondary">
              Nurturing young minds with Japanese-inspired wisdom, creating a harmonious learning environment for a brighter, more compassionate future.
            </p>
            <div className="pt-4">
              <p className="caption-text text-nature-accent font-traditional">
                "Education is the kindling of a flame, not the filling of a vessel" - Socrates
              </p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="heading-card text-nature-primary mb-6 font-minimalist">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a 
                    href={link.href} 
                    className="body-text text-nature-secondary hover:text-nature-accent transition-all duration-300 inline-flex items-center group"
                  >
                    <span className="w-2 h-2 rounded-full bg-nature-accent mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="heading-card text-nature-primary mb-6 font-minimalist">Get in Touch</h4>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <motion.div 
                  key={contact.label}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 rounded-full bg-nature-accent/20 flex items-center justify-center mt-1">
                    <contact.icon className="w-5 h-5 text-nature-accent" />
                  </div>
                  <div>
                    <p className="caption-text text-nature-accent font-medium">{contact.label}</p>
                    <p className="body-text text-nature-secondary">{contact.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Media & Community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="heading-card text-nature-primary mb-6 font-minimalist">Join Our Community</h4>
            <div className="space-y-6">
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a 
                    key={link.label} 
                    href={link.href} 
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group"
                    style={{ backgroundColor: `${link.color}20` }}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: link.color
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <link.icon className="w-6 h-6 text-nature-primary group-hover:text-white transition-colors duration-300" />
                  </motion.a>
                ))}
              </div>
              
              <div className="card-nature p-4">
                <h5 className="caption-text font-medium text-nature-primary mb-2">Newsletter</h5>
                <p className="caption-text text-nature-secondary mb-4">
                  Stay updated with school events and educational insights
                </p>
                <div className="flex space-x-2">
                  <input 
                    type="email" 
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 rounded-lg border border-nature-accent/30 focus:border-nature-accent focus:outline-none text-sm"
                  />
                  <button className="btn-nature px-4 py-2 text-sm">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div 
          className="mt-12 pt-8 border-t border-nature-accent/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="body-text text-nature-secondary">
                &copy; {new Date().getFullYear()} Akshararambh Public School. All Rights Reserved.
              </p>
              <p className="caption-text text-nature-accent font-traditional italic">
                "The pine teaches silence, the rock teaches stillness, the lake teaches reflection"
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="/privacy" className="caption-text text-nature-secondary hover:text-nature-accent transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="caption-text text-nature-secondary hover:text-nature-accent transition-colors">
                Terms of Service
              </a>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="caption-text text-nature-accent">All systems operational</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 