"use client";
import { Heart, Palette, Book, Smile } from 'lucide-react';
import { useState } from 'react';
import Modal from '../Modal';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import ClientOnly from '../ClientOnly';

const BlurIn = dynamic(() => import('../reactbits/BlurIn'), { ssr: false });
const SplitText = dynamic(() => import('../reactbits/SplitText'), { ssr: false });
const GlassCard = dynamic(() => import('../reactbits/GlassCard'), { ssr: false });
const MagneticButton = dynamic(() => import('../reactbits/MagneticButton'), { ssr: false });
const ClickSpark = dynamic(() => import('../reactbits/ClickSpark'), { ssr: false });
const ThemeAwareBackground = dynamic(() => import('../backgrounds/ThemeAwareBackground'), { ssr: false });

const highlights = [
  { icon: Heart, title: 'Caring Environment', desc: 'Where every child feels loved' },
  { icon: Palette, title: 'Creative Learning', desc: 'Art, music, and imagination' },
  { icon: Book, title: 'Strong Academics', desc: 'Excellence in education' },
  { icon: Smile, title: 'Happy Students', desc: 'Joy in every classroom' },
];

const smartEducationContent = (
  <div className="space-y-4 text-nature-secondary leading-relaxed">
    <p>
      At Akshararambh, "Smart Education" is not just about technology; it's a holistic approach to learning that prepares students for the future. We integrate modern teaching methodologies with a strong foundation in core values.
    </p>
    <h4 className="text-xl font-semibold text-nature-primary pt-2">Key Pillars of Our Smart Education:</h4>
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
      <ClientOnly fallback={
        <section className="py-20 bg-nature-primary/5 dark:bg-nature-primary/10 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="heading-section text-nature-primary font-japanese mb-6">A Magical Place to Learn & Grow</h2>
            <p className="text-nature-secondary text-lg mb-6">Welcome to Akshararambh Public School, where learning is an adventure!</p>
          </div>
        </section>
      }>
        <section className="py-20 bg-nature-primary/5 dark:bg-nature-primary/10 relative overflow-hidden">
          <ThemeAwareBackground type="particles" intensity="subtle" className="opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <ClientOnly fallback={
                <h2 className="heading-section text-nature-primary font-japanese mb-6">
                  A Magical Place to Learn & Grow
                </h2>
              }>
                <SplitText 
                  text="A Magical Place to Learn & Grow"
                  className="heading-section text-nature-primary font-japanese mb-6"
                  animation="slideUp"
                />
              </ClientOnly>
              <ClientOnly fallback={
                <p className="text-nature-secondary text-lg mb-6 leading-relaxed">
                  Welcome to Akshararambh Public School, where every child&apos;s journey is filled with wonder, 
                  discovery, and joy. From tiny tots in nursery to young achievers in 10th grade, 
                  we create a nurturing environment where learning is an adventure!
                </p>
              }>
                <BlurIn delay={200}>
                  <p className="text-nature-secondary text-lg mb-6 leading-relaxed">
                    Welcome to Akshararambh Public School, where every child&apos;s journey is filled with wonder, 
                    discovery, and joy. From tiny tots in nursery to young achievers in 10th grade, 
                    we create a nurturing environment where learning is an adventure!
                  </p>
                </BlurIn>
              </ClientOnly>
              <ClientOnly fallback={
                <p className="text-nature-secondary text-lg mb-8 leading-relaxed">
                  Our colorful campus, dedicated teachers, and innovative teaching methods ensure 
                  that every student finds their unique talents and develops a love for learning 
                  that lasts a lifetime.
                </p>
              }>
                <BlurIn delay={400}>
                  <p className="text-nature-secondary text-lg mb-8 leading-relaxed">
                    Our colorful campus, dedicated teachers, and innovative teaching methods ensure 
                    that every student finds their unique talents and develops a love for learning 
                    that lasts a lifetime.
                  </p>
                </BlurIn>
              </ClientOnly>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {highlights.map((item, idx) => (
                  <ClientOnly 
                    key={idx}
                    fallback={
                      <div className="flex gap-3 items-start p-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-lg border border-white/30">
                        <div className="w-12 h-12 bg-nature-accent/10 dark:bg-nature-accent/20 rounded-2xl flex items-center justify-center border border-nature-accent/20">
                          <item.icon className="w-6 h-6 text-nature-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-nature-primary">{item.title}</h4>
                          <p className="text-sm text-nature-secondary">{item.desc}</p>
                        </div>
                      </div>
                    }
                  >
                    <ClickSpark>
                      <GlassCard className="flex gap-3 items-start p-4" hover={true}>
                        <div className="w-12 h-12 bg-nature-accent/10 dark:bg-nature-accent/20 rounded-2xl flex items-center justify-center border border-nature-accent/20">
                          <item.icon className="w-6 h-6 text-nature-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-nature-primary">{item.title}</h4>
                          <p className="text-sm text-nature-secondary">{item.desc}</p>
                        </div>
                      </GlassCard>
                    </ClickSpark>
                  </ClientOnly>
                ))}
              </div>
              <ClientOnly fallback={
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-nature-accent hover:bg-nature-secondary text-white px-8 py-4 rounded-lg font-medium"
                >
                  Discover More
                </button>
              }>
                <ClickSpark>
                  <MagneticButton
                    onClick={() => setIsModalOpen(true)}
                    variant="primary"
                    size="lg"
                    className="bg-nature-accent hover:bg-nature-secondary text-white"
                  >
                    Discover More
                  </MagneticButton>
                </ClickSpark>
              </ClientOnly>
            </div>
            {/* Image & Floating Card */}
            <div className="relative">
              <ClientOnly fallback={
                <div className="p-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-3xl border border-white/30">
                  <div className="rounded-2xl w-full h-[300px] bg-nature-primary/10 dark:bg-nature-primary/20 flex items-center justify-center text-3xl text-nature-secondary">
                    Image Placeholder
                  </div>
                </div>
              }>
                <GlassCard className="p-2" hover={true} glow={true} blur="lg">
                  <div className="rounded-2xl w-full h-[300px] bg-nature-primary/10 dark:bg-nature-primary/20 flex items-center justify-center text-3xl text-nature-secondary">
                    Image Placeholder
                  </div>
                </GlassCard>
              </ClientOnly>
            </div>
          </div>
        </div>
        </section>
      </ClientOnly>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Our Approach to Smart Education">
        {smartEducationContent}
      </Modal>
    </>
  );
} 