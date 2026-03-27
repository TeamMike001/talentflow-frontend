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
  { icon: <Play size={20} className="text-blue-500" />,   iconBg: 'bg-blue-50',   value: '20',  label: 'Enrolled Courses' },
  { icon: <Monitor size={20} className="text-purple-500" />, iconBg: 'bg-purple-50', value: '9',   label: 'Active Courses' },
  { icon: <Users size={20} className="text-blue-400" />,  iconBg: 'bg-blue-50',   value: '12',  label: 'Course Instructors' },
  { icon: <Trophy size={20} className="text-green-500" />, iconBg: 'bg-green-50',  value: '15',  label: 'Completed Courses' },
  { icon: <Users size={20} className="text-blue-400" />,  iconBg: 'bg-blue-50',   value: '523', label: 'Students' },
  { icon: <BookOpen size={20} className="text-green-500" />, iconBg: 'bg-green-50', value: '3',   label: 'Online Courses' },
];

// ── Activity feed ────────────────────────────────────────────────────────────
const activities = [
  { avatar: 'https://randomuser.me/api/portraits/men/10.jpg', avatarBg: 'bg-blue-500', text: <><strong>Kevin</strong> comments on your lecture &quot;What is ux&quot; in &quot;2026 ui/ux design with figma&quot;</>, time: 'Just now' },
  { avatar: 'https://randomuser.me/api/portraits/men/11.jpg', avatarBg: 'bg-yellow-400', text: <><strong>John</strong> give a 5 star rating on your course &quot;2026 ui/ux design with figma&quot;</>, time: '5 mins ago' },
  { avatar: 'https://randomuser.me/api/portraits/women/12.jpg', avatarBg: 'bg-blue-500', text: <><strong>Sraboni</strong> purchase your course &quot;2026 ui/ux design with figma&quot;</>, time: '6 mins ago' },
  { avatar: 'https://randomuser.me/api/portraits/men/13.jpg', avatarBg: 'bg-yellow-400', text: <><strong>Monir</strong> give a 5 star rating on your course &quot;2026 ui/ux design with figma&quot;</>, time: '8 mins ago' },
];

// ── Rating data ──────────────────────────────────────────────────────────────
const ratingBars = [
  { stars: 5, pct: 56 },
  { stars: 4, pct: 37 },
  { stars: 3, pct: 8 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0.5 },
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

// Simple SVG sparkline
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
  const [activityFilter, setActivityFilter] = useState('Today');
  const [ratingFilter, setRatingFilter] = useState('This week');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar />

      <div className="flex-1 ml-56 flex flex-col min-h-screen">
        <InstructorNavbar greeting="Good Morning" title="Dashboard" />

        <main className="flex-1 p-6 space-y-5">

          {/* ── Stats Grid ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.slice(0, 4).map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                <div className={`w-11 h-11 ${s.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  {s.icon}
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-xl leading-none">{s.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* second row — 2 cards only */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.slice(4).map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                <div className={`w-11 h-11 ${s.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  {s.icon}
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-xl leading-none">{s.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Profile Completion Banner ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex items-center gap-5">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Jese Leos"
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-sm">Jese Leos</p>
              <p className="text-gray-400 text-xs">Jese.leos@gmail.com</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-xs text-gray-400 whitespace-nowrap">1/4 Steps</span>
              <div className="w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 rounded-full" style={{ width: '25%' }} />
              </div>
              <span className="text-xs text-gray-600 font-semibold whitespace-nowrap">25% Completed</span>
            </div>
            <button className="flex items-center gap-2 bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-primary-dark transition-all flex-shrink-0">
              <Edit size={13} />
              Edit Biography
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all flex-shrink-0">
              <ArrowDown size={15} />
            </button>
          </div>

          {/* ── Bottom Row: Activity + Rating ── */}
          <div className="grid lg:grid-cols-2 gap-5">

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
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
                    <div className="flex-1">
                      <p className="text-xs text-gray-700 leading-relaxed">{a.text}</p>
                      <p className="text-[11px] text-gray-400 mt-1">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Course Rating */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 text-sm">Overall Course Rating</h2>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors">
                  {ratingFilter} <ChevronDown size={13} />
                </button>
              </div>

              {/* Rating summary + sparkline */}
              <div className="flex gap-3 mb-5">
                <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center justify-center w-32 flex-shrink-0">
                  <p className="font-extrabold text-gray-900 text-3xl leading-none">4.6</p>
                  <StarRow count={5} filled={4} />
                  <p className="text-[11px] text-gray-500 mt-1">Overall Rating</p>
                </div>
                <div className="flex-1">
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