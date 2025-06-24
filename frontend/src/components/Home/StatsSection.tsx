"use client";
import { Users, Star, BookOpen, GraduationCap } from 'lucide-react';

const stats = [
  { icon: Users, number: '500+', label: 'Happy Students' },
  { icon: Star, number: '35+', label: 'Years of Excellence' },
  { icon: BookOpen, number: '100%', label: 'Success Rate' },
  { icon: GraduationCap, number: '30+', label: 'Expert Teachers' },
];

export default function StatsSection() {
  return (
    <section className="py-16 relative z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group hover:scale-105 transition-transform">
              <stat.icon className="w-12 h-12 text-brand-primary mx-auto mb-4" />
              <h3 className="text-3xl font-bold bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent mb-2">
                {stat.number}
              </h3>
              <p className="text-brand-neutral-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 