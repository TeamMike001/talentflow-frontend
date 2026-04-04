'use client';

import { useState } from 'react';
import {
  Play, MessageSquare, Users, BookOpen, Globe, Paperclip, Clock, Trophy,
  Star, ChevronRight, ChevronDown, Menu, X, BarChart2, Settings, Bell, LogOut, Home,
} from 'lucide-react';

// ── Sidebar ──────────────────────────────────────────────────────────────────
function InstructorSidebar({ open, onClose }) {
  const links = [
    { icon: Home, label: 'Dashboard' },
    { icon: BookOpen, label: 'My Courses', active: true },
    { icon: BarChart2, label: 'Analytics' },
    { icon: Bell, label: 'Notifications' },
    { icon: Settings, label: 'Settings' },
  ];
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 h-full w-56 bg-white border-r border-gray-100 shadow-sm z-40 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <span className="font-extrabold text-lg text-blue-600 tracking-tight">EduPro</span>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {links.map(({ icon: Icon, label, active }) => (
            <a key={label} href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${active ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
              <Icon size={16} />{label}
            </a>
          ))}
        </nav>
        <div className="px-3 pb-5">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-50 transition-all">
            <LogOut size={16} /> Log out
          </a>
        </div>
      </aside>
    </>
  );
}

function InstructorNavbar({ title, onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden text-gray-500 hover:text-blue-600 transition-colors p-1"><Menu size={20} /></button>
        <div>
          <p className="text-xs text-gray-400">Good Morning 👋</p>
          <h1 className="font-extrabold text-gray-900 text-base leading-tight">{title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative p-2 text-gray-400 hover:text-blue-600 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full" />
        </button>
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-8 h-8 rounded-full object-cover" />
      </div>
    </header>
  );
}

function InstructorFooter() {
  return (
    <footer className="border-t border-gray-100 px-4 sm:px-6 py-3 text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-1">
      <span>© 2024 EduPro. All rights reserved.</span>
      <span>Made with ❤️ for instructors</span>
    </footer>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────
const courseStats = [
  { icon: <Play size={18} className="text-orange-400" />,          iconBg: 'bg-orange-50',  value: '1,957',    label: 'Lecture (219.3 GB)' },
  { icon: <MessageSquare size={18} className="text-purple-400" />, iconBg: 'bg-purple-50',  value: '432',      label: 'Total Comments' },
  { icon: <Users size={18} className="text-red-400" />,            iconBg: 'bg-red-50',     value: '523',      label: 'Students enrolled' },
  { icon: <BookOpen size={18} className="text-green-500" />,       iconBg: 'bg-green-50',   value: 'Beginner', label: 'Course level' },
  { icon: <Globe size={18} className="text-gray-500" />,           iconBg: 'bg-gray-100',   value: 'English',  label: 'Course Language' },
  { icon: <Paperclip size={18} className="text-orange-400" />,     iconBg: 'bg-orange-50',  value: '23',       label: 'Attach File (4.4 GB)' },
  { icon: <Clock size={18} className="text-purple-400" />,         iconBg: 'bg-purple-50',  value: '19:37:51', label: 'Hours' },
  { icon: <Trophy size={18} className="text-gray-500" />,          iconBg: 'bg-gray-100',   value: '504',      label: 'Students viewed' },
];

const ratingBars = [
  { stars: 5, pct: 56 },
  { stars: 4, pct: 37 },
  { stars: 3, pct: 8 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0.5 },
];

function StarRow({ filled, size = 13 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className={i < filled ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'} />
      ))}
    </div>
  );
}

function Sparkline() {
  return (
    <svg viewBox="0 0 200 60" className="w-full h-14" fill="none">
      <polyline
        points="0,45 25,35 50,42 75,25 100,38 125,20 150,32 175,15 200,28"
        stroke="#3B82F6" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
      />
    </svg>
  );
}

const breadcrumbs = ['Course', 'My Courses', 'Development', 'Web Development'];

export default function InstructorCourseDetail() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ratingFilter, setRatingFilter] = useState('This week');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <InstructorNavbar title="My Courses" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5">

          {/* ── Breadcrumb — scrollable on mobile ── */}
          <nav className="flex items-center gap-1 text-xs text-gray-400 overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide">
            {breadcrumbs.map((crumb) => (
              <span key={crumb} className="flex items-center gap-1 flex-shrink-0">
                <a href="#" className="hover:text-blue-600 transition-colors">{crumb}</a>
                <ChevronRight size={11} />
              </span>
            ))}
            <span className="text-gray-600 font-medium flex-shrink-0">2021 Complete Python Bootcamp From Zero to Hero in Python</span>
          </nav>

          {/* ── Course Hero Card ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
            {/* Stack on mobile, row on sm+ */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Thumbnail */}
              <div className="w-full sm:w-52 md:w-60 h-48 sm:h-36 md:h-40 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80"
                  alt="Course"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2 text-xs text-gray-400">
                  <span>Uploaded: <span className="text-gray-600 font-medium">Jan 21, 2025</span></span>
                  <span>Last Updated: <span className="text-blue-600 font-medium">Mar 11, 2026</span></span>
                </div>
                <h1 className="font-extrabold text-gray-900 text-lg sm:text-xl leading-snug mb-2">
                  2026 Complete Python Bootcamp From Zero to Hero in Python
                </h1>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  3 in 1 Course: Learn to design websites with Figma, build with Webflow, and make a living freelancing.
                </p>

                {/* Instructors + rating — stack on mobile */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      <img src="https://randomuser.me/api/portraits/men/44.jpg" className="w-7 h-7 rounded-full border-2 border-white" alt="" />
                      <img src="https://randomuser.me/api/portraits/women/45.jpg" className="w-7 h-7 rounded-full border-2 border-white -ml-2" alt="" />
                    </div>
                    <span className="text-xs text-gray-500">
                      By <span className="font-semibold text-gray-700">Kevin Gilbert • Kristin Watson</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRow filled={5} size={14} />
                    <span className="font-bold text-gray-900 text-sm">4.8</span>
                    <span className="text-xs text-gray-400">(451 Rating)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stats + Rating ── */}
          {/* Stack on mobile/tablet, side-by-side on lg */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 items-start">

            {/* Stats grid: 2 cols on mobile, 4 on md */}
            <div className="w-full lg:flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
              {courseStats.map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 md:p-5 flex items-center gap-3">
                  <div className={`w-9 h-9 sm:w-11 sm:h-11 ${s.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {s.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="font-extrabold text-gray-900 text-base sm:text-lg leading-none truncate">{s.value}</p>
                    <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 leading-snug">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Rating card */}
            <div className="w-full lg:w-72 xl:w-80 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 text-sm">Overall Course Rating</h2>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                  {ratingFilter} <ChevronDown size={13} />
                </button>
              </div>

              {/* Score + sparkline */}
              <div className="flex gap-3 mb-5">
                <div className="bg-blue-50 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center w-24 sm:w-28 flex-shrink-0">
                  <p className="font-extrabold text-gray-900 text-2xl sm:text-3xl leading-none">4.6</p>
                  <StarRow filled={4} />
                  <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1 text-center">Overall Rating</p>
                </div>
                <div className="flex-1">
                  <Sparkline />
                </div>
              </div>

              {/* Bars */}
              <div className="space-y-2 sm:space-y-2.5">
                {ratingBars.map((r) => (
                  <div key={r.stars} className="flex items-center gap-1.5 sm:gap-2">
                    <StarRow filled={r.stars} />
                    <span className="text-xs text-gray-500 w-8 sm:w-10 flex-shrink-0">{r.stars} Star</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 w-7 sm:w-8 text-right flex-shrink-0">
                      {r.pct >= 1 ? `${r.pct}%` : '<1%'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>

        <InstructorFooter />
      </div>
    </div>
  );
}