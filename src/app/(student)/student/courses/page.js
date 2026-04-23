// src/app/(student)/student/courses/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { courseService } from '@/services/courseService';
import { enrollmentService } from '@/services/enrollmentService';
import { bookmarkService } from '@/services/bookmarkService';
import { Bookmark, BookmarkCheck, Search, Filter, X, Star, Users, ChevronDown, ChevronUp, Clock, Award } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export default function BrowseCourses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [enrolledStatus, setEnrolledStatus] = useState({});
  const [bookmarkedStatus, setBookmarkedStatus] = useState({});
  const [studentCounts, setStudentCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [bookmarkLoading, setBookmarkLoading] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState('');
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [categories, setCategories] = useState([]);
  const [levels] = useState(['all', 'Beginner', 'Intermediate', 'Advanced', 'All Levels']);
  
  // Selected course for modal
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    fetchCourses();
  }, [router]);

  useEffect(() => {
    filterAndSortCourses();
  }, [searchQuery, courses, selectedCategory, selectedLevel, sortBy]);

  // Function to fetch student count for a course
  const fetchStudentCount = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/enrollments/course/${courseId}/count`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const count = await response.json();
        setStudentCounts(prev => ({ ...prev, [courseId]: count }));
        return count;
      }
    } catch (err) {
      console.error(`Failed to fetch student count for course ${courseId}:`, err);
    }
    return 0;
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${API_BASE_URL}/api/courses/published`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      
      setCourses(data || []);
      setFilteredCourses(data || []);
      
      // Extract unique categories
      const uniqueCategories = ['all', ...new Set(data.map(c => c.category).filter(Boolean))];
      setCategories(uniqueCategories);
      
      // Fetch enrollment, bookmark status, and student counts for each course
      const enrollStatusMap = {};
      const bookmarkStatusMap = {};
      const countsMap = {};
      
      for (const course of (data || [])) {
        try {
          const [isEnrolled, isBookmarked, studentCount] = await Promise.all([
            enrollmentService.checkEnrollment(course.id).catch(() => false),
            bookmarkService.isBookmarked(course.id).catch(() => false),
            fetchStudentCount(course.id).catch(() => 0)
          ]);
          enrollStatusMap[course.id] = isEnrolled;
          bookmarkStatusMap[course.id] = isBookmarked;
          countsMap[course.id] = studentCount;
        } catch (err) {
          console.warn(`Failed to get status for course ${course.id}:`, err);
          enrollStatusMap[course.id] = false;
          bookmarkStatusMap[course.id] = false;
          countsMap[course.id] = 0;
        }
      }
      setEnrolledStatus(enrollStatusMap);
      setBookmarkedStatus(bookmarkStatusMap);
      setStudentCounts(countsMap);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      setError(err.message || 'Failed to load courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortCourses = () => {
    let filtered = [...courses];
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(course => 
        course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => 
        course.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Level filter
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => 
        course.level?.toLowerCase() === selectedLevel.toLowerCase()
      );
    }
    
    // Sort
    switch(sortBy) {
      case 'rating':
        filtered.sort((a, b) => (b.averageRating || b.rating || 0) - (a.averageRating || a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'students':
        filtered.sort((a, b) => (studentCounts[b.id] || 0) - (studentCounts[a.id] || 0));
        break;
      default:
        filtered.sort((a, b) => (studentCounts[b.id] || 0) - (studentCounts[a.id] || 0));
    }
    
    setFilteredCourses(filtered);
  };

  const handleViewCourse = (courseId) => {
    router.push(`/student/courses/${courseId}`);
  };

  const handleEnroll = async (courseId, e) => {
    e.stopPropagation();
    setActionLoading(prev => ({ ...prev, [courseId]: 'enrolling' }));
    try {
      await enrollmentService.enroll(courseId);
      setEnrolledStatus(prev => ({ ...prev, [courseId]: true }));
      
      // Update student count immediately after enrollment
      const newCount = await fetchStudentCount(courseId);
      setStudentCounts(prev => ({ ...prev, [courseId]: newCount }));
      
      alert('Successfully enrolled in the course!');
    } catch (err) {
      alert(err.message || 'Failed to enroll');
    } finally {
      setActionLoading(prev => ({ ...prev, [courseId]: false }));
    }
  };

  const handleUnenroll = async (courseId, e) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to unenroll from this course? Your progress will be lost.')) {
      return;
    }
    setActionLoading(prev => ({ ...prev, [courseId]: 'unenrolling' }));
    try {
      await enrollmentService.unenroll(courseId);
      setEnrolledStatus(prev => ({ ...prev, [courseId]: false }));
      
      // Update student count immediately after unenrollment
      const newCount = await fetchStudentCount(courseId);
      setStudentCounts(prev => ({ ...prev, [courseId]: newCount }));
      
      alert('Successfully unenrolled from the course.');
    } catch (err) {
      alert(err.message || 'Failed to unenroll');
    } finally {
      setActionLoading(prev => ({ ...prev, [courseId]: false }));
    }
  };

  const handleAddBookmark = async (courseId, e) => {
    e.stopPropagation();
    setBookmarkLoading(prev => ({ ...prev, [courseId]: true }));
    try {
      await bookmarkService.addBookmark(courseId);
      setBookmarkedStatus(prev => ({ ...prev, [courseId]: true }));
      alert('Course added to bookmarks!');
    } catch (err) {
      console.error('Add bookmark error:', err);
      alert(err.message || 'Failed to add bookmark');
    } finally {
      setBookmarkLoading(prev => ({ ...prev, [courseId]: false }));
    }
  };

  const handleRemoveBookmark = async (courseId, e) => {
    e.stopPropagation();
    setBookmarkLoading(prev => ({ ...prev, [courseId]: true }));
    try {
      await bookmarkService.removeBookmark(courseId);
      setBookmarkedStatus(prev => ({ ...prev, [courseId]: false }));
      alert('Bookmark removed!');
    } catch (err) {
      console.error('Remove bookmark error:', err);
      alert(err.message || 'Failed to remove bookmark');
    } finally {
      setBookmarkLoading(prev => ({ ...prev, [courseId]: false }));
    }
  };

  const openCourseModal = (course) => {
    setSelectedCourse(course);
    setShowCourseModal(true);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSortBy('trending');
  };

  const sortOptions = [
    { value: 'trending', label: 'Trending' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'students', label: 'Most Popular' }
  ];

  const activeFilterCount = (selectedCategory !== 'all' ? 1 : 0) + 
                           (selectedLevel !== 'all' ? 1 : 0) + 
                           (searchQuery ? 1 : 0) +
                           (sortBy !== 'trending' ? 1 : 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading available courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Browse All Courses</h1>
              <p className="text-gray-500 mt-1">Discover and enroll in courses to enhance your skills</p>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for courses by title, description, or category..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-blue-500 transition-colors bg-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-colors bg-white ${
                  showFilters ? 'border-blue-500 text-blue-500' : 'border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-500'
                }`}
              >
                <Filter size={16} />
                Filter
                {activeFilterCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">{activeFilterCount}</span>
                )}
              </button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-blue-500 outline-none"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat === 'all' ? 'All Categories' : cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Level Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-blue-500 outline-none"
                    >
                      {levels.map(level => (
                        <option key={level} value={level}>
                          {level === 'all' ? 'All Levels' : level}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-blue-500 outline-none"
                    >
                      {sortOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Clear Filters Button */}
                {activeFilterCount > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Results Count */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500">
                {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-2xl mb-6">
                {error}
              </div>
            )}

            {/* Courses Grid */}
            {filteredCourses.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => {
                  const isEnrolled = enrolledStatus[course.id];
                  const isBookmarked = bookmarkedStatus[course.id];
                  const isLoading = actionLoading[course.id];
                  const isBookmarkLoading = bookmarkLoading[course.id];
                  const rating = course.averageRating || course.rating || 4.5;
                  const studentCount = studentCounts[course.id] || 0;
                  
                  return (
                    <div 
                      key={course.id} 
                      onClick={() => handleViewCourse(course.id)}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <div className="relative">
                        <img 
                          src={course.thumbnailUrl || course.thumbnail || 'https://via.placeholder.com/600x400?text=Course+Image'} 
                          alt={course.title} 
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/600x400?text=Course+Image';
                          }}
                        />
                        <button
                          onClick={(e) => isBookmarked 
                            ? handleRemoveBookmark(course.id, e) 
                            : handleAddBookmark(course.id, e)
                          }
                          disabled={isBookmarkLoading}
                          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
                        >
                          {isBookmarkLoading ? (
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                          ) : isBookmarked ? (
                            <BookmarkCheck size={18} className="text-blue-600 fill-blue-600" />
                          ) : (
                            <Bookmark size={18} className="text-gray-500" />
                          )}
                        </button>
                        {course.bestseller && (
                          <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                            Bestseller
                          </span>
                        )}
                      </div>
                      
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                            {course.category || 'COURSE'}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
                            <span className="text-xs text-gray-400">({course.reviewCount || 0})</span>
                          </div>
                        </div>
                        
                        <h2 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {course.title}
                        </h2>
                        
                        <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                          {course.description}
                        </p>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <Users size={14} className="text-gray-400" />
                          <span className="text-xs text-gray-500 font-semibold">
                            {studentCount} student{studentCount !== 1 ? 's' : ''}
                          </span>
                          {course.duration && (
                            <>
                              <span className="text-gray-300">•</span>
                              <Clock size={14} className="text-gray-400" />
                              <span className="text-xs text-gray-500">{course.duration} hrs</span>
                            </>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          {isEnrolled ? (
                            <button
                              onClick={(e) => handleUnenroll(course.id, e)}
                              disabled={isLoading === 'unenrolling'}
                              className="bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-red-700 disabled:bg-gray-400 transition-colors"
                            >
                              {isLoading === 'unenrolling' ? '...' : 'Unenroll'}
                            </button>
                          ) : (
                            <button
                              onClick={(e) => handleEnroll(course.id, e)}
                              disabled={isLoading === 'enrolling'}
                              className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                            >
                              {isLoading === 'enrolling' ? '...' : 'Enroll Now'}
                            </button>
                          )}
                          <button
                            onClick={() => openCourseModal(course)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Quick View
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Course Details Modal */}
      {showCourseModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCourseModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-600">
              <img
                src={selectedCourse.thumbnailUrl || 'https://via.placeholder.com/800x300?text=Course'}
                alt={selectedCourse.title}
                className="w-full h-full object-cover opacity-50"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/800x300?text=Course'; }}
              />
              <button
                onClick={() => setShowCourseModal(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-blue-600 uppercase">{selectedCourse.category || 'COURSE'}</span>
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{(selectedCourse.averageRating || 4.5).toFixed(1)}</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedCourse.title}</h2>
              <p className="text-gray-600 mb-6">{selectedCourse.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Users size={20} className="mx-auto mb-1 text-blue-500" />
                  <p className="text-lg font-bold">{studentCounts[selectedCourse.id] || 0}</p>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Clock size={20} className="mx-auto mb-1 text-blue-500" />
                  <p className="text-lg font-bold">{selectedCourse.duration || 'Self'}</p>
                  <p className="text-xs text-gray-500">Duration</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Award size={20} className="mx-auto mb-1 text-blue-500" />
                  <p className="text-lg font-bold">{selectedCourse.level || 'All'}</p>
                  <p className="text-xs text-gray-500">Level</p>
                </div>
              </div>
              
              {selectedCourse.teaches && selectedCourse.teaches.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">What You'll Learn</h3>
                  <ul className="space-y-1">
                    {selectedCourse.teaches.slice(0, 5).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedCourse.requirements && selectedCourse.requirements.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                  <ul className="space-y-1">
                    {selectedCourse.requirements.slice(0, 5).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <button
                onClick={() => {
                  setShowCourseModal(false);
                  handleViewCourse(selectedCourse.id);
                }}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
              >
                View Full Course Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}