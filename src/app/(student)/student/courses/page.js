'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import Link from 'next/link';

import {
  ChevronLeft, ChevronRight, Star,
  ChevronDown, ChevronUp, X, Search, Users,
} from 'lucide-react';

// --- DATA ---
const featuredCourses = [
  { id: 1,  category: 'Design', title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science',      rating: 4.6, students: 181811, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80' },
  { id: 2,  category: 'Design', title: 'Instagram Marketing 2021: Complete Guide To Instagram Gro...',      rating: 4.6, students: 181811, image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80' },
  { id: 3,  category: 'Design', title: 'Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates',    rating: 4.6, students: 181811, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80' },
  { id: 4,  category: 'Design', title: 'Learn Python Programming Masterclass',                              rating: 4.6, students: 181811, image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&q=80' },
  { id: 5,  category: 'Design', title: 'Data Structures & Algorithms Essentials (2021)',                    rating: 4.5, students: 181811, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80' },
  { id: 6,  category: 'Design', title: 'Ultimate Google Ads Training 2020: Profit with Pay Per Click',     rating: 4.6, students: 181811, image: 'https://images.unsplash.com/photo-1484807352052-23338990c6c6?w=400&q=80' },
  { id: 7,  category: 'Design', title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science',      rating: 4.6, students: 181811, image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&q=80' },
  { id: 8,  category: 'Design', title: 'Instagram Marketing 2021: Complete Guide To Instagram Gro...',      rating: 4.6, students: 181811, image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80' },
  { id: 9,  category: 'Design', title: 'Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates',    rating: 4.6, students: 181811, image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80' },
  { id: 10, category: 'Design', title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science',      rating: 4.6, students: 181811, image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&q=80' },
  { id: 11, category: 'Design', title: 'Instagram Marketing 2021: Complete Guide To Instagram Gro...',      rating: 4.6, students: 181811, image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80' },
  { id: 12, category: 'Design', title: 'Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates',    rating: 4.6, students: 181811, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' },
];

const continueLearning = [
  { id: 1, icon: '🔷', iconBg: 'bg-blue-500',   status: 'IN PROGRESS', title: 'Foundations of User Centered Design',      meta: 'Lesson 5 of 24 • 10h 24m Left',  completion: 35 },
  { id: 2, icon: '🔶', iconBg: 'bg-yellow-400', status: 'IN PROGRESS', title: 'Intro to Data Science and Machine Learning', meta: 'Lesson 15 of 24 • 10h 24m Left', completion: 75 },
  { id: 3, icon: '🟣', iconBg: 'bg-pink-500',   status: 'NEXT UP',     title: 'Principles of User-Focused Design',         meta: 'Prerequisite : Intro to Figma',   completion: 0  },
];

const categories = ['Product management', 'Data Science', 'UX Design', 'Product manager'];
const ratings    = [5, 4, 3, 2];

const COURSES_PER_PAGE = 9;
const TOTAL_PAGES      = 5;

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

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={11}
          className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'} />
      ))}
      <span className="text-[10px] text-gray-500 ml-1 font-medium">{rating}</span>
    </div>
  );
}

/* ── Course Card — clicking navigates to CourseDetail ── */
function CourseCard({ course }) {
  return (
    <Link href="/student/CourseDetail" className="block group h-full">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all h-full">
        <div className="h-36 sm:h-40 overflow-hidden bg-gray-100">
          <img src={course.image} alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-3 sm:p-4">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-orange-500 mb-1.5 block">
            {course.category}
          </span>
          <h3 className="font-bold text-gray-900 text-[11px] sm:text-xs mb-3 leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>
          <StarRating rating={course.rating} />
          <div className="flex items-center gap-1 mt-1.5">
            <Users size={10} className="text-gray-400" />
            <span className="text-[10px] text-gray-400 font-medium">
              {course.students.toLocaleString()} students
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all">
        <ChevronLeft size={14} />
      </button>
      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        const active = page === currentPage;
        return (
          <button key={page} onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
              active ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-600'
            }`}>
            {String(page).padStart(2, '0')}
          </button>
        );
      })}
      <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all">
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

function FilterDrawer({ open, onClose, selectedCategories, setSelectedCategories }) {
  return (
    <>
      <div className={`lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl p-5 transition-transform duration-300 max-h-[80vh] overflow-y-auto ${open ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex items-center justify-between mb-5">
          <span className="font-bold text-gray-900 text-sm">Filters</span>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
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
            </div>
          </section>

          {/* ══ 2. FEATURED COURSES ══ */}
          <section>
            <div className="mb-4">
              <h2 className="font-extrabold text-gray-900 text-sm sm:text-base leading-snug">Master New Skills That Matter At Your Own Pace</h2>
              <p className="text-gray-400 text-[10px] mt-0.5 hidden sm:block">From foundational basics to advanced mastery — expert-led paths designed to turn your ambition into a career.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleCourses.map((c, idx) => <CourseCard key={`${c.id}-${idx}`} course={c} />)}
            </div>
            <Pagination currentPage={currentPage} totalPages={TOTAL_PAGES} onPageChange={setCurrentPage} />
          </section>

          {/* ══ 3. CONTINUE LEARNING ══ */}
          <section>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="font-extrabold text-gray-900 text-sm whitespace-nowrap">Continue Learning</h2>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {continueLearning.map((item) => (
                <Link key={item.id} href="/student/CourseDetail" className="block group">
                  <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm group-hover:border-blue-200 group-hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 ${item.iconBg} rounded-xl flex items-center justify-center text-lg`}>{item.icon}</div>
                      <span className="text-[10px] font-bold text-gray-400 tracking-wide">{item.status}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-xs mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-[10px] mb-4">{item.meta}</p>
                    <div className="flex items-center justify-between text-[10px] mb-1.5">
                      <span className="text-gray-400 font-medium">Completion</span>
                      <span className="text-blue-600 font-bold">{item.completion}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${item.completion}%` }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </main>

        {/* ── FOOTER ── */}
        <footer className="border-t border-gray-100 bg-white px-6 py-4 mt-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
            <span>© 2026 Team Mike - UI/UX. All rights reserved.</span>
            <div className="flex gap-4">
              <Link href="/faqs" className="hover:text-gray-600">FAQs</Link>
              <Link href="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-600">Terms & Condition</Link>
            </div>
          </div>
        </footer>
      </div>

      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)}
        selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
    </div>
  );
}