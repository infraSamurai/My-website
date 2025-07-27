"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  studentThought: string;
  icon: string;
  image?: string;
  color: string;
}

const schoolDayEvents: TimelineEvent[] = [
  {
    time: "7:00 AM",
    title: "School Gates Open",
    description: "Students arrive with bright smiles and eager hearts",
    studentThought: "I can't wait to see my friends and learn something new today!",
    icon: "🌅",
    color: "#F4A460",
  },
  {
    time: "8:00 AM",
    title: "Morning Assembly",
    description: "We gather as one school family to start our day together",
    studentThought: "Singing the school song makes me feel proud to be here.",
    icon: "🎵",
    color: "#9CAF88",
  },
  {
    time: "9:00 AM",
    title: "First Period",
    description: "Mathematics - Where numbers become our friends",
    studentThought: "Math is like solving puzzles, and I love puzzles!",
    icon: "📊",
    color: "#8B7355",
  },
  {
    time: "10:30 AM",
    title: "Healthy Break",
    description: "Nutritious snacks and playtime with classmates",
    studentThought: "Break time is the best - I get to play and recharge!",
    icon: "🍎",
    color: "#4A7C59",
  },
  {
    time: "12:00 PM",
    title: "Lunch Together",
    description: "Sharing meals and stories in our dining hall",
    studentThought: "Lunch with friends makes even vegetables taste better!",
    icon: "🍽️",
    color: "#D4AF37",
  },
  {
    time: "1:30 PM",
    title: "Art & Creativity",
    description: "Expressing our imagination through colors and shapes",
    studentThought: "In art class, there are no wrong answers - just creativity!",
    icon: "🎨",
    color: "#F8BBD9",
  },
  {
    time: "3:00 PM",
    title: "Sports & Play",
    description: "Building strong bodies and team spirit",
    studentThought: "Playing together teaches me to be a good teammate.",
    icon: "⚽",
    color: "#74B9FF",
  },
  {
    time: "4:00 PM",
    title: "Study Time",
    description: "Quiet reflection and homework completion",
    studentThought: "This quiet time helps me understand everything better.",
    icon: "📚",
    color: "#6C5CE7",
  },
  {
    time: "5:00 PM",
    title: "Home Time",
    description: "Carrying new knowledge and happy memories home",
    studentThought: "I can't wait to tell my family about my amazing day!",
    icon: "🏠",
    color: "#E17055",
  }
];

export const SchoolDayTimeline = () => {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollXProgress } = useScroll({
    container: containerRef
  });

  return (
    <section className="py-16 bg-nature-primary overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-section text-nature-primary font-japanese mb-4">
            A Day in Our School Life
          </h2>
          <p className="body-text text-nature-secondary max-w-2xl mx-auto">
            Follow a student's journey through a typical day at our school, experiencing the joy, learning, and growth that happens every moment.
          </p>
          <div className="mt-6 text-caption-text text-nature-accent">
            ← Scroll horizontally to explore the day →
          </div>
        </motion.div>

        {/* Horizontal Scrolling Timeline */}
        <div 
          ref={containerRef}
          className="overflow-x-auto scrollbar-hide pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-8 min-w-max px-4">
            {schoolDayEvents.map((event, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-80 relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveEvent(index)}
                onHoverEnd={() => setActiveEvent(null)}
              >
                {/* Timeline Connection Line */}
                {index < schoolDayEvents.length - 1 && (
                  <div 
                    className="absolute top-8 -right-8 w-8 h-0.5 opacity-30"
                    style={{ backgroundColor: event.color }}
                  />
                )}

                {/* Event Card */}
                <motion.div
                  className="card-nature p-6 h-full relative overflow-hidden"
                  style={{ borderLeft: `4px solid ${event.color}` }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: `0 10px 30px ${event.color}20`
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Time Badge */}
                  <div 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white mb-4"
                    style={{ backgroundColor: event.color }}
                  >
                    <span className="mr-2">{event.icon}</span>
                    {event.time}
                  </div>

                  {/* Event Content */}
                  <h3 className="heading-card text-nature-primary mb-3">
                    {event.title}
                  </h3>
                  
                  <p className="body-text text-nature-secondary mb-4">
                    {event.description}
                  </p>

                  {/* Student Thought Bubble */}
                  <motion.div
                    className="relative mt-6 p-4 bg-nature-secondary rounded-2xl"
                    initial={{ opacity: 0.7 }}
                    animate={{ 
                      opacity: activeEvent === index ? 1 : 0.7,
                      scale: activeEvent === index ? 1.02 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Thought bubble tail */}
                    <div 
                      className="absolute -top-2 left-6 w-4 h-4 bg-nature-secondary transform rotate-45"
                    />
                    
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">💭</div>
                      <div>
                        <p className="caption-text text-nature-primary font-traditional italic">
                          "{event.studentThought}"
                        </p>
                        <p className="text-xs text-nature-accent mt-1">
                          - A student's thought
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Icon */}
                  <motion.div
                    className="absolute top-4 right-4 text-4xl opacity-20"
                    animate={{ 
                      rotate: activeEvent === index ? [0, 5, -5, 0] : 0,
                      scale: activeEvent === index ? 1.1 : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {event.icon}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 flex justify-center">
          <div className="w-64 h-2 bg-nature-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-nature-accent rounded-full"
              style={{ 
                scaleX: scrollXProgress,
                transformOrigin: "left"
              }}
            />
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="body-text text-nature-secondary mb-6">
            Every day at our school is filled with discovery, friendship, and growth.
          </p>
          <motion.button
            className="btn-nature px-8 py-3 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Experience Our School Day
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};