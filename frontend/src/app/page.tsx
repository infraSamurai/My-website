"use client";
import { useEffect } from 'react';
import HeroSection from '../components/Home/HeroSection';
import StatsSection from '../components/Home/StatsSection';
import AboutSection from '../components/Home/AboutSection';
import FacilitiesSection from '../components/Home/FacilitiesSection';
import ActivitiesSection from '../components/Home/ActivitiesSection';
import CTASection from '../components/Home/CTASection';
import ContactSection from '../components/Home/ContactSection';
import WavelengthBackground from '@/components/Home/WavelengthBackground';


const PlaceholderSection = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
  <section id={id} className="py-20 bg-brand-neutral-900 text-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      <p className="text-lg text-brand-neutral-300">{children}</p>
    </div>
  </section>
);


export default function HomePage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const el = document.getElementById(window.location.hash.substring(1));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Wait for DOM to paint
      }
    }
  }, []);
  return (
    <>
      <HeroSection />
      <StatsSection />
      <div id="about">
        <AboutSection />
      </div>
      <PlaceholderSection id="academics" title="Academics">
        Our curriculum is designed to be rigorous and engaging, preparing students for future success. More details coming soon.
      </PlaceholderSection>
      <div id="facilities">
         <FacilitiesSection />
      </div>
      <ActivitiesSection />
      <div id="admissions">
        <CTASection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </>
  );
} 