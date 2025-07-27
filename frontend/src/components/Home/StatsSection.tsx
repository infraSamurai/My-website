"use client";
import { Users, Star, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import ClientOnly from '../ClientOnly';

const CountUp = dynamic(() => import('../reactbits/CountUp'), { ssr: false });
const GlassCard = dynamic(() => import('../reactbits/GlassCard'), { ssr: false });
const ClickSpark = dynamic(() => import('../reactbits/ClickSpark'), { ssr: false });
const SplitText = dynamic(() => import('../reactbits/SplitText'), { ssr: false });

const stats = [
  { icon: Users, value: 500, suffix: '+', label: 'Happy Students', color: 'text-nature-accent' },
  { icon: Star, value: 15, suffix: '+', label: 'Years of Excellence', color: 'text-nature-secondary' },
  { icon: BookOpen, value: 100, suffix: '%', label: 'Success Rate', color: 'text-nature-accent' },
  { icon: GraduationCap, value: 50, suffix: '+', label: 'Expert Teachers', color: 'text-nature-secondary' },
];

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-nature-primary/5 dark:bg-nature-primary/10">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <ClientOnly fallback={
            <h2 className="text-4xl md:text-5xl font-bold text-nature-primary mb-4">Our Achievements</h2>
          }>
            <SplitText 
              text="Our Achievements" 
              className="text-4xl md:text-5xl font-bold text-nature-primary mb-4"
              animation="slideUp"
            />
          </ClientOnly>
          <p className="text-xl text-nature-secondary max-w-3xl mx-auto">
            Building excellence through dedication, innovation, and a commitment to nurturing every student's potential.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <ClientOnly 
                key={idx}
                fallback={
                  <div className="text-center p-8 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/30">
                    <div className="flex justify-center mb-6">
                      <Icon className={`w-16 h-16 ${stat.color}`} />
                    </div>
                    <div className="mb-4">
                      <div className="text-4xl md:text-5xl font-bold text-nature-primary">
                        {stat.value}{stat.suffix}
                      </div>
                    </div>
                    <p className="text-nature-secondary text-lg font-medium">
                      {stat.label}
                    </p>
                  </div>
                }
              >
                <ClickSpark>
                  <GlassCard 
                    className="text-center p-8"
                    hover={true}
                    glow={true}
                    blur="md"
                  >
                    <div className="flex justify-center mb-6">
                      <Icon className={`w-16 h-16 ${stat.color}`} />
                    </div>
                    
                    <div className="mb-4">
                      <CountUp 
                        to={stat.value}
                        suffix={stat.suffix}
                        duration={2.5}
                        className="text-4xl md:text-5xl font-bold text-nature-primary"
                      />
                    </div>
                    
                    <p className="text-nature-secondary text-lg font-medium">
                      {stat.label}
                    </p>
                  </GlassCard>
                </ClickSpark>
              </ClientOnly>
            );
          })}
        </div>
      </div>
    </section>
  );
} 