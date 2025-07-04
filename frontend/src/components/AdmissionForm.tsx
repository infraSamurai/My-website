"use client";
import { useState } from 'react';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="text" name="parentName" placeholder="Parent's Name" required value={formData.parentName} onChange={handleChange} className="w-full p-3 bg-brand-neutral-700 rounded-lg border border-brand-neutral-600 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
        <input type="email" name="parentEmail" placeholder="Parent's Email" required value={formData.parentEmail} onChange={handleChange} className="w-full p-3 bg-brand-neutral-700 rounded-lg border border-brand-neutral-600 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
        <input type="tel" name="parentPhone" placeholder="Parent's Phone" required value={formData.parentPhone} onChange={handleChange} className="w-full p-3 bg-brand-neutral-700 rounded-lg border border-brand-neutral-600 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
        <input type="text" name="studentName" placeholder="Student's Name" required value={formData.studentName} onChange={handleChange} className="w-full p-3 bg-brand-neutral-700 rounded-lg border border-brand-neutral-600 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
        <input type="number" name="studentAge" placeholder="Student's Age" required value={formData.studentAge} onChange={handleChange} className="w-full p-3 bg-brand-neutral-700 rounded-lg border border-brand-neutral-600 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
        <select name="grade" required value={formData.grade} onChange={handleChange} className="w-full p-3 bg-brand-neutral-700 rounded-lg border border-brand-neutral-600 focus:ring-2 focus:ring-brand-primary focus:outline-none">
          <option value="">Select Grade</option>
          <option value="Nursery">Nursery</option>
          <option value="LKG">LKG</option>
          <option value="UKG">UKG</option>
          {Array.from({ length: 10 }, (_, i) => i + 1).map(g => <option key={g} value={`Grade ${g}`}>Grade {g}</option>)}
        </select>
      </div>
      <textarea name="message" placeholder="Your Message (Optional)" value={formData.message} onChange={handleChange} className="w-full p-3 bg-brand-neutral-700 rounded-lg border border-brand-neutral-600 focus:ring-2 focus:ring-brand-primary focus:outline-none" rows={4}></textarea>
      
      <div>
        <button type="submit" disabled={status === 'sending'} className="w-full bg-brand-primary text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:bg-brand-neutral-600 disabled:cursor-not-allowed">
          {status === 'sending' ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
      
      {status === 'success' && <p className="text-green-400 text-center">Thank you! Your application has been submitted successfully.</p>}
      {status === 'error' && <p className="text-red-400 text-center">Something went wrong. Please try again later.</p>}
    </form>
  );
} 