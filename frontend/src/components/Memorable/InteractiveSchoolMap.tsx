"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

interface MapLocation {
  id: string;
  name: string;
  description: string;
  story: string;
  studentArt?: string;
  position: { x: number; y: number };
  icon: string;
  color: string;
  category: 'classroom' | 'recreation' | 'facility' | 'outdoor';
}

const schoolLocations: MapLocation[] = [
  {
    id: 'main-hall',
    name: 'Main Assembly Hall',
    description: 'Where our school family gathers every morning',
    story: 'Every morning at 8 AM, 500+ voices unite in our traditional school song. The acoustics here are so perfect that even whispered prayers during assembly can be heard clearly at the back.',
    position: { x: 50, y: 30 },
    icon: '🏛️',
    color: '#9CAF88',
    category: 'facility'
  },
  {
    id: 'library',
    name: 'Wisdom Library',
    description: 'A sanctuary of knowledge and quiet discovery',
    story: 'Our library houses over 15,000 books in 8 languages. The reading nook by the window is where Priya discovered her love for poetry, and now she\'s published in our school magazine.',
    studentArt: '📚✨',
    position: { x: 25, y: 45 },
    icon: '📖',
    color: '#8B7355',
    category: 'facility'
  },
  {
    id: 'art-studio',
    name: 'Creative Arts Studio',
    description: 'Where imagination takes colorful form',
    story: 'Last month, our Grade 6 students painted a 50-foot mural depicting the four seasons of learning. The paint splatters on the floor tell stories of countless masterpieces born here.',
    studentArt: '🎨🌈',
    position: { x: 75, y: 50 },
    icon: '🎨',
    color: '#F8BBD9',
    category: 'classroom'
  },
  {
    id: 'playground',
    name: 'Adventure Playground',
    description: 'Where friendships bloom and laughter echoes',
    story: 'The old banyan tree has been here for 50 years, watching generations of students play. Its thick trunk bears carved initials of friendships that have lasted lifetimes.',
    position: { x: 80, y: 75 },
    icon: '🌳',
    color: '#4A7C59',
    category: 'outdoor'
  },
  {
    id: 'science-lab',
    name: 'Discovery Science Lab',
    description: 'Where young scientists make their first breakthroughs',
    story: 'In this lab, Arjun built his first robot using recycled materials. Today, it greets visitors at the entrance, proving that innovation starts with curiosity.',
    studentArt: '🔬⚗️',
    position: { x: 65, y: 25 },
    icon: '🔬',
    color: '#74B9FF',
    category: 'classroom'
  },
  {
    id: 'cafeteria',
    name: 'Community Dining Hall',
    description: 'Where meals become memories',
    story: 'Our school chef, Mrs. Sharma, has been here 20 years. She remembers every student\'s favorite dish and somehow makes even vegetables taste like a celebration.',
    position: { x: 40, y: 65 },
    icon: '🍽️',
    color: '#D4AF37',
    category: 'facility'
  },
  {
    id: 'music-room',
    name: 'Harmony Music Room',
    description: 'Where melodies carry dreams',
    story: 'The piano here has seen 1000+ recitals. Its keys remember the nervous first notes of beginners and the confident crescendos of our annual talent show winners.',
    studentArt: '🎵🎹',
    position: { x: 15, y: 60 },
    icon: '🎵',
    color: '#E17055',
    category: 'classroom'
  },
  {
    id: 'garden',
    name: 'Learning Garden',
    description: 'Where nature teaches its gentlest lessons',
    story: 'Students planted this garden 3 years ago. The butterfly garden section now attracts 12 different species, and our Grade 3 class maintains a detailed observation journal.',
    position: { x: 20, y: 80 },
    icon: '🌺',
    color: '#FF6B6B',
    category: 'outdoor'
  }
];

const categoryColors = {
  classroom: '#F8BBD9',
  recreation: '#74B9FF',
  facility: '#9CAF88',
  outdoor: '#4A7C59'
};

