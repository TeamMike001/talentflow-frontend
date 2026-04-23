'use client';

import { useState } from 'react';
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
        <FilterSection title="Category">
          <div className="space-y-3">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={selectedCategories.includes(cat)}
                  onChange={() => setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat])}
                  className="w-4 h-4 accent-blue-600 rounded" />
                <span className="text-sm text-gray-600">{cat}</span>
              </label>
            ))}
          </div>
        </FilterSection>
        <FilterSection title="Level">
          <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 outline-none focus:border-blue-400">
            <option>Select expertise level</option>
            <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
          </select>
        </FilterSection>
        <FilterSection title="Ratings">
          <div className="space-y-3">
            {ratings.map((r) => (
              <label key={r} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (<Star key={i} size={13} className={i < r ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />))}
                  <span className="text-xs text-gray-400 ml-1">& Up</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>
        <button onClick={onClose} className="w-full py-3 mt-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all">Apply Filters</button>
        <button className="w-full py-2 text-sm text-gray-400 mt-1 hover:text-gray-600 transition-colors">Clear All</button>
      </div>
    </>
  );
}

export default function StudentHome() {
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [filterOpen, setFilterOpen]     = useState(false);
  const [currentPage, setCurrentPage]   = useState(2);
  const [selectedCategories, setSelectedCategories] = useState(['Product management']);

  const startIdx       = ((currentPage - 1) * COURSES_PER_PAGE) % featuredCourses.length;
  const visibleCourses = [...Array(COURSES_PER_PAGE)].map((_, i) => featuredCourses[(startIdx + i) % featuredCourses.length]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-w-0">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 space-y-8 sm:space-y-10 min-w-0 overflow-x-hidden">

          {/* ══ 1. HERO BANNER ══ */}
          <section
            className="relative rounded-3xl overflow-hidden flex flex-col justify-center min-h-[200px] sm:min-h-[240px]"
            style={{ background: 'linear-gradient(115deg, #0d1940 0%, #1a1560 30%, #261272 55%, #18235a 100%)' }}>
            <div className="absolute pointer-events-none hidden sm:block" style={{ width: 360, height: 360, borderRadius: '50%', background: 'rgba(6,10,46,0.58)', right: 80, top: '50%', transform: 'translateY(-50%)' }} />
            <div className="absolute pointer-events-none" style={{ width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle at 38% 38%, #0d8a78 0%, #065c52 60%, transparent 100%)', right: -10, top: -20, opacity: 0.88 }} />
            <div className="absolute pointer-events-none" style={{ width: 200, height: 160, borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 38%, #d97706 0%, #b45309 50%, #92400e 100%)', right: -20, bottom: -50, opacity: 0.95 }} />
            <div className="absolute pointer-events-none hidden sm:block" style={{ width: 210, height: 190, borderRadius: '50%', background: 'radial-gradient(circle, #5b21b6 0%, #3b0f8c 70%, transparent 100%)', right: 230, bottom: -55, opacity: 0.5 }} />
            <div className="relative z-10 px-6 sm:px-9 py-8 sm:py-10 max-w-xl">


             <Link href="/student/StudentCourses">
            <button
              className="text-white font-bold tracking-widest uppercase px-6 py-3 rounded-full mb-4 cursor-pointer text-sm"
              style={{
                background: "#2563eb", // blue color
              }}
            >
              Learning Dashboard
            </button>
          </Link>
              
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-5 max-w-sm">
                You&apos;ve completed 75% of your weekly goal. Your next lesson &ldquo;Advanced UI Composition&rdquo; is waiting for you.
              </p>
              <div className="relative max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search for courses..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-gray-700 bg-white/95 outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400" />
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