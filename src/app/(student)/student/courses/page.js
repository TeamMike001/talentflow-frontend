'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import Link from 'next/link';
import {
  ChevronLeft, ChevronRight, SlidersHorizontal,
  Star, ChevronDown, ChevronUp, X,
} from 'lucide-react';

// --- DATA ---
const featuredCourses = [
  { id: 1, title: 'Foundations of User Centered Design',      desc: 'Learn how to put users first — research basics, personas, and journey mapping.', tags: ['Beginner', 'Live Class'],     image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80' },
  { id: 2, title: 'Wireframing & Prototyping in Figma',       desc: 'Hands-on practice with Figma: turn ideas into clickable prototypes and test flows.', tags: ['Beginner', 'Self Paced'],    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80' },
  { id: 3, title: 'Usability Testing: From Plan to Insights', desc: 'Design, run, and analyze usability tests that reveal real pain points.',             tags: ['Intermediate', 'Live Class'], image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80' },
  { id: 4, title: 'Design Systems and Component Thinking',    desc: 'Build scalable UI with reusable components, tokens, and guidelines.',               tags: ['Advanced', 'Self Paced'],    image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&q=80' },
];

const continueLearning = [
  { id: 1, icon: '🔷', iconBg: 'bg-blue-500',   status: 'IN PROGRESS', title: 'Foundations of User Centered Design',      meta: 'Lesson 5 of 24 • 10h 24m Left',  completion: 35 },
  { id: 2, icon: '🔶', iconBg: 'bg-yellow-400', status: 'IN PROGRESS', title: 'Intro to Data Science and Machine Learning', meta: 'Lesson 15 of 24 • 10h 24m Left', completion: 75 },
  { id: 3, icon: '🟣', iconBg: 'bg-pink-500',   status: 'NEXT UP',     title: 'Principles of User-Focused Design',         meta: 'Prerequisite : Intro to Figma',   completion: 0  },
];

const categories = ['Product management', 'Data Science', 'UX Design', 'Product manager'];
const ratings = [5, 4, 3, 2];

// --- COMPONENTS ---
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-5">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full text-left mb-3">
        <span className="font-bold text-gray-800 text-sm">{title}</span>
        {open ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
      </button>
      {open && children}
    </div>
  );
}

<<<<<<< HEAD
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
=======
function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group">
      <div className="h-28 sm:h-32 overflow-hidden bg-gray-100">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="font-bold text-gray-900 text-[11px] sm:text-xs mb-1 leading-tight line-clamp-2">{course.title}</h3>
        <p className="text-gray-400 text-[10px] leading-relaxed mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{course.desc}</p>
        <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
          {course.tags.map((tag) => (
            <span key={tag} className="px-1.5 sm:px-2 py-0.5 bg-gray-100 text-gray-500 text-[9px] sm:text-[10px] rounded-md font-medium">{tag}</span>
          ))}
        </div>
        <Link href="/student/addtocart" className="block w-full text-center py-1.5 sm:py-2 bg-blue-600 text-white text-[10px] font-bold rounded-lg hover:bg-blue-700 transition-all">
          Enroll now
        </Link>
      </div>
    </div>
  );
}

// Mobile filter bottom-sheet drawer
function FilterDrawer({ open, onClose, selectedCategories, setSelectedCategories }) {
  return (
    <>
      <div
        className={`lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl p-5 transition-transform duration-300 max-h-[80vh] overflow-y-auto ${open ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex items-center justify-between mb-5">
          <span className="font-bold text-gray-900 text-sm">Filters</span>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
        </div>
        <FilterSection title="Category">
          <div className="space-y-3">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat])} className="w-4 h-4 accent-blue-600 rounded" />
                <span className="text-sm text-gray-600">{cat}</span>
              </label>
            ))}
          </div>
        </FilterSection>
        <FilterSection title="Level">
          <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 outline-none focus:border-blue-400">
            <option>Select expertise level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
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
        <button onClick={onClose} className="w-full py-3 mt-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all">
          Apply Filters
        </button>
        <button className="w-full py-2 text-sm text-gray-400 mt-1 hover:text-gray-600 transition-colors">Clear All</button>
      </div>
>>>>>>> parent of 4d42df6 (Complete course)
    </>
  );
}

export default function StudentHome() {
<<<<<<< HEAD
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [filterOpen, setFilterOpen]     = useState(false);
  const [currentPage, setCurrentPage]   = useState(2);
  const [selectedCategories, setSelectedCategories] = useState(['Product management']);

  const startIdx       = ((currentPage - 1) * COURSES_PER_PAGE) % featuredCourses.length;
  const visibleCourses = [...Array(COURSES_PER_PAGE)].map((_, i) => featuredCourses[(startIdx + i) % featuredCourses.length]);
=======
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen]   = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(['Product management']);
>>>>>>> parent of 4d42df6 (Complete course)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

<<<<<<< HEAD
=======
      {/* min-w-0 prevents flex child from overflowing */}
>>>>>>> parent of 4d42df6 (Complete course)
      <div className="flex-1 lg:ml-56 flex flex-col min-w-0">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 space-y-8 sm:space-y-10 min-w-0 overflow-x-hidden">

          {/* ══ 1. HERO BANNER ══ */}
          <section
            className="relative rounded-3xl overflow-hidden flex flex-col justify-center min-h-[200px] sm:min-h-[240px]"
<<<<<<< HEAD
            style={{ background: 'linear-gradient(115deg, #0d1940 0%, #1a1560 30%, #261272 55%, #18235a 100%)' }}>
=======
            style={{ background: 'linear-gradient(115deg, #0d1940 0%, #1a1560 30%, #261272 55%, #18235a 100%)' }}
          >
>>>>>>> parent of 4d42df6 (Complete course)
            <div className="absolute pointer-events-none hidden sm:block" style={{ width: 360, height: 360, borderRadius: '50%', background: 'rgba(6,10,46,0.58)', right: 80, top: '50%', transform: 'translateY(-50%)' }} />
            <div className="absolute pointer-events-none" style={{ width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle at 38% 38%, #0d8a78 0%, #065c52 60%, transparent 100%)', right: -10, top: -20, opacity: 0.88 }} />
            <div className="absolute pointer-events-none" style={{ width: 200, height: 160, borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 38%, #d97706 0%, #b45309 50%, #92400e 100%)', right: -20, bottom: -50, opacity: 0.95 }} />
            <div className="absolute pointer-events-none hidden sm:block" style={{ width: 210, height: 190, borderRadius: '50%', background: 'radial-gradient(circle, #5b21b6 0%, #3b0f8c 70%, transparent 100%)', right: 230, bottom: -55, opacity: 0.5 }} />
<<<<<<< HEAD
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
=======

            <div className="relative z-10 px-6 sm:px-9 py-8 sm:py-10 max-w-xl">
              <span className="inline-block text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)' }}>
                Learning Dashboard
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-3">Welcome back,<br />Titus!</h1>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-7 max-w-sm">
                You&apos;ve completed 75% of your weekly goal. Your next lesson &ldquo;Advanced UI Composition&rdquo; is waiting for you.
              </p>
              <div className="flex gap-2 sm:gap-3 flex-wrap">
                <Link href="/student/StudentCourses" className="flex items-center gap-2 bg-white text-blue-900 font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-gray-100 transition-all">
                  Continue Learning →
                </Link>
                <Link href="/student/StudentCourses" style={{ background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.28)' }} className="font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-white hover:bg-white/20 transition-all">
                  View Progress
                </Link>
              </div>
            </div>
          </section>

          {/* ══ 2. FEATURED COURSES ══ */}
          <section>
            <div className="flex items-start justify-between mb-4 gap-3">
              <div className="min-w-0">
                <h2 className="font-extrabold text-gray-900 text-sm sm:text-base leading-snug">Master New Skills That Matter At Your Own Pace</h2>
                <p className="text-gray-400 text-[10px] mt-0.5 hidden sm:block">From foundational basics to advanced mastery — expert-led paths designed to turn your ambition into a career.</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all"><ChevronLeft size={16} /></button>
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all"><ChevronRight size={16} /></button>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {featuredCourses.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-3 sm:mt-4">
              {featuredCourses.map((c) => <CourseCard key={c.id + 'r2'} course={c} />)}
            </div>
          </section>

          {/* ══ 3. CONTINUE LEARNING ══ */}
          <section>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="font-extrabold text-gray-900 text-sm whitespace-nowrap">Continue Learning</h2>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {continueLearning.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:border-blue-200 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${item.iconBg} rounded-xl flex items-center justify-center text-lg`}>{item.icon}</div>
                    <span className="text-[10px] font-bold text-gray-400 tracking-wide">{item.status}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-xs mb-1 line-clamp-2">{item.title}</h3>
                  <p className="text-gray-400 text-[10px] mb-4">{item.meta}</p>
                  <div className="flex items-center justify-between text-[10px] mb-1.5">
                    <span className="text-gray-400 font-medium">Completion</span>
                    <span className="text-blue-600 font-bold">{item.completion}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${item.completion}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══ 4. COURSE EXPLORER ══ */}
          <section className="pt-6 border-t border-gray-100">

            {/* ── Mobile header + filter button ── */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <div>
                <h2 className="font-extrabold text-gray-900 text-base">Product Management</h2>
                <p className="text-gray-400 text-[11px]">Browse the highest rated courses.</p>
              </div>
              <button
                onClick={() => setFilterOpen(true)}
                className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 px-3 py-2 rounded-xl bg-white font-semibold flex-shrink-0"
              >
                <SlidersHorizontal size={13} /> Filters
              </button>
            </div>

            {/* ── Mobile sort ── */}
            <div className="lg:hidden flex justify-end mb-4">
              <button className="flex items-center gap-1.5 text-[10px] text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg bg-white">
                Sort by: <span className="font-bold text-gray-800">Recommended</span>
                <ChevronDown size={12} />
              </button>
            </div>

            {/* ── Mobile course grid (full width, no sidebar) ── */}
            <div className="lg:hidden">
              <div className="grid grid-cols-2 gap-3">
                {[...featuredCourses, ...featuredCourses].map((c, i) => <CourseCard key={i} course={c} />)}
>>>>>>> parent of 4d42df6 (Complete course)
              </div>
              <div className="flex justify-center mt-8 pb-4">
                <button className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-6 py-2.5 rounded-2xl font-bold text-xs hover:bg-blue-600 hover:text-white transition-all">
                  Explore More Courses →
                </button>
              </div>
            </div>

            {/* ── Desktop: sidebar + grid ── */}
            <div className="hidden lg:flex gap-8 items-start">
              <aside className="w-52 flex-shrink-0 bg-white rounded-2xl border border-gray-100 p-5 sticky top-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
                  <SlidersHorizontal size={14} className="text-gray-400" />
                  <span className="font-bold text-gray-800 text-[11px] tracking-wider uppercase">Filters</span>
                </div>
                <FilterSection title="Category">
                  <div className="space-y-2.5">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                        <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat])} className="w-3.5 h-3.5 accent-blue-600 rounded" />
                        <span className="text-[11px] text-gray-500 group-hover:text-gray-900 transition-colors">{cat}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>
                <FilterSection title="Level">
                  <select className="w-full border border-gray-100 rounded-lg px-2 py-1.5 text-[10px] bg-gray-50 outline-none focus:border-blue-400">
                    <option>Select expertise level</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </FilterSection>
                <FilterSection title="Ratings">
                  <div className="space-y-2">
                    {ratings.map((r) => (
                      <label key={r} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-3.5 h-3.5 accent-blue-600" />
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (<Star key={i} size={10} className={i < r ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />))}
                          <span className="text-[10px] text-gray-400 ml-1">& Up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </FilterSection>
                <button className="w-full py-2.5 mt-4 bg-blue-600 text-white text-[10px] font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">Apply Filters</button>
                <button className="w-full py-2 text-[10px] text-gray-400 mt-1 hover:text-gray-600 transition-colors">Clear All</button>
              </aside>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-6 gap-3">
                  <div>
                    <h2 className="font-extrabold text-gray-900 text-lg">Product Management</h2>
                    <p className="text-gray-400 text-[11px]">Browse the highest rated courses in Product Management.</p>
                  </div>
                  <button className="flex items-center gap-2 text-[10px] text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg bg-white hover:border-blue-400 transition-all flex-shrink-0">
                    Sort by: <span className="font-bold text-gray-800">Recommended</span>
                    <ChevronDown size={12} />
                  </button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[...featuredCourses, ...featuredCourses].map((c, i) => <CourseCard key={i} course={c} />)}
                </div>
                <div className="flex justify-center mt-10 pb-6">
                  <button className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-2xl font-bold text-xs hover:bg-blue-600 hover:text-white transition-all">
                    Explore More Courses →
                  </button>
                </div>
              </div>
            </div>

          </section>
        </main>
      </div>

      {/* Mobile filter bottom-sheet */}
      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
    </div>
  );
}