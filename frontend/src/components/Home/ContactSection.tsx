"use client";
import { useState } from 'react';

export default function ContactSection() {
  console.log('process.env.NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setStatus('error');
    }
  };

  return (
    <section className="py-20 relative z-20" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-brand-neutral-50">
              <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Let&apos;s Connect!
              </span>
            </h2>
            <p className="text-brand-neutral-300 text-lg mb-8">
              We&apos;d love to hear from you and answer any questions about our school.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-3xl">📍</div>
                <div>
                  <h4 className="font-semibold text-brand-neutral-100 mb-1">Visit Us</h4>
                  <p className="text-brand-neutral-400">Akshararambh Public School, Near Daitrababa Mandir</p>
                  <p className="text-brand-neutral-400">Murdaha, Varanasi</p>
                  <a href="https://www.google.com/maps/search/?api=1&query=Akshararambh+Public+School+Murdaha+Varanasi" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline mt-1 inline-block">
                    Get Directions
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">📞</div>
                <div>
                  <h4 className="font-semibold text-brand-neutral-100 mb-1">Call Us</h4>
                  <p className="text-brand-neutral-400">+91 9451016643</p>
                  <p className="text-brand-neutral-400">+91 6393566291</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">✉️</div>
                <div>
                  <h4 className="font-semibold text-brand-neutral-100 mb-1">Email Us</h4>
                  <p className="text-brand-neutral-400">devansh.prakhar@gmail.com</p>
                  <p className="text-brand-neutral-400">devansh.prakhar@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">🕐</div>
                <div>
                  <h4 className="font-semibold text-brand-neutral-100 mb-1">Office Hours</h4>
                  <p className="text-brand-neutral-400">Monday - Saturday: 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="bg-brand-neutral-800/50 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-brand-neutral-700">
            <h3 className="text-2xl font-bold text-brand-neutral-100 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-neutral-900/50 border-2 border-brand-neutral-700 rounded-xl focus:outline-none focus:border-brand-primary transition-colors text-brand-neutral-100 placeholder-brand-neutral-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-neutral-900/50 border-2 border-brand-neutral-700 rounded-xl focus:outline-none focus:border-brand-primary transition-colors text-brand-neutral-100 placeholder-brand-neutral-400"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-neutral-900/50 border-2 border-brand-neutral-700 rounded-xl focus:outline-none focus:border-brand-primary transition-colors resize-none text-brand-neutral-100 placeholder-brand-neutral-400"
              ></textarea>
              <button type="submit" disabled={status === 'sending'} className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:bg-brand-neutral-600 disabled:cursor-not-allowed">
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && <p className="text-green-400 text-center">Thank you! Your message has been sent.</p>}
              {status === 'error' && <p className="text-red-400 text-center">Something went wrong. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 