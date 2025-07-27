"use client";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Calendar, MessageCircle, MapPin, Check, AlertCircle } from 'lucide-react';

export default function VisitForm() {
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    preferredDate: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  // Form field configurations
  const formFields = [
    {
      name: 'parentName',
      type: 'text',
      placeholder: "Parent's Name",
      icon: User,
      required: true,
      label: 'Parent/Guardian Name'
    },
    {
      name: 'parentEmail',
      type: 'email',
      placeholder: "Parent's Email",
      icon: Mail,
      required: true,
      label: 'Email Address'
    },
    {
      name: 'parentPhone',
      type: 'tel',
      placeholder: "Parent's Phone",
      icon: Phone,
      required: true,
      label: 'Contact Number'
    },
    {
      name: 'preferredDate',
      type: 'date',
      placeholder: "Preferred Visit Date",
      icon: Calendar,
      required: true,
      label: 'Preferred Visit Date'
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('/api/send-visit-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          parentName: '',
          parentEmail: '',
          parentPhone: '',
          preferredDate: '',
          message: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Submission failed:', errorData);
        setStatus('error');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setStatus('error');
    }
  };

  return (
    <div className="relative">
      {/* Floating nature elements for organic feel */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-10"
            style={{
              left: `${25 + i * 30}%`,
              top: `${15 + i * 25}%`,
            }}
            animate={{
              y: [0, -8, 0],
              rotate: [0, 8, -8, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut"
            }}
          >
            {['🏫', '🌺', '🍃'][i]}
          </motion.div>
        ))}
      </div>

      <motion.form 
        ref={formRef}
        onSubmit={handleSubmit} 
        className="relative z-10 space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Form Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <MapPin className="w-6 h-6 text-nature-accent" />
            <h3 className="heading-card text-nature-primary font-japanese">
              Schedule Your Campus Visit
            </h3>
          </div>
          <p className="caption-text text-nature-secondary">
            Experience our nurturing environment firsthand. See where your child's journey will unfold.
          </p>
          <div className="w-16 h-0.5 bg-nature-accent mx-auto mt-4 opacity-50"></div>
        </motion.div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map((field, index) => (
            <motion.div
              key={field.name}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              {/* Field Label */}
              <motion.label
                className="block caption-text font-medium text-nature-primary mb-2"
                animate={{
                  color: focusedField === field.name ? '#4A7C59' : '#8B7355'
                }}
                transition={{ duration: 0.3 }}
              >
                {field.label} {field.required && <span className="text-red-400">*</span>}
              </motion.label>

              {/* Input Container */}
              <div className="relative">
                <motion.div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
                  animate={{
                    scale: focusedField === field.name ? 1.1 : 1,
                    color: focusedField === field.name ? '#4A7C59' : '#9CAF88'
                  }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                >
                  <field.icon className="w-5 h-5" />
                </motion.div>

                <motion.input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  onFocus={() => handleFocus(field.name)}
                  onBlur={handleBlur}
                  className="w-full pl-12 pr-4 py-3 bg-nature-secondary border-2 rounded-xl focus:outline-none transition-all duration-300 body-text"
                  style={{
                    borderColor: focusedField === field.name ? '#4A7C59' : '#E8E8E8',
                    color: '#8B7355'
                  }}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Focus Ring Animation */}
                <AnimatePresence>
                  {focusedField === field.name && (
                    <motion.div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        boxShadow: '0 0 0 3px rgba(74, 124, 89, 0.1)'
                      }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message Field */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <label className="block caption-text font-medium text-nature-primary mb-2">
            Special Requests or Questions (Optional)
          </label>
          <div className="relative">
            <motion.div
              className="absolute left-3 top-4 z-10"
              animate={{
                scale: focusedField === 'message' ? 1.1 : 1,
                color: focusedField === 'message' ? '#4A7C59' : '#9CAF88'
              }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            >
              <MessageCircle className="w-5 h-5" />
            </motion.div>

            <motion.textarea
              name="message"
              placeholder="Any specific areas you'd like to see? Questions about programs? Let us know..."
              value={formData.message}
              onChange={handleChange}
              onFocus={() => handleFocus('message')}
              onBlur={handleBlur}
              rows={4}
              className="w-full pl-12 pr-4 py-3 bg-nature-secondary border-2 rounded-xl focus:outline-none transition-all duration-300 body-text resize-none"
              style={{
                borderColor: focusedField === 'message' ? '#4A7C59' : '#E8E8E8',
                color: '#8B7355'
              }}
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.div>

        {/* Visit Information */}
        <motion.div
          className="bg-nature-secondary/50 rounded-xl p-6 border border-nature-accent/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h4 className="caption-text font-medium text-nature-primary mb-3 flex items-center space-x-2">
            <span>📅</span>
            <span>Visit Information</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-nature-secondary">
            <div>
              <strong>Visit Duration:</strong> 1-2 hours
            </div>
            <div>
              <strong>Available Days:</strong> Monday to Friday
            </div>
            <div>
              <strong>Time Slots:</strong> 9:00 AM - 11:00 AM, 2:00 PM - 4:00 PM
            </div>
            <div>
              <strong>What to Expect:</strong> Campus tour, meet teachers, see facilities
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          className="pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.button
            type="submit"
            disabled={status === 'sending'}
            className="w-full btn-nature py-4 font-medium flex items-center justify-center space-x-3 relative overflow-hidden"
            whileHover={{ scale: status !== 'sending' ? 1.02 : 1 }}
            whileTap={{ scale: status !== 'sending' ? 0.98 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {status === 'sending' ? (
                <motion.div
                  key="sending"
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Scheduling Your Visit...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="submit"
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Request Campus Visit</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ripple effect */}
            {status === 'sending' && (
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-xl"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.button>
        </motion.div>

        {/* Status Messages */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              className="text-center p-4 bg-green-50 rounded-xl border border-green-200"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <div className="flex items-center justify-center space-x-3 text-green-600">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Check className="w-6 h-6" />
                </motion.div>
                <div>
                  <p className="font-medium">Visit Request Submitted!</p>
                  <p className="text-sm">We'll contact you within 24 hours to confirm your visit details.</p>
                </div>
              </div>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              className="text-center p-4 bg-red-50 rounded-xl border border-red-200"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <div className="flex items-center justify-center space-x-3 text-red-600">
                <AlertCircle className="w-6 h-6" />
                <div>
                  <p className="font-medium">Something went wrong</p>
                  <p className="text-sm">Please try again later or call us directly at +91 9451016643.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  );
} 