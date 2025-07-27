"use client";
import { Heart, Palette, Book, Smile } from 'lucide-react';
import { useState } from 'react';
import Modal from '../Modal';
import { ThemeAwareBackground } from '../backgrounds';
import { BlurIn, SplitText, GlassCard, MagneticButton, ClickSpark } from '../reactbits';
import { motion } from 'framer-motion';

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
      <section className="py-20 bg-nature-primary/5 dark:bg-nature-primary/10 relative overflow-hidden">
        <ThemeAwareBackground type="particles" intensity="subtle" className="opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <SplitText 
                text="A Magical Place to Learn & Grow"
                className="heading-section text-nature-primary font-japanese mb-6"
                animation="slideUp"
              />
              <BlurIn delay={200}>
                <p className="text-nature-secondary text-lg mb-6 leading-relaxed">
                  Welcome to Akshararambh Public School, where every child&apos;s journey is filled with wonder, 
                  discovery, and joy. From tiny tots in nursery to young achievers in 10th grade, 
                  we create a nurturing environment where learning is an adventure!
                </p>
              </BlurIn>
              <BlurIn delay={400}>
                <p className="text-nature-secondary text-lg mb-8 leading-relaxed">
                  Our colorful campus, dedicated teachers, and innovative teaching methods ensure 
                  that every student finds their unique talents and develops a love for learning 
                  that lasts a lifetime.
                </p>
              </BlurIn>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {highlights.map((item, idx) => (
                  <ClickSpark key={idx}>
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
                ))}
              </div>
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
            </div>
            {/* Image & Floating Card */}
            <div className="relative">
              <GlassCard className="p-2" hover={true} glow={true} blur="lg">
                <div className="rounded-2xl w-full h-[300px] bg-nature-primary/10 dark:bg-nature-primary/20 flex items-center justify-center text-3xl text-nature-secondary">
                  Image Placeholder
                </div>
              </GlassCard>
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