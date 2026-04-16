// src/app/contact/page.js
'use client';

import { useState } from 'react';
import Navbar from '@/landing_page/Navbar';
import Footer from '@/landing_page/Footer';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate API call - replace with actual API endpoint
    try {
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) });
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">

        {/* Background Decorations */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Dot pattern – top right */}
        <div className="absolute top-6 right-6 grid grid-cols-8 gap-2 opacity-30 pointer-events-none">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          ))}
        </div>

        {/* Blue geometric squares – bottom left */}
        <div className="absolute bottom-24 left-0 pointer-events-none">
          <div className="relative w-28 h-28">
            <div className="absolute inset-0 border-4 border-primary rounded-sm opacity-60" />
            <div className="absolute inset-3 border-4 border-primary rounded-sm opacity-40" />
            <div className="absolute inset-6 border-4 border-primary rounded-sm opacity-20" />
          </div>
        </div>

        {/* Orange geometric squares – bottom right */}
        <div className="absolute bottom-24 right-0 pointer-events-none">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 border-4 border-orange-400 rounded-sm opacity-60" />
            <div className="absolute inset-4 border-4 border-orange-400 rounded-sm opacity-40" />
            <div className="absolute inset-8 border-4 border-orange-400 rounded-sm opacity-20" />
          </div>
        </div>

        {/* Main contact card */}
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-16 px-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-5xl p-8 lg:p-10 border border-gray-100">

            {/* Title */}
            <div className="text-center mb-10">
              <h1 className="text-primary font-bold text-2xl tracking-wider mb-2 uppercase">
                Get In Touch
              </h1>
              <p className="text-gray-500 text-sm">
                Have questions? We'd love to hear from you.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              {/* Left – Form */}
              <div>
                {sent && (
                  <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2">
                    <CheckCircle size={16} />
                    Message sent successfully! We'll reply soon.
                  </div>
                )}
                
                {error && (
                  <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-medium">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <textarea
                      placeholder="How can we help you?"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right – Contact Info */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-800 text-lg mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">Address</p>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          1234 Maplewood Drive<br />
                          Springfield, IL 62704<br />
                          United States
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">Phone</p>
                        <p className="text-gray-500 text-sm">+1 (555) 123-4567</p>
                        <p className="text-gray-400 text-xs mt-1">Mon-Fri, 9 AM - 6 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">Email</p>
                        <p className="text-gray-500 text-sm">hello@talentflow.com</p>
                        <p className="text-gray-400 text-xs mt-1">We reply within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map embed */}
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-48">
                  <iframe
                    title="TalentFlow Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.0!2d-89.6501!3d39.7817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88720b09e8c9d747%3A0x77cb7ade3c1af73e!2sSpringfield%2C%20IL!5e0!3m2!1sen!2sus!4v1710000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Social Links */}
                <div className="flex gap-4 justify-center pt-4">
                  <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.04.7.13 1.04-3.78-.2-7.14-2-9.38-4.76-.4.68-.63 1.47-.63 2.3 0 1.58.8 2.97 2.02 3.78-.74-.02-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.45-.38.1-.78.16-1.2.16-.3 0-.58-.03-.87-.08.58 1.82 2.27 3.15 4.28 3.18-1.57 1.23-3.55 1.96-5.7 1.96-.37 0-.74-.02-1.1-.06 2.05 1.3 4.48 2.07 7.1 2.07 8.52 0 13.17-7.05 13.17-13.16 0-.2 0-.4-.02-.6.9-.65 1.68-1.46 2.3-2.38z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-10 4.5-10 10 0 4.4 2.9 8.2 6.9 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1.9 1.6 2.5 1.1 3.1.9.1-.7.4-1.1.7-1.4-2.4-.3-4.9-1.2-4.9-5.4 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 2.9 1.1.9-.2 1.8-.4 2.7-.4s1.8.2 2.7.4c2-1.4 2.9-1.1 2.9-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.2-2.5 5.1-4.9 5.4.4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5 4-1.3 6.9-5.1 6.9-9.5 0-5.5-4.5-10-10-10z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}