"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Heart, Star } from 'lucide-react';
import Modal from '../Modal';
import AdmissionForm from '../AdmissionForm';
import VisitForm from '../VisitForm';

export default function CTASection() {
  const [isAdmissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [isVisitModalOpen, setVisitModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 relative z-20 bg-nature-primary overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Japanese-inspired decorative elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 text-6xl"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              🌸
            </motion.div>
            <motion.div
              className="absolute bottom-20 right-20 text-5xl"
              animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              🍃
            </motion.div>
            <motion.div
              className="absolute top-1/3 right-10 text-4xl"
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              🌺
            </motion.div>
          </div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="card-nature relative overflow-hidden p-12 md:p-16 text-center">
              {/* Gradient overlay for visual depth */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'linear-gradient(135deg, var(--sage-soft) 0%, var(--bamboo-fresh) 50%, var(--cherry-whisper) 100%)'
                }}
              />
              
              {/* Floating accent elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-nature-accent opacity-20"></div>
                <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-cherry-whisper opacity-30"></div>
                <div className="absolute bottom-6 left-6 w-4 h-4 rounded-full bg-bamboo-fresh opacity-15"></div>
              </div>

              <div className="relative z-10">
                {/* Header with Japanese aesthetic */}
                <motion.div
                  className="flex items-center justify-center space-x-3 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Sparkles className="w-8 h-8 text-nature-accent" />
                  <h2 className="heading-section text-nature-primary font-japanese">
                    Join Our Wonderful School Family!
                  </h2>
                  <Heart className="w-8 h-8 text-cherry-whisper" />
                </motion.div>

                <motion.p 
                  className="body-text text-nature-secondary mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Give your child the gift of joyful learning in a nurturing environment where Japanese wisdom meets modern education. 
                  Every child blooms at their own pace in our garden of knowledge.
                </motion.p>

                {/* Action buttons with organic styling */}
                <motion.div 
                  className="flex flex-wrap gap-6 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.button 
                    onClick={() => setAdmissionModalOpen(true)}
                    className="btn-nature px-8 py-4 font-semibold flex items-center space-x-3 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Star className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Apply for Admission</span>
                  </motion.button>

                  <motion.button 
                    onClick={() => setVisitModalOpen(true)}
                    className="btn-ghost px-8 py-4 font-semibold flex items-center space-x-3 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Schedule a Visit</span>
                  </motion.button>
                </motion.div>

                {/* Japanese Philosophy Cards */}
                <motion.div
                  className="mt-12 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p className="caption-text text-nature-accent mb-8 font-traditional italic">
                    "A journey of a thousand miles begins with a single step"
                  </p>
                  
                  {/* Philosophy Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                      {
                        icon: "nurture",
                        title: "Nurture",
                        subtitle: "育て (Sodate)",
                        description: "Every child grows at their own pace in our caring environment",
                        color: "#9CAF88"
                      },
                      {
                        icon: "growth",
                        title: "Growth", 
                        subtitle: "成長 (Seichō)",
                        description: "Continuous learning through exploration and discovery",
                        color: "#4A7C59"
                      },
                      {
                        icon: "wisdom",
                        title: "Wisdom",
                        subtitle: "知恵 (Chie)", 
                        description: "Building character and knowledge for lifelong success",
                        color: "#8B7355"
                      }
                    ].map((philosophy, index) => (
                      <motion.div
                        key={philosophy.title}
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="card-nature p-6 h-full relative overflow-hidden">
                          {/* Subtle background accent */}
                          <div 
                            className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 -translate-y-4 translate-x-4"
                            style={{ backgroundColor: philosophy.color }}
                          />
                          
                          {/* Professional SVG Icon */}
                          <motion.div 
                            className="mb-6 relative flex justify-center"
                            animate={{ 
                              rotate: [0, 2, -2, 0],
                              scale: [1, 1.02, 1]
                            }}
                            transition={{ 
                              duration: 8,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.5
                            }}
                          >
                            <div 
                              className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                              style={{ backgroundColor: `${philosophy.color}15` }}
                            >
                              <svg className="w-8 h-8" style={{ color: philosophy.color }} fill="currentColor" viewBox="0 0 24 24">
                                {philosophy.icon === "nurture" && (
                                  <path d="M12,3A4,4 0 0,1 16,7C16,8.73 15.36,10.3 14.31,11.46C15.36,12.62 16,14.19 16,15.92C16,18.64 14.35,21 12,21C9.65,21 8,18.64 8,15.92C8,14.19 8.64,12.62 9.69,11.46C8.64,10.3 8,8.73 8,7A4,4 0 0,1 12,3M12,5A2,2 0 0,0 10,7C10,8.45 10.8,9.71 12,10.38C13.2,9.71 14,8.45 14,7A2,2 0 0,0 12,5M12,13.25C11,13.89 10,14.69 10,15.92C10,17.64 10.79,19 12,19C13.21,19 14,17.64 14,15.92C14,14.69 13,13.89 12,13.25Z"/>
                                )}
                                {philosophy.icon === "growth" && (
                                  <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
                                )}
                                {philosophy.icon === "wisdom" && (
                                  <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
                                )}
                              </svg>
                            </div>
                          </motion.div>
                          
                          {/* Content */}
                          <h3 className="heading-card text-nature-primary font-japanese mb-1">
                            {philosophy.title}
                          </h3>
                          <p className="caption-text text-nature-accent font-traditional mb-3">
                            {philosophy.subtitle}
                          </p>
                          <p className="caption-text text-nature-secondary leading-relaxed">
                            {philosophy.description}
                          </p>
                          
                          {/* Hover effect overlay */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                              background: `linear-gradient(135deg, ${philosophy.color}08 0%, transparent 100%)`
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Stats Section */}
                  <div className="flex justify-center flex-wrap gap-8 text-center">
                    <div className="group">
                      <motion.div 
                        className="heading-card text-nature-primary font-minimalist"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        95%
                      </motion.div>
                      <div className="caption-text text-nature-secondary">Parent Satisfaction</div>
                    </div>
                    <div className="group">
                      <motion.div 
                        className="heading-card text-nature-primary font-minimalist"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        100%
                      </motion.div>
                      <div className="caption-text text-nature-secondary">University Placement</div>
                    </div>
                    <div className="group">
                      <motion.div 
                        className="heading-card text-nature-primary font-minimalist"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        20+
                      </motion.div>
                      <div className="caption-text text-nature-secondary">Years of Excellence</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Modal isOpen={isAdmissionModalOpen} onClose={() => setAdmissionModalOpen(false)} title="Admission Application">
        <AdmissionForm />
      </Modal>

      <Modal isOpen={isVisitModalOpen} onClose={() => setVisitModalOpen(false)} title="Schedule a School Visit">
        <VisitForm />
      </Modal>
    </>
  );
} 