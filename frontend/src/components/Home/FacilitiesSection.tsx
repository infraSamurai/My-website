"use client";
import { FloatingLeaf, FloatingBackground } from '../Nature/FloatingLeaves';
import { OrganicFadeIn, StaggerContainer, StaggerChild } from '../Nature/OrganicAnimations';
import { RippleButton } from '../Nature/RippleButton';

const facilities = [
  { name: 'Smart Classrooms', description: 'Interactive digital learning spaces', color: '#4A7C59' },
  { name: 'Science Labs', description: 'Hands-on experiments and discoveries', color: '#9CAF88' },
  { name: 'Sports Arena', description: 'Multiple sports facilities', color: '#7BA05B' },
  { name: 'Art Studio', description: 'Creative expression space', color: '#F8BBD9' },
  { name: 'Music Room', description: 'Learn various instruments', color: '#F4A460' },
  { name: 'Library', description: 'Thousands of books to explore', color: '#8B7355' },
];

export default function FacilitiesSection() {
  return (
    <section className="py-20 relative bg-nature-secondary z-20 overflow-hidden">
      <FloatingBackground density="low" className="opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <OrganicFadeIn>
          <div className="text-center mb-12 nature-spacing">
            <h2 className="heading-section text-nature-primary font-japanese mb-6">
              <span className="text-wabi-sabi font-traditional">
                Amazing Facilities
              </span>
            </h2>
            <p className="body-text text-nature-secondary max-w-2xl mx-auto nature-content">
              Explore our wonderful spaces designed for learning, playing, and growing!
            </p>
          </div>
        </OrganicFadeIn>
        
        <StaggerContainer>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 nature-spacing-large">
            {facilities.map((facility, idx) => (
              <StaggerChild key={idx}>
                <FloatingLeaf 
                  leafType={['leaf', 'cherry', 'bamboo'][idx % 3] as 'leaf' | 'cherry' | 'bamboo'} 
                  intensity="gentle"
                  delay={idx * 0.1}
                >
                  <div className="group relative h-full">
                    <div className="absolute inset-0 bg-gradient-nature-sage opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500"></div>
                    <div className="relative card-nature h-full flex flex-col justify-between">
                      {/* Subtle background accent */}
                      <div 
                        className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 -translate-y-4 translate-x-4"
                        style={{ backgroundColor: facility.color }}
                      />
                      
                      <div className="relative z-10">
                        <div className="text-center mb-6">
                          <div 
                            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                            style={{ backgroundColor: `${facility.color}15` }}
                          >
                            <svg className="w-8 h-8" style={{ color: facility.color }} fill="currentColor" viewBox="0 0 24 24">
                              {idx === 0 && <path d="M4 6H2V20C2 21.11 2.89 22 4 22H18V20H4V6ZM20 2H8C6.89 2 6 2.89 6 4V16C6 17.11 6.89 18 8 18H20C21.11 18 22 17.11 22 16V4C22 2.89 21.11 2 20 2ZM20 16H8V4H20V16ZM12 5.5V13.5L16 9.5L12 5.5Z"/>}
                              {idx === 1 && <path d="M19,3H5C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3M19,19H5V5H19V19Z"/>}
                              {idx === 2 && <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>}
                              {idx === 3 && <path d="M9,11H7V9H9V11M13,7H11V17H13V7M15,11H17V9H15V11Z"/>}
                              {idx === 4 && <path d="M12,3V12.26C11.5,12.09 11,12 10.5,12C8.01,12 6,14.01 6,16.5C6,18.99 8.01,21 10.5,21C12.99,21 15,18.99 15,16.5V7H18V3H12Z"/>}
                              {idx === 5 && <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V7H19V19ZM7 9H17V11H7V9ZM7 13H17V15H7V13Z"/>}
                            </svg>
                          </div>
                          <h3 className="heading-card text-nature-primary font-japanese mb-3">
                            {facility.name}
                          </h3>
                          <p className="body-text text-nature-secondary leading-relaxed">{facility.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-center mt-6">
                        <RippleButton 
                          variant="secondary" 
                          size="sm"
                          className="rounded-xl"
                        >
                          Learn More
                        </RippleButton>
                      </div>
                    </div>
                  </div>
                </FloatingLeaf>
              </StaggerChild>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}