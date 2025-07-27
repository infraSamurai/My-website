"use client";
import { Trophy, Star, Award, Medal, Crown, Users, Calendar, BookOpen } from 'lucide-react';
import { AnimatedCard, ScrollReveal, AnimatedText, FloatingElements } from '@/components/animated';
import { motion } from 'framer-motion';

const achievementCategories = [
  {
    title: "Academic Excellence",
    icon: BookOpen,
    color: "text-nature-accent",
    bgColor: "from-nature-accent/20 to-nature-accent/5",
    achievements: [
      { name: "Priya Sharma", grade: "Grade 10", achievement: "State Topper - Mathematics Olympiad 2024", image: "/img/student-placeholder.jpg" },
      { name: "Arjun Patel", grade: "Grade 9", achievement: "National Science Fair Winner", image: "/img/student-placeholder.jpg" },
      { name: "Sneha Reddy", grade: "Grade 8", achievement: "Regional English Essay Competition - 1st Place", image: "/img/student-placeholder.jpg" },
    ]
  },
  {
    title: "Sports & Athletics",
    icon: Trophy,
    color: "text-bamboo-fresh",
    bgColor: "from-bamboo-fresh/20 to-bamboo-fresh/5",
    achievements: [
      { name: "Raj Kumar", grade: "Grade 10", achievement: "State Level Cricket Championship - Captain", image: "/img/student-placeholder.jpg" },
      { name: "Ananya Singh", grade: "Grade 9", achievement: "National Swimming Competition - Gold Medal", image: "/img/student-placeholder.jpg" },
      { name: "Vikram Joshi", grade: "Grade 7", achievement: "District Athletics Meet - 3 Gold Medals", image: "/img/student-placeholder.jpg" },
    ]
  },
  {
    title: "Arts & Culture",
    icon: Star,
    color: "text-cherry-whisper",
    bgColor: "from-cherry-whisper/20 to-cherry-whisper/5",
    achievements: [
      { name: "Kavya Mehta", grade: "Grade 10", achievement: "State Level Classical Dance Competition - Winner", image: "/img/student-placeholder.jpg" },
      { name: "Rohan Gupta", grade: "Grade 8", achievement: "Inter-School Music Festival - Best Vocalist", image: "/img/student-placeholder.jpg" },
      { name: "Aisha Khan", grade: "Grade 9", achievement: "National Art Exhibition - Featured Artist", image: "/img/student-placeholder.jpg" },
    ]
  },
  {
    title: "Leadership & Service",
    icon: Crown,
    color: "text-sage-soft",
    bgColor: "from-sage-soft/20 to-sage-soft/5",
    achievements: [
      { name: "Aditi Sharma", grade: "Grade 10", achievement: "Student Council President - Outstanding Leadership", image: "/img/student-placeholder.jpg" },
      { name: "Harsh Agarwal", grade: "Grade 9", achievement: "Community Service Award - 200+ Hours", image: "/img/student-placeholder.jpg" },
      { name: "Meera Iyer", grade: "Grade 8", achievement: "Environmental Club Leader - Tree Plantation Drive", image: "/img/student-placeholder.jpg" },
    ]
  }
];

const schoolAchievements = [
  { title: "Best School Award", year: "2024", description: "Recognized as the Best School in the District", icon: Trophy },
  { title: "Excellence in Education", year: "2023", description: "State Government Recognition for Academic Excellence", icon: Award },
  { title: "Green School Certification", year: "2023", description: "Certified as an Eco-Friendly School", icon: Star },
  { title: "Technology Integration Award", year: "2022", description: "Outstanding use of Technology in Education", icon: Medal },
];