export const InteractiveSchoolMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [visitedLocations, setVisitedLocations] = useState<Set<string>>(new Set());
  const mapRef = useRef<HTMLDivElement>(null);

  const handleLocationClick = (location: MapLocation) => {
    setSelectedLocation(location);
    setVisitedLocations(prev => new Set(Array.from(prev).concat(location.id)));
  };

  const getLocationSize = (location: MapLocation) => {
    const isHovered = hoveredLocation === location.id;
    const isVisited = visitedLocations.has(location.id);
    return isHovered ? 'w-16 h-16' : isVisited ? 'w-12 h-12' : 'w-10 h-10';
  };

  return (
    <section className="py-16 bg-nature-primary relative overflow-hidden">
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
            Explore Our School Campus
          </h2>
          <p className="body-text text-nature-secondary max-w-2xl mx-auto">
            Click on different areas of our campus to discover the stories, memories, and magic that happen in each special place.
          </p>
          <div className="mt-6 text-caption-text text-nature-accent">
            {visitedLocations.size} of {schoolLocations.length} locations discovered
          </div>
        </motion.div>

        {/* Interactive Map */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            ref={mapRef}
            className="relative w-full h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl border-4 border-nature-accent overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Map Background Elements */}
            <div className="absolute inset-0">
              {/* School Building Outline */}
              <div className="absolute top-1/4 left-1/3 w-1/3 h-1/2 bg-stone-200 opacity-30 rounded-lg border-2 border-stone-300" />
              
              {/* Pathways */}
              <div className="absolute top-1/2 left-0 w-full h-2 bg-stone-300 opacity-40" />
              <div className="absolute top-0 left-1/2 w-2 h-full bg-stone-300 opacity-40" />
              
              {/* Garden Areas */}
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-green-200 opacity-30 rounded-full" />
              <div className="absolute top-4 right-4 w-20 h-20 bg-green-200 opacity-30 rounded-full" />
            </div>

            {/* Interactive Location Markers */}
            {schoolLocations.map((location, index) => (
              <motion.div
                key={location.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${location.position.x}%`,
                  top: `${location.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                onHoverStart={() => setHoveredLocation(location.id)}
                onHoverEnd={() => setHoveredLocation(null)}
                onClick={() => handleLocationClick(location)}
              >
                {/* Location Marker */}
                <motion.div
                  className={`${getLocationSize(location)} rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 border-white relative z-10`}
                  style={{ backgroundColor: location.color }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  animate={visitedLocations.has(location.id) ? {
                    boxShadow: ['0 0 0 0px rgba(156,175,136,0.4)', '0 0 0 20px rgba(156,175,136,0)']
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-2xl">{location.icon}</span>
                  
                  {/* Visited indicator */}
                  {visitedLocations.has(location.id) && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>

                {/* Hover Preview */}
                <AnimatePresence>
                  {hoveredLocation === location.id && (
                    <motion.div
                      className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-nature-card rounded-lg p-3 shadow-xl border border-nature-accent min-w-48 z-20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-sm font-medium text-nature-primary">{location.name}</div>
                      <div className="text-xs text-nature-secondary">{location.description}</div>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-nature-card border-r border-b border-nature-accent rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Ripple Effect for Unvisited Locations */}
                {!visitedLocations.has(location.id) && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 opacity-50"
                    style={{ borderColor: location.color }}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Category Legend */}
          <motion.div
            className="flex justify-center flex-wrap gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm font-medium text-nature-primary capitalize">
                  {category.replace('-', ' ')}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          viewport={{ once: true }}
        >
          <div className="w-64 h-2 bg-nature-secondary rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-nature-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(visitedLocations.size / schoolLocations.length) * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="caption-text text-nature-secondary mt-2">
            Campus Discovery Progress
          </p>
        </motion.div>
      </div>

      {/* Location Story Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              className="bg-nature-card rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-nature-accent max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                  style={{ backgroundColor: selectedLocation.color }}
                >
                  <span className="text-4xl">{selectedLocation.icon}</span>
                </div>
                <h3 className="heading-card text-nature-primary mb-2">
                  {selectedLocation.name}
                </h3>
                <p className="caption-text text-nature-accent capitalize">
                  {selectedLocation.category} • School Campus
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-nature-primary mb-2">About this place:</h4>
                  <p className="body-text text-nature-secondary">
                    {selectedLocation.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-nature-primary mb-2">Our Story:</h4>
                  <p className="body-text text-nature-secondary">
                    {selectedLocation.story}
                  </p>
                </div>

                {selectedLocation.studentArt && (
                  <div>
                    <h4 className="font-medium text-nature-primary mb-2">Student Artwork:</h4>
                    <div className="p-4 bg-nature-secondary rounded-xl text-center">
                      <div className="text-6xl mb-2">{selectedLocation.studentArt}</div>
                      <p className="caption-text text-nature-accent">
                        Created by our talented students
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  className="flex-1 btn-nature py-2"
                  onClick={() => setSelectedLocation(null)}
                >
                  Continue Exploring
                </button>
                <motion.button
                  className="px-6 py-2 bg-nature-secondary text-nature-primary rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Could integrate with visit scheduling or contact form
                    setSelectedLocation(null);
                  }}
                >
                  Visit Here
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};