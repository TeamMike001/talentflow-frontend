'use client';

import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { useState } from 'react';
import {
  Play, Monitor, Users, Trophy, BookOpen, ChevronDown, Star, Edit, ArrowDown,
} from 'lucide-react';

// ── Stat cards data ──────────────────────────────────────────────────────────
const stats = [
  { icon: <Play    size={20} className="text-blue-500"   />, iconBg: 'bg-blue-50',   value: '20',  label: 'Enrolled Courses'  },
  { icon: <Monitor size={20} className="text-purple-500" />, iconBg: 'bg-purple-50', value: '9',   label: 'Active Courses'    },
  { icon: <Users   size={20} className="text-blue-400"   />, iconBg: 'bg-blue-50',   value: '12',  label: 'Course Instructors'},
  { icon: <Trophy  size={20} className="text-green-500"  />, iconBg: 'bg-green-50',  value: '15',  label: 'Completed Courses' },
  { icon: <Users   size={20} className="text-blue-400"   />, iconBg: 'bg-blue-50',   value: '523', label: 'Students'          },
  { icon: <BookOpen size={20} className="text-green-500" />, iconBg: 'bg-green-50',  value: '3',   label: 'Online Courses'    },
];

// ── Activity feed ────────────────────────────────────────────────────────────
const activities = [
  { avatar: 'https://randomuser.me/api/portraits/men/10.jpg',   text: <><strong>Kevin</strong> comments on your lecture &quot;What is ux&quot; in &quot;2026 ui/ux design with figma&quot;</>,   time: 'Just now'   },
  { avatar: 'https://randomuser.me/api/portraits/men/11.jpg',   text: <><strong>John</strong> give a 5 star rating on your course &quot;2026 ui/ux design with figma&quot;</>,                  time: '5 mins ago' },
  { avatar: 'https://randomuser.me/api/portraits/women/12.jpg', text: <><strong>Sraboni</strong> purchase your course &quot;2026 ui/ux design with figma&quot;</>,                               time: '6 mins ago' },
  { avatar: 'https://randomuser.me/api/portraits/men/13.jpg',   text: <><strong>Monir</strong> give a 5 star rating on your course &quot;2026 ui/ux design with figma&quot;</>,                  time: '8 mins ago' },
];

// ── Rating data ──────────────────────────────────────────────────────────────
const ratingBars = [
  { stars: 5, pct: 56   },
  { stars: 4, pct: 37   },
  { stars: 3, pct: 8    },
  { stars: 2, pct: 1    },
  { stars: 1, pct: 0.5  },
];

function StarRow({ count, filled }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < filled ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}
        />
      ))}
    </div>
  );
}

function Sparkline() {
  return (
    <svg viewBox="0 0 200 60" className="w-full h-14" fill="none">
      <polyline
        points="0,45 25,35 50,42 75,25 100,38 125,20 150,32 175,15 200,28"
        stroke="#3B82F6"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function InstructorDashboard() {
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [activityFilter, setActivityFilter] = useState('Today');
  const [ratingFilter,   setRatingFilter]   = useState('This week');

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar receives open state + close handler */}
      <InstructorSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content — offset by sidebar width only on lg+ */}
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">

        {/* Navbar receives hamburger click handler */}
        <InstructorNavbar
          greeting="Good Morning"
          title="Dashboard"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-6 space-y-4 sm:space-y-5">

          {/* ── Stats Grid — 1 col / 2 col / 4 col ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
                <div className={`w-10 h-10 sm:w-11 sm:h-11 ${s.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  {s.icon}
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-lg sm:text-xl leading-none">{s.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Profile Completion Banner ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-wrap">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Jese Leos"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-sm">Jese Leos</p>
              <p className="text-gray-400 text-xs">Jese.leos@gmail.com</p>
            </div>

            {/* Progress — full width on mobile, inline on sm+ */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-shrink-0">
              <span className="text-xs text-gray-400 whitespace-nowrap">1/4 Steps</span>
              <div className="flex-1 sm:w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 rounded-full" style={{ width: '25%' }} />
              </div>
              <span className="text-xs text-gray-600 font-semibold whitespace-nowrap">25% Completed</span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button className="flex items-center gap-2 bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-primary-dark transition-all flex-1 sm:flex-none justify-center">
                <Edit size={13} />
                Edit Biography
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all flex-shrink-0">
                <ArrowDown size={15} />
              </button>
            </div>
          </div>

          {/* ── Bottom Row: Activity + Rating ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 text-sm">Recent Activity</h2>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors">
                  {activityFilter} <ChevronDown size={13} />
                </button>
              </div>
              <div className="space-y-4">
                {activities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <img
                      src={a.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-700 leading-relaxed">{a.text}</p>
                      <p className="text-[11px] text-gray-400 mt-1">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Course Rating */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 text-sm">Overall Course Rating</h2>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors">
                  {ratingFilter} <ChevronDown size={13} />
                </button>
              </div>

              {/* Rating summary + sparkline */}
              <div className="flex gap-3 mb-5">
                <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center justify-center w-28 sm:w-32 flex-shrink-0">
                  <p className="font-extrabold text-gray-900 text-3xl leading-none">4.6</p>
                  <StarRow count={5} filled={4} />
                  <p className="text-[11px] text-gray-500 mt-1">Overall Rating</p>
                </div>
                <div className="flex-1 min-w-0">
                  <Sparkline />
                </div>
              </div>

              {/* Rating bars */}
              <div className="space-y-2">
                {ratingBars.map((r) => (
                  <div key={r.stars} className="flex items-center gap-2">
                    <StarRow count={5} filled={r.stars} />
                    <span className="text-xs text-gray-500 w-10 flex-shrink-0">{r.stars} Star</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right flex-shrink-0">
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