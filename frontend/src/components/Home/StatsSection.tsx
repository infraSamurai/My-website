"use client";
import { Users, Star, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { icon: Users, value: '500+', label: 'Happy Students', color: 'text-brand-primary' },
  { icon: Star, value: '15+', label: 'Years of Excellence', color: 'text-brand-secondary' },
  { icon: BookOpen, value: '100%', label: 'Success Rate', color: 'text-brand-accent' },
  { icon: GraduationCap, value: '50+', label: 'Expert Teachers', color: 'text-brand-primary' },
];

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-brand-beige-100 dark:bg-brand-neutral-800">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-beige-900 dark:text-brand-neutral-100 mb-4">
            Our Achievements
          </h2>
          <p className="text-xl text-brand-beige-700 dark:text-brand-neutral-300 max-w-3xl mx-auto">
            Building excellence through dedication, innovation, and a commitment to nurturing every student's potential.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                className="text-center p-8 bg-white/60 dark:bg-brand-neutral-800/60 backdrop-blur-sm rounded-xl border border-brand-beige-200 dark:border-brand-neutral-700 hover:shadow-lg transition-shadow duration-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-6">
                  <Icon className={`w-16 h-16 ${stat.color}`} />
                </div>
                
                <div className="mb-4">
                  <div className="text-4xl md:text-5xl font-bold text-brand-beige-900 dark:text-brand-neutral-100">
                    {stat.value}
                  </div>
                </div>
                
                <p className="text-brand-beige-700 dark:text-brand-neutral-300 text-lg font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 