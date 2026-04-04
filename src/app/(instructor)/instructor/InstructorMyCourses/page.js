'use client';

import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { useState } from 'react';
import { Search, Star, Users, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, Menu, X, BookOpen, BarChart2, Settings, Bell, LogOut, Home } from 'lucide-react';


// ── Data ────────────────────────────────────────────────────────────────────
const courses = [
  { id: 1, title: 'Premiere Pro CC for Beginners: Video Editing in Premiere', category: 'DEVELOPMENTS', rating: 4.9, students: 982941, price: 24, oldPrice: null, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80' },
  { id: 2, title: 'Data Structures & Algorithms Essentials (2021)', category: 'DEVELOPMENTS', rating: 5.0, students: 197637, price: 23, oldPrice: 35, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80' },
  { id: 3, title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science', category: 'DEVELOPMENTS', rating: 5.0, students: 211434, price: 89, oldPrice: null, image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=400&q=80' },
  { id: 4, title: 'Graphic Design Masterclass - Learn GREAT Design', category: 'DEVELOPMENTS', rating: 5.0, students: 1356236, price: 89, oldPrice: null, image: 'https://images.unsplash.com/photo-1541178735493-479c1a27ed24?w=400&q=80' },
  { id: 5, title: '[NEW] Ultimate AWS Certified Cloud Practitioner - 2021', category: 'DEVELOPMENTS', rating: 4.5, students: 435671, price: 24, oldPrice: 13, image: 'https://images.unsplash.com/photo-1560732488-6b0df240254a?w=400&q=80' },
  { id: 6, title: '2021 Complete Python Bootcamp From Zero to Hero in Python', category: 'DEVELOPMENTS', rating: 4.3, students: 435671, price: 16, oldPrice: null, image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80' },
  { id: 7, title: 'Complete Blender Creator: Learn 3D Modelling for Beginners', category: 'DEVELOPMENTS', rating: 3.5, students: 435671, price: 16, oldPrice: null, image: 'https://images.unsplash.com/photo-1547954575-855750c57bd3?w=400&q=80' },
  { id: 8, title: 'SEO 2021: Complete SEO Training + SEO for WordPress Websites', category: 'DEVELOPMENTS', rating: 4.9, students: 181811, price: 57, oldPrice: 57, image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&q=80' },
  { id: 9, title: 'Angular - The Complete Guide (2021 Edition)', category: 'DEVELOPMENTS', rating: 4.6, students: 236568, price: 32, oldPrice: null, image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80' },
  { id: 10, title: 'Complete Adobe Lightroom Megacourse: Beginner to Expert', category: 'DEVELOPMENTS', rating: 4.8, students: 854, price: 23, oldPrice: 13, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80' },
  { id: 11, title: 'The Ultimate Drawing Course - Beginner to Advanced', category: 'DEVELOPMENTS', rating: 4.5, students: 2711, price: 35, oldPrice: null, image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80' },
  { id: 12, title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science', category: 'DEVELOPMENTS', rating: 4.1, students: 451444, price: 9, oldPrice: 9, image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&q=80' },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <Star size={12} className="fill-yellow-400 text-yellow-400" />
      <span className="text-xs font-bold text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-blue-300 transition-all group">
      <div className="h-36 sm:h-44 overflow-hidden bg-gray-100">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1.5">{course.category}</p>
        <h3 className="font-bold text-gray-900 text-xs sm:text-sm leading-snug mb-2 sm:mb-3 line-clamp-2">{course.title}</h3>
        <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500 mb-2 sm:mb-3 flex-wrap">
          <StarRating rating={course.rating} />
          <div className="flex items-center gap-1">
            <Users size={11} />
            <span className="truncate">{course.students.toLocaleString()} students</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-blue-600 text-sm">${course.price.toFixed(2)}</span>
            {course.oldPrice && (
              <span className="text-xs text-gray-400 line-through">${course.oldPrice.toFixed(2)}</span>
            )}
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

const TOTAL_PAGES = 5;

export default function InstructorMyCourses() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Latest');
  const [category, setCategory] = useState('All Category');
  const [rating, setRating] = useState('4 Star & Up');
  const [page, setPage] = useState(2);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content — offset for sidebar on large screens */}
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <InstructorNavbar title="My Courses" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-3 sm:p-4 md:p-6">

          {/* ── Filter Bar ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
            {/* Mobile: collapsible filters */}
            <div className="flex items-center justify-between mb-3 sm:hidden">
              <span className="text-sm font-bold text-gray-700">Filters</span>
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center gap-1 text-xs text-blue-600 font-semibold"
              >
                {filtersOpen ? 'Hide' : 'Show'} <ChevronDown size={14} className={`transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Search always visible */}
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search in your courses..."
                className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-700 outline-none focus:border-blue-400 transition-all"
              />
            </div>

            {/* Other filters: grid on md+, collapsible on mobile */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${filtersOpen || 'hidden sm:grid'}`}>
              {/* Sort */}
              <div>
                <p className="text-xs text-gray-500 mb-1 font-medium">Sort by:</p>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 bg-white outline-none focus:border-blue-400 pr-8"
                  >
                    <option>Latest</option>
                    <option>Oldest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              {/* Category */}
              <div>
                <p className="text-xs text-gray-500 mb-1 font-medium">Category:</p>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 bg-white outline-none focus:border-blue-400 pr-8"
                  >
                    <option>All Category</option>
                    <option>Development</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Data Science</option>
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              {/* Rating */}
              <div>
                <p className="text-xs text-gray-500 mb-1 font-medium">Rating:</p>
                <div className="relative">
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 bg-white outline-none focus:border-blue-400 pr-8"
                  >
                    <option>4 Star & Up</option>
                    <option>3 Star & Up</option>
                    <option>2 Star & Up</option>
                    <option>1 Star & Up</option>
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Course Grid ── */}
          {/* 1 col mobile → 2 col sm → 3 col lg → 4 col xl */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* ── Pagination ── */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 flex-wrap">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-600 transition-all"
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                  page === p
                    ? 'bg-blue-600 text-white'
                    : p === 4
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {String(p).padStart(2, '0')}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-600 transition-all"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </main>

        <InstructorFooter />
      </div>
    </div>
  );
}