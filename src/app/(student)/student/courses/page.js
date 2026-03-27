'use client';

import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import Link from 'next/link';
import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Star,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// --- DATA ---
const featuredCourses = [
  { id: 1, title: 'Foundations of User Centered Design', desc: 'Learn how to put users first-research basics, personas, and journey mapping.', tags: ['Beginner', 'Live Class'], image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80' },
  { id: 2, title: 'Foundations of User Centered Design', desc: 'Learn how to put users first-research basics, personas, and journey mapping.', tags: ['Beginner', 'Live Class'], image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80' },
  { id: 3, title: 'Foundations of User Centered Design', desc: 'Learn how to put users first-research basics, personas, and journey mapping.', tags: ['Beginner', 'Live Class'], image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80' },
  { id: 4, title: 'Foundations of User Centered Design', desc: 'Learn how to put users first-research basics, personas, and journey mapping.', tags: ['Beginner', 'Live Class'], image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80' },
];

const continueLearning = [
  { id: 1, icon: '🔷', iconBg: 'bg-blue-500',   status: 'IN PROGRESS', title: 'Foundations of User Centered Design',          meta: 'Lesson 5 of 24 • 10h 24m Left',  completion: 35, completionColor: 'bg-blue-600' },
  { id: 2, icon: '🔶', iconBg: 'bg-yellow-400', status: 'IN PROGRESS', title: 'Intro to Data Science and Machine Learning',     meta: 'Lesson 15 of 24 • 10h 24m Left', completion: 75, completionColor: 'bg-blue-600' },
  { id: 3, icon: '🟣', iconBg: 'bg-pink-500',   status: 'NEXT UP',     title: 'Principles of User-Focused Design',             meta: 'Prerequisite : Intro to Figma',   completion: 0,  completionColor: 'bg-gray-200' },
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

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group">
      <div className="h-32 overflow-hidden bg-gray-100">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-xs mb-1 leading-tight">{course.title}</h3>
        <p className="text-gray-400 text-[10px] leading-relaxed mb-3 line-clamp-2">{course.desc}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {course.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded-md font-medium">{tag}</span>
          ))}
        </div>
        <Link
          href="/student/addtocart"
          className="block w-full text-center py-2 bg-blue-600 text-white text-[10px] font-bold rounded-lg hover:bg-blue-700 transition-all"
        >
          Enroll now
        </Link>
      </div>
    </div>
  );
}

export default function StudentHome() {
  const [selectedCategories, setSelectedCategories] = useState(['Product management']);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar />

      <div className="flex-1 lg:ml-56 flex flex-col">
        <StudentNavbar />

        <main className="flex-1 p-6 space-y-10">

          {/* ══════════════════════════════════════════
              1. HERO BANNER — layered circle design
          ══════════════════════════════════════════ */}
          <section
            className="relative rounded-3xl overflow-hidden flex flex-col justify-center min-h-[240px]"
            style={{ background: 'linear-gradient(115deg, #0d1940 0%, #1a1560 30%, #261272 55%, #18235a 100%)' }}
          >
            {/* Large dark circle — centre-right, the biggest shape */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: 360,
                height: 360,
                borderRadius: '50%',
                background: 'rgba(6, 10, 46, 0.58)',
                right: 80,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />

            {/* Teal / dark-green circle — top-right corner */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: 240,
                height: 240,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 38% 38%, #0d8a78 0%, #065c52 60%, transparent 100%)',
                right: -18,
                top: -28,
                opacity: 0.88,
              }}
            />

            {/* Orange/amber blob — bottom-right, half cut off */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: 300,
                height: 240,
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at 50% 38%, #d97706 0%, #b45309 50%, #92400e 100%)',
                right: -24,
                bottom: -90,
                opacity: 0.95,
              }}
            />

            {/* Purple accent — bottom-centre, ties navy into orange */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: 210,
                height: 190,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #5b21b6 0%, #3b0f8c 70%, transparent 100%)',
                right: 230,
                bottom: -55,
                opacity: 0.5,
              }}
            />

            {/* ── Content ── */}
            <div className="relative z-10 px-9 py-10 max-w-xl">
              {/* Tag pill */}
              <span
                className="inline-block text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
                style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)' }}
              >
                Learning Dashboard
              </span>

              {/* Heading */}
              <h1 className="text-4xl font-extrabold text-white leading-tight mb-3">
                Welcome back,<br />Titus!
              </h1>

              {/* Subtitle */}
              <p className="text-white/80 text-sm leading-relaxed mb-7 max-w-sm">
                You&apos;ve completed 75% of your weekly goal. Your next lesson
                &ldquo;Advanced UI Composition&rdquo; is waiting for you.
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/student/StudentCourses"
                  className="flex items-center gap-2 bg-white text-blue-900 font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-100 transition-all"
                >
                  Continue Learning →
                </Link>
                <Link
                  href="/student/StudentCourses"
                  style={{ background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.28)' }}
                  className="flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl text-white hover:bg-white/20 transition-all"
                >
                  View Progress
                </Link>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════
              2. FEATURED SLIDER
          ══════════════════════════════════════════ */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-extrabold text-gray-900 text-base">Master New Skills That Matter At Your Own Pace</h2>
                <p className="text-gray-400 text-[10px]">From foundational basics to advanced mastery — expert-led paths designed to turn your ambition into a career.</p>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all"><ChevronLeft size={16} /></button>
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all"><ChevronRight size={16} /></button>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredCourses.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {featuredCourses.map((c) => <CourseCard key={c.id + 'row2'} course={c} />)}
            </div>
          </section>

          {/* ══════════════════════════════════════════
              3. CONTINUE LEARNING
          ══════════════════════════════════════════ */}
          <section>
            <div className="flex items-center gap-4 mb-5">
              <h2 className="font-extrabold text-gray-900 text-sm">Continue Learning</h2>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {continueLearning.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:border-blue-200 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${item.iconBg} rounded-xl flex items-center justify-center text-lg`}>{item.icon}</div>
                    <span className="text-[10px] font-bold text-gray-400 tracking-wide">{item.status}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-xs mb-1 truncate">{item.title}</h3>
                  <p className="text-gray-400 text-[10px] mb-4">{item.meta}</p>
                  <div className="flex items-center justify-between text-[10px] mb-1.5">
                    <span className="text-gray-400 font-medium">Completion</span>
                    <span className="text-blue-600 font-bold">{item.completion}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.completionColor}`} style={{ width: `${item.completion}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════
              4. COURSE EXPLORER WITH FILTERS
          ══════════════════════════════════════════ */}
          <section className="pt-6 border-t border-gray-100">
            <div className="flex gap-8 items-start">

              {/* SIDEBAR FILTERS */}
              <aside className="w-52 flex-shrink-0 bg-white rounded-2xl border border-gray-100 p-5 sticky top-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
                  <SlidersHorizontal size={14} className="text-gray-400" />
                  <span className="font-bold text-gray-800 text-[11px] tracking-wider uppercase">Filters</span>
                </div>

                <FilterSection title="Category">
                  <div className="space-y-2.5">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() =>
                            setSelectedCategories((prev) =>
                              prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
                            )
                          }
                          className="w-3.5 h-3.5 accent-blue-600 rounded"
                        />
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
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className={i < r ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                          ))}
                          <span className="text-[10px] text-gray-400 ml-1">& Up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                <button className="w-full py-2.5 mt-4 bg-blue-600 text-white text-[10px] font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                  Apply Filters
                </button>
                <button className="w-full py-2 text-[10px] text-gray-400 mt-1 hover:text-gray-600 transition-colors">
                  Clear All
                </button>
              </aside>

              {/* COURSE GRID */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-extrabold text-gray-900 text-lg">Product Management</h2>
                    <p className="text-gray-400 text-[11px]">Browse the highest rated courses in Product Management.</p>
                  </div>
                  <button className="flex items-center gap-2 text-[10px] text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg bg-white hover:border-blue-400 transition-all">
                    Sort by: <span className="font-bold text-gray-800">Recommended</span>
                    <ChevronDown size={12} />
                  </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {featuredCourses.map((c) => <CourseCard key={c.id + 'main'} course={c} />)}
                  {featuredCourses.map((c) => <CourseCard key={c.id + 'main2'} course={c} />)}
                </div>

                <div className="flex justify-center mt-12 pb-10">
                  <button className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-2xl font-bold text-xs hover:bg-blue-600 hover:text-white transition-all">
                    Explore More Courses →
                  </button>
                </div>
              </div>

            </div>
          </section>

        </main>
      </div>
    </div>
  );
}