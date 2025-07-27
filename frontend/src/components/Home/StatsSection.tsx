"use client";
import { Users, Star, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { CountUp, GlassCard, ClickSpark, SplitText } from '../reactbits';

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
          <SplitText 
            text="Our Achievements" 
            className="text-4xl md:text-5xl font-bold text-nature-primary mb-4"
            animation="slideUp"
          />
          <p className="text-xl text-nature-secondary max-w-3xl mx-auto">
            Building excellence through dedication, innovation, and a commitment to nurturing every student's potential.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <ClickSpark key={idx}>
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
            );
          })}
        </div>
      </div>
    </section>
  );
} 