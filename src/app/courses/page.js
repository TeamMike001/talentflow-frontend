// src/app/courses/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/landing_page/Navbar';
import Footer from '@/landing_page/Footer';
import { Search, Star, Users, BookOpen, Clock, ChevronRight } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080';

export default function PublicCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [searchQuery, selectedCategory, courses]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${API_BASE_URL}/api/courses/published`);
      
      if (response.ok) {
        const data = await response.json();
        setCourses(data || []);
        setFilteredCourses(data || []);
        
        // Extract unique categories
        const uniqueCategories = ['all', ...new Set((data || []).map(c => c.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } else {
        setError('Unable to load courses. Please try again later.');
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = [...courses];
    
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course =>
        course.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setFilteredCourses(filtered);
  };

  const viewCourseDetails = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading courses...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Our Courses
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover high-quality courses taught by industry experts. 
              Start your learning journey today!
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-center">
              {error}
            </div>
          )}

          {/* Search and Filter Section */}
          <div className="bg-white rounded-xl shadow-sm border p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search courses by title, description, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="w-full md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{filteredCourses.length}</span> courses found
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-primary hover:underline"
              >
                Clear search
              </button>
            )}
          </div>

          {/* Courses Grid */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border">
              <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id} 
                  className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => viewCourseDetails(course)}
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop'}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop';
                      }}
                    />
                    {course.bestseller && (
                      <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Bestseller
                      </span>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {course.category || 'COURSE'}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700">
                          {course.averageRating ? course.averageRating.toFixed(1) : '4.5'}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({course.reviewCount || 0})
                        </span>
                      </div>
                    </div>
                    
                    <h2 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h2>
                    
                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {(course.enrolledCount || course.studentsCount || 0).toLocaleString()} students
                        </span>
                      </div>
                      <button 
                        className="flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          viewCourseDetails(course);
                        }}
                      >
                        View Details <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Course Details Modal - View Only */}
      {showModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={closeModal}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="relative h-56 bg-gradient-to-r from-primary to-indigo-600">
              <img
                src={selectedCourse.thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop'}
                alt={selectedCourse.title}
                className="w-full h-full object-cover opacity-50"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop';
                }}
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {selectedCourse.category || 'COURSE'}
                </span>
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">
                    {selectedCourse.averageRating ? selectedCourse.averageRating.toFixed(1) : '4.5'}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedCourse.title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{selectedCourse.description}</p>

              {/* Course Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Users size={20} className="mx-auto mb-1 text-primary" />
                  <p className="text-lg font-bold text-gray-900">
                    {(selectedCourse.enrolledCount || selectedCourse.studentsCount || 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Clock size={20} className="mx-auto mb-1 text-primary" />
                  <p className="text-lg font-bold text-gray-900">{selectedCourse.duration || 'Self-paced'}</p>
                  <p className="text-xs text-gray-500">Duration</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <BookOpen size={20} className="mx-auto mb-1 text-primary" />
                  <p className="text-lg font-bold text-gray-900">{selectedCourse.level || 'All Levels'}</p>
                  <p className="text-xs text-gray-500">Level</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Star size={20} className="mx-auto mb-1 text-primary" />
                  <p className="text-lg font-bold text-gray-900">{selectedCourse.averageRating ? selectedCourse.averageRating.toFixed(1) : '4.5'}</p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
              </div>

              {/* What You'll Learn */}
              {selectedCourse.teaches && selectedCourse.teaches.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-3">What You'll Learn</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedCourse.teaches.slice(0, 6).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {selectedCourse.requirements && selectedCourse.requirements.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-3">Requirements</h3>
                  <ul className="space-y-1">
                    {selectedCourse.requirements.slice(0, 4).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Instructor Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {selectedCourse.instructor?.name?.charAt(0) || 'I'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedCourse.instructor?.name || 'Expert Instructor'}</p>
                    <p className="text-sm text-gray-500">{selectedCourse.instructor?.title || 'Course Instructor'}</p>
                  </div>
                </div>
              </div>

              {/* Call to Action - Sign up to enroll */}
              <div className="bg-gradient-to-r from-primary/10 to-indigo-50 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to start learning?</h3>
                <p className="text-gray-600 mb-4">Sign up or log in to enroll in this course</p>
                <div className="flex gap-3 justify-center">
                  <Link
                    href="/signup"
                    className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/signin"
                    className="px-6 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}