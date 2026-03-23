'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
      <main className="min-h-screen bg-white pb-16">

        {/* Gradient blue hero background */}
        <div
          className="w-full px-5 pt-5 pb-5"
          style={{
            background: 'linear-gradient(180deg, #BFDBFE 0%, #EFF6FF 55%, #ffffff 100%)',
          }}
        >
          {/* CONTACT US heading */}
          <h1 className="text-2xl font-extrabold text-primary text-center tracking-widest uppercase mt-10 mb-10">
            Contact Us
          </h1>

          {/* White Card */}
          <div className="bg-white rounded-2xl shadow-md px-5 py-8 mx-auto max-w-md">

            {sent && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg px-3 py-2 text-xs font-medium">
                ✅ Message sent! We'll reply soon.
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-blue-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Email Address!"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border border-blue-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <textarea
                placeholder="Your Message"
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 border border-blue-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
              />
              <button
                type="submit"
                className="w-full py-3.5 bg-[#2563EB] text-white font-semibold rounded-lg text-sm"
              >
                Send
              </button>
            </form>

            {/* Contact Info — centered */}
            <div className="border-t border-gray-100 pt-5 text-center space-y-1 text-sm text-gray-600">
              <p className="font-bold text-gray-900">TalentFlow</p>
              <p>1234 Maplewood Drive Springfield, IL</p>
              <p>62704, United State</p>
              <p>+1 (555) 123-4567</p>
              <p>hello@talentflow.com</p>
            </div>

            {/* Map */}
            <div className="mt-7 h-40 rounded-xl overflow-hidden border border-gray-200">
              <iframe
                title="TalentFlow Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.0!2d-89.6501!3d39.7817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88720b09e8c9d747%3A0x77cb7ade3c1af73e!2sSpringfield%2C%20IL!5e0!3m2!1sen!2sus!4v1710000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}