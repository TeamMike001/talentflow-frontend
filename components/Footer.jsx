'use client';

import { useState } from 'react';
import Link from 'next/link';

const topLinks = {
  Product: ['Overview', 'Features', 'Solutions', 'Tutorials', 'Pricing'],
  Company: ['About us', 'Features', 'News'],
  Social: ['Twitter', 'LinkedIn', 'GitHub', 'Clickup'],
};

const legalLinks = ['Terms', 'Privacy', 'Cookies', 'Contact'];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="bg-gray-900 text-gray-400 w-full">
      <div className="px-5 py-8">

        {/* Logo and Tagline */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <img src="/images/logo.png" alt="Logo" className="w-8 h-8" />
          </div>
          <p className="text-sm leading-relaxed">
            Top learning experiences that create more talent in the world.
          </p>
        </div>

        {/* Newsletter */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg"
          >
            Submit
          </button>
        </form>

        {/* Top Links */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {Object.entries(topLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-bold text-sm mb-3">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-400 text-xs hover:text-white">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="flex items-start justify-between mb-6">
          {/* Legal */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 text-xs hover:text-white">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5 mt-1">
            <Link href="#" className="text-gray-400 hover:text-white">
              {/* Twitter */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Link>

            <Link href="#" className="text-gray-400 hover:text-white">
              {/* LinkedIn */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
              </svg>
            </Link>

            <Link href="#" className="text-gray-400 hover:text-white">
              {/* Facebook */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-5 flex justify-center">
          <p className="text-gray-60 text-xs text-center bg-slate-500 p-2">
            © 2026 Team Mike – UI/UX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}