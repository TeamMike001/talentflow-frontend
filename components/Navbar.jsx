'use client';

import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses', hasDropdown: true },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="px-5 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Logo" className="w-8 h-8" />
            <span className="text-lg font-extrabold">
              {/* <span className="text-gray-900">Talent</span>
              <span className="text-[#F59E0B]">Flow</span> */}
            </span>
          </Link>

          {/* Hamburger */}
          <button
            className="p-1 text-gray-700"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Right Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[220px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header — Logo */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <img src="/images/logo.png" alt="Logo" className="w-8 h-8" />
            <span className="text-sm font-extrabold">
              {/* <span className="text-gray-900">Talent</span>
              <span className="text-[#F59E0B]">Flow</span> */}
            </span>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="py-2">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.hasDropdown ? (
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-gray-800 text-base font-medium border-b border-gray-50 hover:bg-gray-50"
                  onClick={() => setCoursesOpen(!coursesOpen)}
                >
                  <span>{item.name}</span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-500 transition-transform duration-200 ${coursesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center px-5 py-4 text-gray-800 text-base font-medium border-b border-gray-50 hover:bg-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}

              {/* Courses Dropdown */}
              {item.hasDropdown && coursesOpen && (
                <div className="bg-gray-50 px-5 py-2 border-b border-gray-100">
                  {['All Courses', 'Web Development', 'Design', 'Business'].map((sub) => (
                    <Link
                      key={sub}
                      href="/courses"
                      className="block py-2 text-sm text-gray-600 hover:text-gray-900"
                      onClick={() => setMenuOpen(false)}
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Sign In / Sign Up Buttons */}
        <div className="absolute bottom-10 left-0 right-0 px-5 flex flex-col gap-3">
          <Link
            href="/signin"
            className="w-full text-center py-2.5 border border-gray-800 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50"
            onClick={() => setMenuOpen(false)}
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="w-full text-center py-2.5 bg-[#1E3A8A] rounded-lg text-sm font-semibold text-white hover:bg-blue-900"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}