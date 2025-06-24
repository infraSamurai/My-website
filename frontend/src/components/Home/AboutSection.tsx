"use client";
import { Heart, Palette, Book, Smile } from 'lucide-react';
import { useState } from 'react';
import Modal from '../Modal';

const highlights = [
  { icon: Heart, title: 'Caring Environment', desc: 'Where every child feels loved' },
  { icon: Palette, title: 'Creative Learning', desc: 'Art, music, and imagination' },
  { icon: Book, title: 'Strong Academics', desc: 'Excellence in education' },
  { icon: Smile, title: 'Happy Students', desc: 'Joy in every classroom' },
];

const smartEducationContent = (
  <div className="space-y-4 text-brand-neutral-300 leading-relaxed">
    <p>
      At Akshararambh, "Smart Education" is not just about technology; it's a holistic approach to learning that prepares students for the future. We integrate modern teaching methodologies with a strong foundation in core values.
    </p>
    <h4 className="text-xl font-semibold text-brand-neutral-100 pt-2">Key Pillars of Our Smart Education:</h4>
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
      <section className="py-20 relative z-20 bg-brand-neutral-900 rounded-3xl my-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-neutral-50">
                <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  A Magical Place to Learn &amp; Grow
                </span>
              </h2>
              <p className="text-brand-neutral-300 text-lg mb-6 leading-relaxed">
                Welcome to Akshararambh Public School, where every child&apos;s journey is filled with wonder, 
                discovery, and joy. From tiny tots in nursery to young achievers in 10th grade, 
                we create a nurturing environment where learning is an adventure!
              </p>
              <p className="text-brand-neutral-300 text-lg mb-8 leading-relaxed">
                Our colorful campus, dedicated teachers, and innovative teaching methods ensure 
                that every student finds their unique talents and develops a love for learning 
                that lasts a lifetime.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start group">
                    <div className="w-12 h-12 bg-brand-neutral-800/50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-brand-neutral-700">
                      <item.icon className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-neutral-100">{item.title}</h4>
                      <p className="text-sm text-brand-neutral-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Discover More
              </button>
            </div>
            {/* Image & Floating Card */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-brand-neutral-800 to-brand-neutral-900 rounded-3xl p-2 hover:scale-105 transition-transform duration-500 border border-brand-neutral-700">
                <div className="rounded-2xl w-full h-[300px] bg-brand-neutral-800 flex items-center justify-center text-3xl text-brand-neutral-600">
                  Image Placeholder
                </div>
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-brand-neutral-800/50 backdrop-blur-md rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform border border-brand-neutral-700">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-accent to-orange-500 rounded-2xl flex items-center justify-center">
                    <span className="text-3xl">🌸</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-neutral-100">35+ Years</h4>
                    <p className="text-brand-neutral-400">of Excellence</p>
                  </div>
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