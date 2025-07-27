"use client";
import { useState } from 'react';
import { Camera, Filter, X, ChevronLeft, ChevronRight, Calendar, MapPin, Users } from 'lucide-react';
import { AnimatedCard, ScrollReveal, AnimatedText, FloatingElements } from '@/components/animated';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { id: 'all', name: 'All', icon: Camera },
  { id: 'events', name: 'Events', icon: Calendar },
  { id: 'sports', name: 'Sports', icon: Users },
  { id: 'academics', name: 'Academics', icon: Users },
  { id: 'facilities', name: 'Facilities', icon: MapPin },
];

const galleryItems = [
  {
    id: 1,
    title: "Annual Sports Day 2024",
    description: "Students showcasing their athletic prowess in various sports competitions",
    category: "sports",
    image: "/img/pexels-ben-cheung-140183-715134.jpg",
    date: "March 15, 2024",
    location: "School Sports Ground"
  },
  {
    id: 2,
    title: "Science Exhibition",
    description: "Innovative projects displayed by our budding scientists",
    category: "academics",
    image: "/img/pexels-ben-cheung-140183-715134.jpg",
    date: "February 10, 2024",
    location: "Science Laboratory"
  },
  {
    id: 3,
    title: "Cultural Fest 2024",
    description: "A celebration of diverse cultures and traditions",
    category: "events",
    image: "/img/pexels-ben-cheung-140183-715134.jpg",
    date: "January 20, 2024",
    location: "School Auditorium"
  },
  {
    id: 4,
    title: "Modern Library",
    description: "State-of-the-art library with digital resources",
    category: "facilities",
    image: "/img/pexels-ben-cheung-140183-715134.jpg",
    date: "December 2023",
    location: "Main Building"
  },
  {
    id: 5,
    title: "Mathematics Olympiad",
    description: "Students participating in national mathematics competition",
    category: "academics",
    image: "/img/pexels-ben-cheung-140183-715134.jpg",
    date: "November 2023",
    location: "Computer Lab"
  },
  {
    id: 6,
    title: "Inter-House Cricket Match",
    description: "Exciting cricket matches between different house teams",
    category: "sports",
    image: "/img/pexels-ben-cheung-140183-715134.jpg",
    date: "October 2023",
    location: "Cricket Ground"
  },
  {
    id: 7,
    title: "Annual Day Celebration",
    description: "Grand celebration with performances by students",
    category: "events",
    image: "/img/pexels-ben-cheung-140183-715134.jpg",
    date: "December 2023",
    location: "School Auditorium"
  },
  {
    id: 8,
    title: "Computer Laboratory",
    description: "Advanced computer lab with latest technology",
    category: "facilities",
    image: "/img/pexels-ben-cheung-140183-715134.jpg",
    date: "Ongoing",
    location: "IT Block"
  },
  {
    id: 9,
    title: "Basketball Tournament",
    description: "Inter-school basketball championship",
    category: "sports",
    image: "/img/pexels-ben-cheung-140183-715134.jpg",
    date: "September 2023",
    location: "Basketball Court"
  }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (item: typeof galleryItems[0]) => {
    setSelectedImage(item);
    setCurrentIndex(filteredItems.findIndex(i => i.id === item.id));
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredItems[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredItems[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-nature-primary dark:bg-nature-primary pt-20">
      <FloatingElements theme="general" density="low" />
      
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fadeUp">
            <AnimatedText
              text="Gallery"
              className="text-5xl md:text-7xl font-bold mb-6"
              animation="morphing"
              gradient={true}
            />
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <p className="text-xl md:text-2xl text-nature-secondary dark:text-nature-secondary mb-8 max-w-3xl mx-auto">
              Capturing moments of learning, growth, and celebration at Akshararambh Public School.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fadeUp">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-nature-accent text-white shadow-lg'
                        : 'bg-nature-card text-nature-secondary hover:bg-nature-secondary dark:bg-nature-card dark:text-nature-secondary dark:hover:bg-nature-secondary'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={16} />
                    {category.name}
                  </motion.button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <AnimatedCard
                    background="glass"
                    hoverEffect="lift"
                    className="overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(item)}
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={14} />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-nature-primary dark:text-nature-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-nature-secondary dark:text-nature-secondary text-sm mb-4">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 text-nature-secondary/70 dark:text-nature-secondary/70 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>
                  </AnimatedCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] m-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X size={24} />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={24} />
              </button>

              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-white/80 mb-4">
                  {selectedImage.description}
                </p>
                <div className="flex items-center gap-4 text-white/70 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{selectedImage.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{selectedImage.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}