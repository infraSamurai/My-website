"use client";
import { useEffect } from 'react';
import HeroSection from '../components/Home/HeroSection';
import StatsSection from '../components/Home/StatsSection';
import AboutSection from '../components/Home/AboutSection';
import FacilitiesSection from '../components/Home/FacilitiesSection';
import ActivitiesSection from '../components/Home/ActivitiesSection';
import CTASection from '../components/Home/CTASection';
import ContactSection from '../components/Home/ContactSection';
import { SectionBell } from '../components/Memorable/DigitalSchoolBell';
import { SchoolDayTimeline } from '../components/Memorable/SchoolDayTimeline';
import { GrowthTree } from '../components/Memorable/GrowthTree';

const PlaceholderSection = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
  <section id={id} className="py-20 bg-nature-primary">
    <div className="container mx-auto px-4 text-center">
      <h2 className="heading-section text-nature-primary font-japanese mb-4">{title}</h2>
      <p className="body-text text-nature-secondary max-w-2xl mx-auto">{children}</p>
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
      <SectionBell sectionName="Our School Story">
        <StatsSection />
      </SectionBell>
      <div id="about">
        <SectionBell sectionName="About Us">
          <AboutSection />
        </SectionBell>
      </div>
      <SchoolDayTimeline />
      <PlaceholderSection id="academics" title="Academics">
        Our curriculum is designed to be rigorous and engaging, preparing students for future success. More details coming soon.
      </PlaceholderSection>
      <div id="facilities">
        <SectionBell sectionName="Our Facilities">
          <FacilitiesSection />
        </SectionBell>
      </div>
      <SectionBell sectionName="School Activities">
        <ActivitiesSection />
      </SectionBell>
      <SectionBell sectionName="Student Achievements">
        <GrowthTree />
      </SectionBell>
      <div id="admissions">
        <SectionBell sectionName="Join Our Family">
          <CTASection />
        </SectionBell>
      </div>
      <div id="contact">
        <SectionBell sectionName="Connect With Us">
          <ContactSection />
        </SectionBell>
      </div>
    </>
  );
} 