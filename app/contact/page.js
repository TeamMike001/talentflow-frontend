'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 relative overflow-hidden">

        {/* Dot pattern – top right */}
        <div className="absolute top-6 right-6 grid grid-cols-8 gap-2 opacity-40 pointer-events-none">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          ))}
        </div>

        {/* Blue geometric squares – bottom left */}
        <div className="absolute bottom-24 left-0 pointer-events-none">
          <div className="relative w-28 h-28">
            <div className="absolute inset-0 border-4 border-primary rounded-sm opacity-70" />
            <div className="absolute inset-3 border-4 border-primary rounded-sm opacity-50" />
            <div className="absolute inset-6 border-4 border-primary rounded-sm opacity-30" />
          </div>
        </div>

        {/* Orange geometric squares – bottom right */}
        <div className="absolute bottom-24 right-0 pointer-events-none">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 border-4 border-[#F59E0B] rounded-sm opacity-80" />
            <div className="absolute inset-4 border-4 border-[#F59E0B] rounded-sm opacity-60" />
            <div className="absolute inset-8 border-4 border-[#F59E0B] rounded-sm opacity-40" />
          </div>
        </div>

        {/* Main contact card */}
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-16 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-8 lg:p-10">

            {/* Title */}
            <h1 className="text-primary font-extrabold text-xl tracking-widest text-center mb-8 uppercase">
              Contact Us
            </h1>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left – Form */}
              <div>
                {sent && (
                  <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm font-medium">
                    ✅ Message sent! We&apos;ll reply soon.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                  <textarea
                    placeholder="Your Message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all text-sm"
                  >
                    Send
                  </button>
                </form>
              </div>

              {/* Right – Address + Map */}
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-gray-900 text-base mb-1">TalentFlow</p>
                  <p className="font-bold text-gray-500 text-sm leading-relaxed">
                    1234 Maplewood Drive Springfield, IL 62704, United State
                  </p>
                  <p className="font-bold text-gray-700 text-sm mt-2">+1 (555) 123-4567</p>
                  <p className="font-bold text-gray-700 text-sm">hello@talentflow.com</p>
                </div>

                {/* Map embed placeholder — same style as Figma */}
                <div className="w-full h-40 rounded-xl overflow-hidden border border-gray-200">
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
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}