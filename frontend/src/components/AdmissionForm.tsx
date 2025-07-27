"use client";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, GraduationCap, Calendar, MessageCircle, Send, Check, AlertCircle } from 'lucide-react';

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    studentName: '',
    studentAge: '',
    grade: '',
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

  // Form field configurations with icons and animations
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
      name: 'studentName',
      type: 'text',
      placeholder: "Student's Name",
      icon: GraduationCap,
      required: true,
      label: 'Student Name'
    },
    {
      name: 'studentAge',
      type: 'number',
      placeholder: "Student's Age",
      icon: Calendar,
      required: true,
      label: 'Age'
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('/api/send-admission-email', {
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
            studentName: '',
            studentAge: '',
            grade: '',
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
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-10"
            style={{
              left: `${20 + i * 25}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          >
            {['🌸', '🍃', '🌿', '🦋'][i]}
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
          <h3 className="heading-card text-nature-primary font-japanese mb-2">
            Begin Your Child's Journey
          </h3>
          <p className="caption-text text-nature-secondary">
            Every great story starts with a single step. Let's take that step together.
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

          {/* Grade Selection */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <label className="block caption-text font-medium text-nature-primary mb-2">
              Grade <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <motion.div
                className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
                animate={{
                  scale: focusedField === 'grade' ? 1.1 : 1,
                  color: focusedField === 'grade' ? '#4A7C59' : '#9CAF88'
                }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                <GraduationCap className="w-5 h-5" />
              </motion.div>

              <motion.select
                name="grade"
                required
                value={formData.grade}
                onChange={handleChange}
                onFocus={() => handleFocus('grade')}
                onBlur={handleBlur}
                className="w-full pl-12 pr-4 py-3 bg-nature-secondary border-2 rounded-xl focus:outline-none transition-all duration-300 body-text"
                style={{
                  borderColor: focusedField === 'grade' ? '#4A7C59' : '#E8E8E8',
                  color: '#8B7355'
                }}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <option value="">Select Grade</option>
                <option value="Nursery">Nursery</option>
                <option value="LKG">LKG</option>
                <option value="UKG">UKG</option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map(g => 
                  <option key={g} value={`Grade ${g}`}>Grade {g}</option>
                )}
              </motion.select>
            </div>
          </motion.div>
        </div>

        {/* Message Field */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <label className="block caption-text font-medium text-nature-primary mb-2">
            Additional Message (Optional)
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
              placeholder="Tell us about your child's interests, special needs, or any questions you have..."
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

        {/* Submit Button */}
        <motion.div
          className="pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
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
                  <span>Planting Your Application...</span>
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
                  <Send className="w-5 h-5" />
                  <span>Submit Application</span>
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
                  <p className="font-medium">Application Submitted Successfully!</p>
                  <p className="text-sm">We'll contact you within 24 hours to discuss the next steps.</p>
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
                  <p className="text-sm">Please try again later or contact us directly.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  );
} 