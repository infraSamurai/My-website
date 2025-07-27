"use client";
import { motion } from 'framer-motion';
import { FloatingBackground } from '../Nature/FloatingLeaves';
import { Calendar, Trophy, Palette, Microscope, Music, Leaf } from 'lucide-react';

const activities = [
  { 
    name: 'Annual Day', 
    icon: Music, 
    emoji: '🎭',
    month: 'December',
    description: 'Celebrating achievements and talents',
    color: '#F8BBD9'
  },
  { 
    name: 'Sports Day', 
    icon: Trophy, 
    emoji: '🏃',
    month: 'January',
    description: 'Building strength and team spirit',
    color: '#4A7C59'
  },
  { 
    name: 'Science Fair', 
    icon: Microscope, 
    emoji: '🧪',
    month: 'February',
    description: 'Exploring wonders of discovery',
    color: '#9CAF88'
  },
  { 
    name: 'Art Exhibition', 
    icon: Palette, 
    emoji: '🖼️',
    month: 'March',
    description: 'Expressing creativity and imagination',
    color: '#F4A460'
  },
  { 
    name: 'Cultural Fest', 
    icon: Calendar, 
    emoji: '🎪',
    month: 'November',
    description: 'Celebrating diverse traditions',
    color: '#8B7355'
  },
  { 
    name: 'Environment Day', 
    icon: Leaf, 
    emoji: '🌱',
    month: 'June',
    description: 'Nurturing our planet together',
    color: '#7BA05B'
  },
];

export default function ActivitiesSection() {
  return (
    <section className="py-20 relative z-20 bg-nature-primary overflow-hidden">
      <FloatingBackground density="low" className="opacity-10" />
      
      <div className="container mx-auto px-4">
        {/* Header with Japanese aesthetic */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-section text-nature-primary font-japanese mb-4">
            <span className="text-nature-gradient">
              Fun Activities All Year Round
            </span>
          </h2>
          <p className="body-text text-nature-secondary max-w-2xl mx-auto">
            Exciting events that make school life memorable and meaningful. Each season brings new opportunities for growth, discovery, and joy.
          </p>
          
          {/* Seasonal divider */}
          <motion.div 
            className="flex items-center justify-center space-x-4 mt-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-0.5 bg-nature-accent opacity-50"></div>
            <span className="text-2xl">🌸</span>
            <div className="w-12 h-0.5 bg-nature-accent opacity-50"></div>
          </motion.div>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, idx) => (
            <motion.div 
              key={idx}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="card-nature p-6 text-center h-full relative overflow-hidden">
                {/* Subtle background accent */}
                <div 
                  className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 -translate-y-4 translate-x-4"
                  style={{ backgroundColor: activity.color }}
                />
                
                {/* Icon container with organic styling */}
                <motion.div 
                  className="relative mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${activity.color}20` }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <activity.icon 
                    className="w-8 h-8" 
                    style={{ color: activity.color }}
                  />
                  
                  {/* Floating emoji accent */}
                  <motion.div
                    className="absolute -top-2 -right-2 text-2xl"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.5
                    }}
                  >
                    {activity.emoji}
                  </motion.div>
                </motion.div>

                {/* Content */}
                <h3 className="heading-card text-nature-primary font-minimalist mb-2">
                  {activity.name}
                </h3>
                
                <p className="caption-text text-nature-secondary mb-3">
                  {activity.description}
                </p>
                
                {/* Month badge */}
                <motion.div 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: `${activity.color}15`,
                    color: activity.color
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {activity.month}
                </motion.div>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${activity.color}08 0%, transparent 100%)`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="body-text text-nature-secondary mb-6">
            Every event is designed to nurture creativity, build character, and create lasting memories.
          </p>
          <motion.button
            className="btn-nature px-8 py-3 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Annual Calendar
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 