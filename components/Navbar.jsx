'use client';

import { useState } from 'react';
import { ChevronDown, X, Menu } from 'lucide-react';
import Link from 'next/link';

const courseCategories = [
  {
    title: 'UI/UX & PRODUCT DESIGN',
    items: [
      'UI/UX Design Fundamental',
      'Advanced UI Design (Figma)',
      'UX Research & Strategy',
      'Product Design (End-to-End)',
      'Design System & Prototyping',
    ],
  },
  {
    title: 'FRONTEND DEVELOPMENT',
    items: [
      'HTML & CSS Basics',
      'JavaScript Essentials',
      'React.js for Beginners',
      'Advanced Frontend Dev.',
    ],
  },
  {
    title: 'BACKEND DEVELOPMENT',
    items: [
      'Backend Development Basics',
      'Node.js & Express',
      'API Design & Integration',
      'Database Management',
    ],
  },
  {
    title: 'DATA & ANALYSIS',
    items: [
      'Data Analysis Fundamental',
      'Excel for Data Analysis',
      'SQL Basics',
      'Data Visualization',
    ],
  },
];

export default function Navbar() {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 relative">
              {/* Graduation cap SVG logo */}
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19" stroke="#2563EB" strokeWidth="2" fill="white"/>
                <path d="M20 10L32 16L20 22L8 16L20 10Z" fill="#2563EB"/>
                <path d="M12 18.5V25C12 25 15 28 20 28C25 28 28 25 28 25V18.5" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="32" y1="16" x2="32" y2="24" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="32" cy="25" r="2" fill="#F59E0B"/>
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-800 font-extrabold">
                <span className="text-gray-900">Talent</span>
                <span className="text-[#F59E0B]">Flow</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-gray-700 font-medium hover:text-primary transition-colors text-sm">
              Home
            </Link>

            {/* Courses Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCoursesOpen(!coursesOpen)}
                className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-md transition-all ${
                  coursesOpen
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                Courses
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${coursesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Mega Dropdown */}
              {coursesOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setCoursesOpen(false)}
                  />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[780px] bg-white rounded-xl shadow-2xl border border-gray-100 z-20 p-6">
                    <div className="grid grid-cols-4 gap-6">
                      {courseCategories.map((cat) => (
                        <div key={cat.title}>
                          <h4 className="text-xs font-700 font-bold text-gray-500 uppercase tracking-wider mb-3">
                            {cat.title}
                          </h4>
                          <ul className="space-y-2">
                            {cat.items.map((item) => (
                              <li key={item}>
                                <Link
                                  href="/courses"
                                  className={`text-sm flex items-center gap-1.5 hover:text-primary transition-colors ${
                                    item === 'Advanced UI Design (Figma)'
                                      ? 'text-primary font-medium'
                                      : 'text-gray-600'
                                  }`}
                                  onClick={() => setCoursesOpen(false)}
                                >
                                  <span className="w-1 h-1 rounded-full bg-current opacity-60 flex-shrink-0" />
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <Link href="/about" className="text-gray-700 font-medium hover:text-primary transition-colors text-sm">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 font-medium hover:text-primary transition-colors text-sm">
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/signin"
              className="px-5 py-2 text-sm font-semibold text-gray-800 border-2 border-gray-300 rounded-lg hover:border-primary hover:text-primary transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-all shadow-sm"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <Link href="/" className="block py-2 text-gray-700 font-medium hover:text-primary">Home</Link>
          <div>
            <button
              onClick={() => setCoursesOpen(!coursesOpen)}
              className="flex items-center gap-2 w-full py-2 text-gray-700 font-medium hover:text-primary"
            >
              Courses <ChevronDown size={16} className={`transition-transform ${coursesOpen ? 'rotate-180' : ''}`} />
            </button>
            {coursesOpen && (
              <div className="pl-4 mt-1 space-y-1">
                {courseCategories.map((cat) => (
                  <div key={cat.title} className="mb-3">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">{cat.title}</p>
                    {cat.items.map((item) => (
                      <Link key={item} href="/courses" className="block py-1 text-sm text-gray-600 hover:text-primary">
                        {item}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link href="/about" className="block py-2 text-gray-700 font-medium hover:text-primary">About</Link>
          <Link href="/contact" className="block py-2 text-gray-700 font-medium hover:text-primary">Contact</Link>
          <div className="flex gap-3 pt-2">
            <Link href="/signin" className="flex-1 text-center py-2 text-sm font-semibold border-2 border-gray-300 rounded-lg hover:border-primary hover:text-primary">
              Sign In
            </Link>
            <Link href="/signup" className="flex-1 text-center py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
