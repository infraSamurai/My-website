"use client";
import { motion } from 'framer-motion';
import { 
  BentoGrid, 
  BentoItem, 
  HeroBento, 
  AboutBento, 
  StatsBento, 
  ProgramsBento, 
  FacilitiesBento 
} from './index';

export default function BentoHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-beige-50 via-brand-beige-100 to-brand-beige-50 pt-16 sm:pt-20">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-beige-900 mb-4 leading-tight">
            Akshararambh Public School
          </h1>
          <p className="text-lg sm:text-xl text-brand-beige-700 max-w-2xl mx-auto px-4">
            Where learning becomes an adventure and every child discovers their unique potential
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <BentoGrid className="max-w-7xl mx-auto">
          {/* Hero Section - Large */}
          <BentoItem size="xl" delay={0.1}>
            <HeroBento />
          </BentoItem>

          {/* About Section - Medium */}
          <BentoItem size="md" delay={0.2}>
            <AboutBento />
          </BentoItem>

          {/* Stats Section - Medium */}
          <BentoItem size="md" delay={0.3}>
            <StatsBento />
          </BentoItem>

          {/* Programs Section - Large */}
          <BentoItem size="lg" delay={0.4}>
            <ProgramsBento />
          </BentoItem>

          {/* Facilities Section - Medium */}
          <BentoItem size="md" delay={0.5}>
            <FacilitiesBento />
          </BentoItem>

          {/* Quick Links - Small */}
          <BentoItem size="sm" delay={0.6}>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-bold text-brand-beige-900 mb-2">Academics</h3>
              <p className="text-brand-beige-600 text-sm">
                Comprehensive curriculum for all grades
              </p>
            </motion.div>
          </BentoItem>

          {/* Admissions - Small */}
          <BentoItem size="sm" delay={0.7}>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="font-bold text-brand-beige-900 mb-2">Admissions</h3>
              <p className="text-brand-beige-600 text-sm">
                Join our school community
              </p>
            </motion.div>
          </BentoItem>

          {/* Contact - Small */}
          <BentoItem size="sm" delay={0.8}>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="font-bold text-brand-beige-900 mb-2">Contact</h3>
              <p className="text-brand-beige-600 text-sm">
                Get in touch with us
              </p>
            </motion.div>
          </BentoItem>

          {/* News & Events - Small */}
          <BentoItem size="sm" delay={0.9}>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📰</span>
              </div>
              <h3 className="font-bold text-brand-beige-900 mb-2">News</h3>
              <p className="text-brand-beige-600 text-sm">
                Latest updates and events
              </p>
            </motion.div>
          </BentoItem>
        </BentoGrid>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-brand-beige-900 mb-4">
            Ready to Begin Your Child's Journey?
          </h2>
          <p className="text-brand-beige-700 mb-8 max-w-2xl mx-auto">
            Join our community of learners and discover the difference that personalized education can make.
          </p>
          <motion.button
            className="bg-brand-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-primary-dark transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule a Visit
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}