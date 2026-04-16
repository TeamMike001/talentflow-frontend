'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, X, Menu } from 'lucide-react';
import Link from 'next/link';

const API_BASE_URL = 'http://localhost:8080';

export default function Navbar() {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch real courses from database
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/courses/published`);
      if (response.ok) {
        const courses = await response.json();
        
        // Group courses by category
        const grouped = {};
        courses.forEach(course => {
          const category = course.category || 'General';
          if (!grouped[category]) {
            grouped[category] = [];
          }
          grouped[category].push(course.title);
        });
        
        // Convert to array format for display
        const categories = Object.keys(grouped).map(category => ({
          title: category.toUpperCase(),
          items: grouped[category].slice(0, 6) // Show max 6 courses per category
        }));
        
        setCourseCategories(categories);
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      // Fallback to default categories if API fails
      setCourseCategories([
        {
          title: 'POPULAR COURSES',
          items: ['Web Development', 'Mobile Development', 'Data Science', 'Cloud Computing']
        },
        {
          title: 'DESIGN',
          items: ['UI/UX Design', 'Graphic Design', '3D Animation']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-20 h-15 relative">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-20 h-15"
              />
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
                  <div className="absolute top-full left-1/4 -translate-x-1/4 mt-2 w-[930px] bg-white rounded-xl shadow-2xl border border-gray-100 z-20 p-6">
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        <p className="text-sm text-gray-500 mt-2">Loading courses...</p>
                      </div>
                    ) : courseCategories.length > 0 ? (
                      <div className="grid grid-cols-4 gap-5">
                        {courseCategories.slice(0, 4).map((cat) => (
                          <div key={cat.title}>
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                              {cat.title}
                            </h4>
                            <ul className="space-y-2">
                              {cat.items.map((item) => (
                                <li key={item}>
                                  <Link
                                    href={`/courses?search=${encodeURIComponent(item)}`}
                                    className="text-sm flex items-center gap-1.5 hover:text-primary transition-colors text-gray-600"
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
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No courses available yet</p>
                      </div>
                    )}
                    <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                      <Link
                        href="/courses"
                        className="text-sm text-primary hover:underline font-medium"
                        onClick={() => setCoursesOpen(false)}
                      >
                        View All Courses →
                      </Link>
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
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
          <Link href="/" className="block py-2 text-gray-700 font-medium hover:text-primary" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <div>
            <button
              onClick={() => setCoursesOpen(!coursesOpen)}
              className="flex items-center gap-2 w-full py-2 text-gray-700 font-medium hover:text-primary"
            >
              Courses <ChevronDown size={16} className={`transition-transform ${coursesOpen ? 'rotate-180' : ''}`} />
            </button>
            {coursesOpen && (
              <div className="pl-4 mt-1 space-y-1 max-h-60 overflow-y-auto">
                {loading ? (
                  <div className="py-4 text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : courseCategories.length > 0 ? (
                  courseCategories.map((cat) => (
                    <div key={cat.title} className="mb-3">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-1">{cat.title}</p>
                      {cat.items.map((item) => (
                        <Link
                          key={item}
                          href={`/courses?search=${encodeURIComponent(item)}`}
                          className="block py-1 text-sm text-gray-600 hover:text-primary"
                          onClick={() => {
                            setCoursesOpen(false);
                            setMobileOpen(false);
                          }}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 py-2">No courses available</p>
                )}
                <Link
                  href="/courses"
                  className="block py-2 text-sm text-primary font-medium hover:underline"
                  onClick={() => {
                    setCoursesOpen(false);
                    setMobileOpen(false);
                  }}
                >
                  View All Courses →
                </Link>
              </div>
            )}
          </div>
          <Link href="/about" className="block py-2 text-gray-700 font-medium hover:text-primary" onClick={() => setMobileOpen(false)}>
            About
          </Link>
          <Link href="/contact" className="block py-2 text-gray-700 font-medium hover:text-primary" onClick={() => setMobileOpen(false)}>
            Contact
          </Link>
          <div className="flex gap-3 pt-2">
            <Link
              href="/signin"
              className="flex-1 text-center py-2 text-sm font-semibold border-2 border-gray-300 rounded-lg hover:border-primary hover:text-primary"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="flex-1 text-center py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark"
              onClick={() => setMobileOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}