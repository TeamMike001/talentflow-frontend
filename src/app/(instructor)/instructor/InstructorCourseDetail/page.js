'use client';

import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import Link from 'next/link';
import { useState } from 'react';
import {
  Play, MessageSquare, Users, BookOpen, Globe, Paperclip, Clock, Trophy,
  Star, ChevronRight, ChevronDown,
} from 'lucide-react';

// ── Course stat tiles ────────────────────────────────────────────────────────
const courseStats = [
  { icon: <Play size={20} className="text-orange-400" />,       iconBg: 'bg-orange-50',  value: '1,957',    label: 'Lecture (219.3 GB)' },
  { icon: <MessageSquare size={20} className="text-purple-400" />, iconBg: 'bg-purple-50', value: '432',      label: 'Total Commends' },
  { icon: <Users size={20} className="text-red-400" />,         iconBg: 'bg-red-50',     value: '523',      label: 'Students enrolled' },
  { icon: <BookOpen size={20} className="text-green-500" />,    iconBg: 'bg-green-50',   value: 'Beginner', label: 'Course level' },
  { icon: <Globe size={20} className="text-gray-500" />,        iconBg: 'bg-gray-100',   value: 'English',  label: 'Course Language' },
  { icon: <Paperclip size={20} className="text-orange-400" />,  iconBg: 'bg-orange-50',  value: '23',       label: 'Attach File (4.4 GB)' },
  { icon: <Clock size={20} className="text-purple-400" />,      iconBg: 'bg-purple-50',  value: '19:37:51', label: 'Hours' },
  { icon: <Trophy size={20} className="text-gray-500" />,       iconBg: 'bg-gray-100',   value: '504',      label: 'Students viewed' },
];

// ── Rating data ──────────────────────────────────────────────────────────────
const ratingBars = [
  { stars: 5, pct: 56 },
  { stars: 4, pct: 37 },
  { stars: 3, pct: 8 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0.5 },
];

function StarRow({ filled }) {
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
      />
    </svg>
  );
}

export default function InstructorCourseDetail() {
  const [ratingFilter, setRatingFilter] = useState('This week');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar />

      <div className="flex-1 ml-56 flex flex-col min-h-screen">
        <InstructorNavbar greeting="Good Morning" title="My Courses" />

        <main className="flex-1 p-6 space-y-5">

          {/* ── Breadcrumb ── */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
            {['Course', 'My Courses', 'Development', 'Web Development'].map((crumb) => (
              <span key={crumb} className="flex items-center gap-1.5">
                <Link href="#" className="hover:text-primary transition-colors">{crumb}</Link>
                <ChevronRight size={11} />
              </span>
            ))}
            <span className="text-gray-600 font-medium">2021 Complete Python Bootcamp From Zero to Hero in Python</span>
          </nav>

          {/* ── Course Hero Card ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-6">
            {/* Thumbnail */}
            <div className="w-60 h-40 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80"
                alt="Course"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2 text-xs text-gray-400">
                <span>Uploaded: <span className="text-gray-600 font-medium">Jan 21, 2025</span></span>
                <span>Last Updated: <span className="text-primary font-medium">Mar 11, 2026</span></span>
              </div>
              <h1 className="font-extrabold text-gray-900 text-xl leading-snug mb-2">
                2026 Complete Python Bootcamp From Zero to Hero in Python
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                3 in 1 Course: Learn to design websites with Figma, build with Webflow, and make a living freelancing.
              </p>

              {/* Instructors + rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    <img src="https://randomuser.me/api/portraits/men/44.jpg" className="w-7 h-7 rounded-full border-2 border-white" alt="" />
                    <img src="https://randomuser.me/api/portraits/women/45.jpg" className="w-7 h-7 rounded-full border-2 border-white -ml-2" alt="" />
                  </div>
                  <span className="text-xs text-gray-500">
                    Created by: <span className="font-semibold text-gray-700">Kevin Gilbert • Kristin Watson</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => <Star key={s} size={14} className="fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <span className="font-bold text-gray-900 text-sm">4.8</span>
                  <span className="text-xs text-gray-400">(451 Rating)</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stats + Rating Grid ── */}
          <div className="grid lg:grid-cols-3 gap-5 items-start">

            {/* 2x4 stat tiles */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {courseStats.map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                  <div className={`w-11 h-11 ${s.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="font-extrabold text-gray-900 text-lg leading-none">{s.value}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Overall Rating card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 text-sm">Overall Course Rating</h2>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors">
                  {ratingFilter} <ChevronDown size={13} />
                </button>
              </div>

              {/* Score + sparkline */}
              <div className="flex gap-3 mb-5">
                <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center justify-center w-28 flex-shrink-0">
                  <p className="font-extrabold text-gray-900 text-3xl leading-none">4.6</p>
                  <StarRow filled={4} />
                  <p className="text-[11px] text-gray-500 mt-1">Overall Rating</p>
                </div>
                <div className="flex-1">
                  <Sparkline />
                </div>
              </div>

              {/* Bars */}
              <div className="space-y-2.5">
                {ratingBars.map((r) => (
                  <div key={r.stars} className="flex items-center gap-2">
                    <StarRow filled={r.stars} />
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