export default function HonorBoardPage() {
  return (
    <div className="min-h-screen bg-nature-primary pt-20">
      <FloatingElements theme="achievement" density="low" className="opacity-5" />
      
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fadeUp">
            <AnimatedText
              text="Honor Board"
              className="text-5xl md:text-7xl font-bold mb-6"
              animation="morphing"
              gradient={true}
            />
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <p className="text-xl md:text-2xl text-nature-secondary mb-8 max-w-3xl mx-auto">
              Celebrating the outstanding achievements of our students and the recognition earned by our school community.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* School Achievements */}
      <section className="section-padding bg-nature-secondary/30">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fadeUp" className="text-center mb-16">
            <h2 className="heading-section text-nature-primary font-japanese mb-4">
              School Achievements
            </h2>
            <p className="body-text text-nature-secondary max-w-3xl mx-auto">
              Our institution's commitment to excellence has been recognized at various levels.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schoolAchievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <ScrollReveal key={index} animation="fadeUp" delay={index * 0.1}>
                  <AnimatedCard 
                    background="gradient" 
                    hoverEffect="lift"
                    className="text-center h-full p-6"
                  >
                    <motion.div
                      className="flex justify-center mb-4"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-16 h-16 text-nature-accent" />
                    </motion.div>
                    
                    <h3 className="heading-card text-nature-primary font-japanese mb-2">
                      {achievement.title}
                    </h3>
                    
                    <div className="text-nature-accent font-semibold mb-3">
                      {achievement.year}
                    </div>
                    
                    <p className="caption-text text-nature-secondary">
                      {achievement.description}
                    </p>
                  </AnimatedCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Student Achievements */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fadeUp" className="text-center mb-16">
            <h2 className="heading-section text-nature-primary font-japanese mb-4">
              Student Achievements
            </h2>
            <p className="body-text text-nature-secondary max-w-3xl mx-auto">
              Our students continue to excel in academics, sports, arts, and leadership, making us proud with their accomplishments.
            </p>
          </ScrollReveal>
          
          <div className="space-y-16">
            {achievementCategories.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              return (
                <div key={categoryIndex}>
                  <ScrollReveal animation="fadeUp" delay={categoryIndex * 0.1}>
                    <div className="flex items-center justify-center mb-8">
                      <div className={`flex items-center gap-4 bg-gradient-to-r ${category.bgColor} p-6 rounded-2xl`}>
                        <CategoryIcon className={`w-8 h-8 ${category.color}`} />
                        <h3 className="heading-card text-nature-primary font-japanese">
                          {category.title}
                        </h3>
                      </div>
                    </div>
                  </ScrollReveal>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.achievements.map((student, studentIndex) => (
                      <ScrollReveal 
                        key={studentIndex} 
                        animation="fadeUp" 
                        delay={categoryIndex * 0.1 + studentIndex * 0.1}
                      >
                        <AnimatedCard 
                          background="glass" 
                          hoverEffect="scale"
                          className="text-center h-full p-6"
                        >
                          <motion.div
                            className="relative mb-6"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-nature-accent to-bamboo-fresh mx-auto flex items-center justify-center">
                              <Users className="w-12 h-12 text-white" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-cherry-whisper to-nature-accent rounded-full flex items-center justify-center">
                              <Trophy className="w-4 h-4 text-white" />
                            </div>
                          </motion.div>
                          
                          <h4 className="heading-card text-nature-primary font-japanese mb-2">
                            {student.name}
                          </h4>
                          
                          <div className="text-nature-accent font-semibold mb-3">
                            {student.grade}
                          </div>
                          
                          <p className="caption-text text-nature-secondary">
                            {student.achievement}
                          </p>
                        </AnimatedCard>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-nature-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fadeUp">
            <AnimatedCard background="gradient" className="max-w-4xl mx-auto p-12">
              <h2 className="heading-section text-nature-primary font-japanese mb-6">
                Inspire Excellence
              </h2>
              <p className="body-text text-nature-secondary mb-8">
                Join our community of achievers and discover your potential. Excellence is not just about winning; it's about continuous growth and making a positive impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/#admissions"
                  className="btn-nature px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply Now
                </motion.a>
                <motion.a
                  href="/#contact"
                  className="btn-ghost px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.a>
              </div>
            </AnimatedCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}