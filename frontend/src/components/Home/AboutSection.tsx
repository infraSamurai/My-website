"use client";
import { Heart, Palette, Book, Smile } from 'lucide-react';
import { useState } from 'react';
import Modal from '../Modal';
import { FloatingLeaf, FloatingBackground } from '../Nature/FloatingLeaves';
import { OrganicFadeIn, StaggerContainer, StaggerChild } from '../Nature/OrganicAnimations';
import { RippleButton, BreathingCTA } from '../Nature/RippleButton';

const highlights = [
  { icon: Heart, title: 'Caring Environment', desc: 'Where every child feels loved' },
  { icon: Palette, title: 'Creative Learning', desc: 'Art, music, and imagination' },
  { icon: Book, title: 'Strong Academics', desc: 'Excellence in education' },
  { icon: Smile, title: 'Happy Students', desc: 'Joy in every classroom' },
];

const smartEducationContent = (
  <div className="space-y-4 text-brand-beige-700 dark:text-brand-neutral-300 leading-relaxed">
    <p>
      At Akshararambh, "Smart Education" is not just about technology; it's a holistic approach to learning that prepares students for the future. We integrate modern teaching methodologies with a strong foundation in core values.
    </p>
    <h4 className="text-xl font-semibold text-brand-beige-900 dark:text-brand-neutral-100 pt-2">Key Pillars of Our Smart Education:</h4>
    <ul className="list-disc list-inside space-y-2">
      <li><strong>Interactive Learning:</strong> We use smart boards, tablets, and interactive software to make lessons come alive, encouraging active participation.</li>
      <li><strong>STEM Focus:</strong> A strong emphasis on Science, Technology,Engineering, and Mathematics with hands-on projects, coding clubs, and robotics workshops.</li>
      <li><strong>Personalized Learning Paths:</strong> Our adaptive learning platforms cater to the individual pace and style of each student, ensuring no one is left behind.</li>
      <li><strong>Digital Citizenship:</strong> We teach students to be responsible and safe digital citizens, covering topics like online ethics, privacy, and media literacy.</li>
      <li><strong>Global Collaboration:</strong> We connect our classrooms with students and educators from around the world through virtual exchange programs.</li>
    </ul>
    <p>
      Our goal is to foster critical thinking, creativity, and collaboration, empowering our students to thrive in a rapidly changing world.
    </p>
  </div>
);

export default function AboutSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 bg-nature-primary relative overflow-hidden">
        <FloatingBackground density="low" className="opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="heading-section text-nature-primary font-japanese mb-6">
                A Magical Place to Learn &amp; Grow
              </h2>
              <p className="text-brand-beige-700 dark:text-brand-neutral-300 text-lg mb-6 leading-relaxed">
                Welcome to Akshararambh Public School, where every child&apos;s journey is filled with wonder, 
                discovery, and joy. From tiny tots in nursery to young achievers in 10th grade, 
                we create a nurturing environment where learning is an adventure!
              </p>
              <p className="text-brand-beige-700 dark:text-brand-neutral-300 text-lg mb-8 leading-relaxed">
                Our colorful campus, dedicated teachers, and innovative teaching methods ensure 
                that every student finds their unique talents and develops a love for learning 
                that lasts a lifetime.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-2xl flex items-center justify-center border border-brand-primary/20">
                      <item.icon className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-beige-900 dark:text-brand-neutral-100">{item.title}</h4>
                      <p className="text-sm text-brand-beige-600 dark:text-brand-neutral-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-brand-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-primary-dark transition-colors duration-200"
              >
                Discover More
              </button>
            </div>
            {/* Image & Floating Card */}
            <div className="relative">
              <div className="relative bg-white/60 dark:bg-brand-neutral-800/60 backdrop-blur-sm rounded-3xl p-2 border border-brand-beige-200 dark:border-brand-neutral-700">
                <div className="rounded-2xl w-full h-[300px] bg-brand-beige-100 dark:bg-brand-neutral-800 flex items-center justify-center text-3xl text-brand-beige-400 dark:text-brand-neutral-600">
                  Image Placeholder
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Our Approach to Smart Education">
        {smartEducationContent}
      </Modal>
    </>
  );
} 