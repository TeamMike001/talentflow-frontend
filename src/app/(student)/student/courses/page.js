// src/app/(student)/student/courses/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { courseService } from '@/services/courseService';
import { enrollmentService } from '@/services/enrollmentService';
import { bookmarkService } from '@/services/bookmarkService';
import { Bookmark, BookmarkCheck, Search, Filter, X, Star, Users } from 'lucide-react';

export default function BrowseCourses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [enrolledStatus, setEnrolledStatus] = useState({});
  const [bookmarkedStatus, setBookmarkedStatus] = useState({});
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

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = await courseService.getPublishedCourses();
      setCourses(data || []);
      setFilteredCourses(data || []);
      
      // Extract unique categories
      const uniqueCategories = ['all', ...new Set(data.map(c => c.category).filter(Boolean))];
      setCategories(uniqueCategories);
      
      await fetchEnrollmentAndBookmarkStatus(data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      setError(err.message || 'Failed to load courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollmentAndBookmarkStatus = async (coursesList) => {
    const enrollStatusMap = {};
    const bookmarkStatusMap = {};
    
    for (const course of (coursesList || [])) {
      try {
        const [isEnrolled, isBookmarked] = await Promise.all([
          enrollmentService.checkEnrollment(course.id).catch(() => false),
          bookmarkService.isBookmarked(course.id).catch(() => false)
        ]);
        enrollStatusMap[course.id] = isEnrolled;
        bookmarkStatusMap[course.id] = isBookmarked;
      } catch (err) {
        console.warn(`Failed to get status for course ${course.id}:`, err);
        enrollStatusMap[course.id] = false;
        bookmarkStatusMap[course.id] = false;
      }
    }
    setEnrolledStatus(enrollStatusMap);
    setBookmarkedStatus(bookmarkStatusMap);
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
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'students':
        filtered.sort((a, b) => (b.students || 0) - (a.students || 0));
        break;
      default:
        filtered.sort((a, b) => (b.students || 0) - (a.students || 0));
    }
    
    setFilteredCourses(filtered);
  };

  const handleViewCourse = (courseId) => {
    if (courseId) {
      router.push(`/student/courses/${courseId}`);
    }
  };

  const handleEnroll = async (courseId, e) => {
    e.stopPropagation();
    if (!courseId) return;
    
    setActionLoading(prev => ({ ...prev, [courseId]: 'enrolling' }));
    try {
      await enrollmentService.enroll(courseId);
      // Update local state immediately
      setEnrolledStatus(prev => ({ ...prev, [courseId]: true }));
      alert('Successfully enrolled in the course!');
    } catch (err) {
      alert(err.message || 'Failed to enroll');
    } finally {
      setActionLoading(prev => ({ ...prev, [courseId]: false }));
    }
  };

  const handleUnenroll = async (courseId, e) => {
    e.stopPropagation();
    if (!courseId) return;
    
    if (!confirm('Are you sure you want to unenroll from this course? Your progress will be lost.')) {
      return;
    }
    setActionLoading(prev => ({ ...prev, [courseId]: 'unenrolling' }));
    try {
      await enrollmentService.unenroll(courseId);
      // Update local state immediately
      setEnrolledStatus(prev => ({ ...prev, [courseId]: false }));
      alert('Successfully unenrolled from the course.');
    } catch (err) {
      alert(err.message || 'Failed to unenroll');
    } finally {
      setActionLoading(prev => ({ ...prev, [courseId]: false }));
    }
  };

  const handleAddBookmark = async (courseId, e) => {
    e.stopPropagation();
    if (!courseId) return;
    
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
    if (!courseId) return;
    
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
                  
                  return (
                    <div 
                      key={course.id} 
                      onClick={() => handleViewCourse(course.id)}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <div className="relative">
                        <img 
                          src={course.thumbnailUrl || 'https://via.placeholder.com/600x400?text=Course+Image'} 
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
                            <span className="text-sm font-medium">{course.rating || 4.5}</span>
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
                          <span className="text-xs text-gray-500">
                            {(course.students || 0).toLocaleString()} students
                          </span>
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
    </div>
  );
}