"use client";
import { useState } from 'react';
import Modal from '../Modal';
import AdmissionForm from '../AdmissionForm';
import VisitForm from '../VisitForm';

export default function CTASection() {
  const [isAdmissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [isVisitModalOpen, setVisitModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 relative z-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
              Join Our Wonderful School Family!
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto relative z-10 opacity-90">
              Give your child the gift of joyful learning in a nurturing environment
            </p>
            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              <button 
                onClick={() => setAdmissionModalOpen(true)}
                className="bg-white text-brand-primary px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Apply for Admission
              </button>
              <button 
                onClick={() => setVisitModalOpen(true)}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-brand-primary transition-all duration-300">
                Schedule a Visit
              </button>
            </div>
          </div>
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