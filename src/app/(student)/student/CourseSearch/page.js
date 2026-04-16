'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Star, Users, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, X } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080';

// ── Public Navbar ────────────────────────────────────────────────────────
function PublicNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">TF</span>
            </div>
            <span className="font-extrabold text-gray-900 text-sm">
              Talent<span className="text-blue-600">Flow</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-7">
            <Link href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</Link>
            <Link href="/courses" className="text-sm text-blue-600 font-medium">Courses</Link>
            <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">About</Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">Contact</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Link href="/student/dashboard" className="text-sm font-bold text-white bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 transition-all">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/signin" className="text-sm font-bold text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all">
                Sign In
              </Link>
              <Link href="/signup" className="text-sm font-bold text-white bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 transition-all">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

// ── Public Footer ──────────────────────────────────────────────────────────
function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">TF</span>
            </div>
            <span className="font-extrabold text-sm">Talent<span className="text-blue-600">Flow</span></span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed">Top learning experiences that create more talent in the world.</p>
        </div>
        {[
          { title: 'Product', links: ['Overview', 'Features', 'Solutions', 'Tutorials', 'Pricing'] },
          { title: 'Company', links: ['About us', 'Features', 'News'] },
          { title: 'Social', links: ['Twitter', 'LinkedIn', 'GitHub', 'Clickup'] },
          { title: 'Legal', links: ['Terms', 'Privacy', 'Cookies', 'Contact'] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-bold text-sm mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 text-xs hover:text-white transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-800 max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <p className="text-gray-500 text-xs">© 2026 Team Mike – UI/UX. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Twitter</Link>
          <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">LinkedIn</Link>
          <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Facebook</Link>
        </div>
      </div>
    </footer>
  );
}

// ── Course Card Component ──
function CourseCard({ course }) {
  return (
    <Link href={`/courses/${course.id}`} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group block">
      <div className="h-44 overflow-hidden bg-gray-100">
        <img src={course.thumbnail || course.image || '/course-placeholder.jpg'} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase">{course.category || 'COURSE'}</span>
        <h3 className="font-bold text-gray-900 text-sm mt-1 mb-3 leading-snug line-clamp-2">{course.title}</h3>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Star size={11} className="fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-gray-700">{course.rating || 4.5}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={11} />
            <span>{(course.students || 0).toLocaleString()} students</span>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-gray-100">
          <span className="text-xs font-semibold text-blue-600">${course.price || 49}</span>
        </div>
      </div>
    </Link>
  );
}

export default function CourseSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('trending');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Filter states
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState([]);

  const categories = ['Development', 'Design', 'Marketing', 'Business', 'Data Science', 'IT & Software'];
  const levels = ['Beginner', 'Intermediate', 'Expert', 'All Levels'];
  const durations = ['1-4 Weeks', '1-3 Months', '3-6 Months', '6+ Months'];

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterAndSortCourses();
  }, [searchQuery, courses, sortBy, selectedCategories, priceRange, selectedLevel, selectedDuration, currentPage]);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/courses/published`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
        setFilteredCourses(data);
        setTotalPages(Math.ceil(data.length / 9));
        
        // Generate search suggestions
        const allTitles = data.map(c => c.title.split(' ')).flat();
        const uniqueSuggestions = [...new Set(allTitles)].slice(0, 10);
        setSuggestions(uniqueSuggestions);
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortCourses = () => {
    let filtered = [...courses];
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(course => 
        selectedCategories.includes(course.category)
      );
    }
    
    // Price filter
    filtered = filtered.filter(course => 
      (course.price || 0) >= priceRange.min && (course.price || 0) <= priceRange.max
    );
    
    // Level filter
    if (selectedLevel.length > 0) {
      filtered = filtered.filter(course => 
        selectedLevel.includes(course.level)
      );
    }
    
    // Sort
    switch(sortBy) {
      case 'price_low':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price_high':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        filtered.sort((a, b) => (b.students || 0) - (a.students || 0));
    }
    
    setTotalPages(Math.ceil(filtered.length / 9));
    const start = (currentPage - 1) * 9;
    const paginated = filtered.slice(start, start + 9);
    setFilteredCourses(paginated);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    setShowSuggestions(true);
  };

  const selectSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setCurrentPage(1);
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const toggleLevel = (level) => {
    setSelectedLevel(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
    setCurrentPage(1);
  };

  const toggleDuration = (duration) => {
    setSelectedDuration(prev => 
      prev.includes(duration) 
        ? prev.filter(d => d !== duration)
        : [...prev, duration]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 500 });
    setSelectedLevel([]);
    setSelectedDuration([]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const sortOptions = [
    { value: 'trending', label: 'Trending' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' }
  ];

  const activeFilterCount = selectedCategories.length + selectedLevel.length + selectedDuration.length;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PublicNavbar />

      <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-1">

        {/* Search Bar Row */}
        <div className="flex items-center gap-3 mb-4 relative">
          <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all lg:hidden">
            <SlidersHorizontal size={15} />
            Filter
            {activeFilterCount > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">{activeFilterCount}</span>
            )}
          </button>
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Search for courses, topics, or instructors..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-blue-600 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                {suggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5).map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectSuggestion(suggestion)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                  >
                    <Search size={12} className="inline mr-2 text-gray-400" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            Sort by:
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-white outline-none focus:border-blue-600"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
          </p>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear all filters
            </button>
          )}
        </div>

        <div className="flex gap-8 items-start">

          {/* Filter Sidebar */}
          <aside className="w-64 flex-shrink-0 space-y-6 hidden lg:block">

            {/* Category Filter */}
            <div>
              <button className="flex items-center justify-between w-full mb-3" onClick={() => setCategoryOpen(!categoryOpen)}>
                <span className="font-bold text-gray-800 text-sm uppercase tracking-wide">Category</span>
                {categoryOpen ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
              </button>
              {categoryOpen && (
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="accent-blue-600 w-4 h-4"
                      />
                      <span className={`text-sm ${selectedCategories.includes(cat) ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Filter */}
            <div>
              <p className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-3">Price Range</p>
              <div className="space-y-3">
                <input
                  type="range"
                  min={0}
                  max={500}
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                  className="w-full accent-blue-600"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="$ min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                    className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-blue-600"
                  />
                  <input
                    type="number"
                    placeholder="$ max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 500 })}
                    className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <p className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-3">Course Level</p>
              <div className="space-y-2">
                {levels.map((level) => (
                  <label key={level} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedLevel.includes(level)}
                      onChange={() => toggleLevel(level)}
                      className="accent-blue-600 w-4 h-4"
                    />
                    <span className={`text-sm ${selectedLevel.includes(level) ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div>
              <p className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-3">Duration</p>
              <div className="space-y-2">
                {durations.map((duration) => (
                  <label key={duration} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedDuration.includes(duration)}
                      onChange={() => toggleDuration(duration)}
                      className="accent-blue-600 w-4 h-4"
                    />
                    <span className={`text-sm ${selectedDuration.includes(duration) ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>
                      {duration}
                    </span>
                  </label>
                ))}
              </div>
            </div>

          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading courses...</p>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-12">
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
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-blue-600 hover:text-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600'
                          }`}
                        >
                          {String(pageNum).padStart(2, '0')}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-blue-600 hover:text-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>

      <PublicFooter />
    </div>
  );
}