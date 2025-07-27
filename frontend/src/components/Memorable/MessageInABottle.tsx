"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

interface BottleMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  messageType: 'inquiry' | 'admission' | 'feedback' | 'collaboration';
}

interface FloatingBottle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  hasMessage: boolean;
}

const messageTypeConfig = {
  inquiry: {
    label: 'General Inquiry',
    icon: '💬',
    color: '#9CAF88',
    description: 'Questions about our school'
  },
  admission: {
    label: 'Admission Interest',
    icon: '🎓',
    color: '#8B7355',
    description: 'Joining our school family'
  },
  feedback: {
    label: 'Feedback & Suggestions',
    icon: '⭐',
    color: '#F8BBD9',
    description: 'Help us improve'
  },
  collaboration: {
    label: 'Partnership',
    icon: '🤝',
    color: '#4A7C59',
    description: 'Working together'
  }
};

export const MessageInABottle = () => {
  const [isWritingMessage, setIsWritingMessage] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [bottleMessage, setBottleMessage] = useState<BottleMessage>({
    name: '',
    email: '',
    subject: '',
    message: '',
    messageType: 'inquiry'
  });
  
  const [floatingBottles] = useState<FloatingBottle[]>(() => 
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      delay: Math.random() * 10,
      duration: 20 + Math.random() * 30,
      hasMessage: Math.random() > 0.7
    }))
  );

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsWritingMessage(false);
    setShowSuccess(true);
    
    // Reset form after success animation
    setTimeout(() => {
      setShowSuccess(false);
      setCurrentStep(1);
      setBottleMessage({
        name: '',
        email: '',
        subject: '',
        message: '',
        messageType: 'inquiry'
      });
    }, 4000);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return bottleMessage.name.trim() && bottleMessage.email.trim();
      case 2:
        return bottleMessage.subject.trim() && bottleMessage.messageType;
      case 3:
        return bottleMessage.message.trim().length >= 10;
      default:
        return false;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-blue-100 relative overflow-hidden">
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
            Send Us a Message in a Bottle
          </h2>
          <p className="body-text text-nature-secondary max-w-2xl mx-auto">
            Like messages cast into the ocean, your thoughts and questions are precious to us. Write your message, and we'll make sure it reaches the right hands.
          </p>
        </motion.div>

        {/* Floating Background Bottles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingBottles.map((bottle) => (
            <motion.div
              key={bottle.id}
              className="absolute text-4xl opacity-20"
              style={{ left: `${bottle.x}%` }}
              initial={{ y: '100vh', rotate: 0 }}
              animate={{
                y: ['-10vh', '-110vh'],
                rotate: [0, 360],
                x: [0, Math.sin(bottle.id) * 50]
              }}
              transition={{
                duration: bottle.duration,
                repeat: Infinity,
                delay: bottle.delay,
                ease: "linear"
              }}
            >
              {bottle.hasMessage ? '💌' : '🍾'}
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Main Bottle */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Bottle Container */}
            <div className="relative bg-gradient-to-b from-green-100 to-green-200 rounded-t-full rounded-b-3xl p-8 shadow-2xl border-4 border-white min-h-96">
              {/* Bottle Neck */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gradient-to-t from-green-200 to-green-300 rounded-t-xl border-4 border-white" />
              
              {/* Cork */}
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-amber-800 rounded-t-lg cursor-pointer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWritingMessage(true)}
              >
                <div className="w-full h-2 bg-amber-900 rounded-t-lg" />
              </motion.div>

              {/* Call to Action */}
              {!isWritingMessage && !showSuccess && (
                <motion.div
                  className="text-center pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div
                    className="text-6xl mb-6"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    📜
                  </motion.div>
                  <h3 className="heading-card text-nature-primary mb-4">
                    Your Message Awaits
                  </h3>
                  <p className="body-text text-nature-secondary mb-6">
                    Click the cork above to open the bottle and share your thoughts with us.
                  </p>
                  <motion.button
                    className="btn-nature px-6 py-3"
                    onClick={() => setIsWritingMessage(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Write Your Message
                  </motion.button>
                </motion.div>
              )}

              {/* Message Form */}
              <AnimatePresence>
                {isWritingMessage && !showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                      {/* Step Indicator */}
                      <div className="flex justify-center mb-8">
                        {[1, 2, 3].map((step) => (
                          <div key={step} className="flex items-center">
                            <motion.div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                                step <= currentStep 
                                  ? 'bg-nature-accent text-white' 
                                  : 'bg-nature-secondary text-nature-primary'
                              }`}
                              animate={step === currentStep ? { scale: [1, 1.1, 1] } : {}}
                              transition={{ duration: 0.5 }}
                            >
                              {step}
                            </motion.div>
                            {step < 3 && (
                              <div className={`w-8 h-0.5 mx-2 ${
                                step < currentStep ? 'bg-nature-accent' : 'bg-nature-secondary'
                              }`} />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Step 1: Personal Info */}
                      {currentStep === 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h4 className="heading-card text-nature-primary mb-4">Tell us about yourself</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-nature-primary mb-2">
                                Your Name *
                              </label>
                              <input
                                type="text"
                                value={bottleMessage.name}
                                onChange={(e) => setBottleMessage({...bottleMessage, name: e.target.value})}
                                className="w-full p-3 border-2 border-nature-accent rounded-lg focus:outline-none focus:border-nature-primary"
                                placeholder="How should we address you?"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-nature-primary mb-2">
                                Email Address *
                              </label>
                              <input
                                type="email"
                                value={bottleMessage.email}
                                onChange={(e) => setBottleMessage({...bottleMessage, email: e.target.value})}
                                className="w-full p-3 border-2 border-nature-accent rounded-lg focus:outline-none focus:border-nature-primary"
                                placeholder="your@email.com"
                                required
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Message Type & Subject */}
                      {currentStep === 2 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h4 className="heading-card text-nature-primary mb-4">What brings you here?</h4>
                          
                          {/* Message Type Selection */}
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            {Object.entries(messageTypeConfig).map(([type, config]) => (
                              <motion.label
                                key={type}
                                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                                  bottleMessage.messageType === type
                                    ? 'border-nature-primary bg-nature-secondary'
                                    : 'border-nature-accent bg-white hover:bg-nature-secondary'
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <input
                                  type="radio"
                                  name="messageType"
                                  value={type}
                                  checked={bottleMessage.messageType === type}
                                  onChange={(e) => setBottleMessage({...bottleMessage, messageType: e.target.value as any})}
                                  className="sr-only"
                                />
                                <div className="text-center">
                                  <div className="text-2xl mb-2">{config.icon}</div>
                                  <div className="font-medium text-nature-primary text-sm">{config.label}</div>
                                  <div className="text-xs text-nature-secondary">{config.description}</div>
                                </div>
                              </motion.label>
                            ))}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-nature-primary mb-2">
                              Subject *
                            </label>
                            <input
                              type="text"
                              value={bottleMessage.subject}
                              onChange={(e) => setBottleMessage({...bottleMessage, subject: e.target.value})}
                              className="w-full p-3 border-2 border-nature-accent rounded-lg focus:outline-none focus:border-nature-primary"
                              placeholder="What's your message about?"
                              required
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Message */}
                      {currentStep === 3 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h4 className="heading-card text-nature-primary mb-4">Your message</h4>
                          <div>
                            <label className="block text-sm font-medium text-nature-primary mb-2">
                              Tell us what's on your mind *
                            </label>
                            <textarea
                              value={bottleMessage.message}
                              onChange={(e) => setBottleMessage({...bottleMessage, message: e.target.value})}
                              className="w-full p-3 border-2 border-nature-accent rounded-lg focus:outline-none focus:border-nature-primary h-32 resize-none"
                              placeholder="Share your thoughts, questions, or dreams with us..."
                              required
                              minLength={10}
                            />
                            <div className="text-xs text-nature-secondary mt-1">
                              {bottleMessage.message.length} characters (minimum 10)
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Navigation Buttons */}
                      <div className="flex justify-between pt-6">
                        <motion.button
                          type="button"
                          onClick={prevStep}
                          className={`px-6 py-2 rounded-lg font-medium ${
                            currentStep === 1 
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                              : 'bg-nature-secondary text-nature-primary hover:bg-nature-accent hover:text-white'
                          }`}
                          disabled={currentStep === 1}
                          whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
                          whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
                        >
                          Previous
                        </motion.button>

                        {currentStep < 3 ? (
                          <motion.button
                            type="button"
                            onClick={nextStep}
                            className={`px-6 py-2 rounded-lg font-medium ${
                              isStepValid()
                                ? 'btn-nature'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={!isStepValid()}
                            whileHover={isStepValid() ? { scale: 1.05 } : {}}
                            whileTap={isStepValid() ? { scale: 0.95 } : {}}
                          >
                            Next
                          </motion.button>
                        ) : (
                          <motion.button
                            type="submit"
                            className={`px-6 py-2 rounded-lg font-medium ${
                              isStepValid()
                                ? 'btn-nature'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={!isStepValid()}
                            whileHover={isStepValid() ? { scale: 1.05 } : {}}
                            whileTap={isStepValid() ? { scale: 0.95 } : {}}
                          >
                            Send Message
                          </motion.button>
                        )}
                      </div>

                      <div className="text-center pt-4">
                        <button
                          type="button"
                          onClick={() => setIsWritingMessage(false)}
                          className="text-sm text-nature-secondary hover:text-nature-primary"
                        >
                          Cancel and close bottle
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success Animation */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    className="text-center pt-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="text-8xl mb-6"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: 2
                      }}
                    >
                      🌊
                    </motion.div>
                    <h3 className="heading-card text-nature-primary mb-4">
                      Your Message is Sailing to Us!
                    </h3>
                    <p className="body-text text-nature-secondary mb-6">
                      Thank you for reaching out. Your message has been cast into our digital ocean and will reach our team within 24 hours.
                    </p>
                    <div className="text-caption-text text-nature-accent">
                      We'll respond to {bottleMessage.email} soon
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};