'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import Link from 'next/link';
import { BookOpen, Award, Calendar, Clock, TrendingUp } from 'lucide-react';

<<<<<<< HEAD
<<<<<<< HEAD
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
=======
// ── Learning History data ─────────────────────────────────────────────────────
const learningHistory = [
  { id: 1, title: 'Introduction to UIUX',    hours: '10hrs', date: 'November 20, 2025', done: 100, status: 'Completed' },
  { id: 2, title: 'Frontend Fundamentals',   hours: '15hrs', date: 'February 20, 2026', done: 100, status: 'Completed' },
  { id: 3, title: 'Database Management',     hours: '20hrs', date: 'April 18, 2026',    done: 100, status: 'Completed' },
];
>>>>>>> parent of 4d42df6 (Complete course)

// ── Certificates earned ───────────────────────────────────────────────────────
const certificates = [
  { id: 1, emoji: '🏆', bg: 'bg-yellow-50', title: 'UIUX Beginners Certificate',      issued: 'November 20, 2025' },
  { id: 2, emoji: '⭐', bg: 'bg-yellow-50', title: 'Frontend Developer Certificate',  issued: 'February 20, 2026' },
  { id: 3, emoji: '📜', bg: 'bg-orange-50', title: 'Database Management',             issued: 'April 18, 2026'    },
  { id: 4, emoji: '💎', bg: 'bg-blue-50',   title: 'Digital Marketing Certificate',   issued: 'April 20, 2026'    },
];
<<<<<<< HEAD
=======
// ── Progress bar component ────────────────────────────────────────────────────
=======

// ── Progress bar ──────────────────────────────────────────────────────────────
>>>>>>> parent of 4d42df6 (Complete course)
function ProgressBar({ value, color = 'bg-primary' }) {
  return (
<<<<<<< HEAD
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-500">Progress</span>
        <span className="font-medium text-gray-700">{Math.round(value)}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getProgressColor(value)} rounded-full transition-all duration-500 ease-out`} 
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
>>>>>>> parent of dea0596 (commit change)

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ value, color = 'bg-primary' }) {
  return (
=======
>>>>>>> parent of 4d42df6 (Complete course)
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${value}%` }} />
    </div>
  );
}

export default function StudentProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar — wired up with isOpen + onClose for mobile toggle */}
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col">
        {/* Navbar — wired up with onMenuClick to open sidebar */}
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 space-y-5">

          {/* ── Top section: Profile Card + Learning History ── */}
          <div className="grid lg:grid-cols-5 gap-5 items-start">

            {/* ── Student Profile Card ── */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center">
              <h2 className="font-extrabold text-gray-900 text-base mb-5">Student Profile</h2>

              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 mb-4 bg-gray-200">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Titus Williams"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-extrabold text-gray-900 text-lg">
                Titus <span className="text-primary">Williams</span>
              </h3>
              <p className="text-gray-400 text-xs mb-5">Student ID : #ASD 237897892</p>

              <div className="w-full space-y-3 mb-5">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <BookOpen size={16} className="text-primary flex-shrink-0" />
                  <span>3 Courses enrolled</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Award size={16} className="text-primary flex-shrink-0" />
                  <span>4 Certificate Earn</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar size={16} className="text-primary flex-shrink-0" />
                  <span>Joined November 2025</span>
                </div>
              </div>

              <div className="w-full border-t border-gray-100 my-4" />

              <div className="w-full bg-blue-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 font-medium">Overall Progress</span>
                  <span className="text-xs text-primary font-bold">80%</span>
                </div>
                <ProgressBar value={80} />
              </div>

              <div className="w-full border-t border-gray-100 my-4" />

              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Award size={16} className="text-gray-400" />
                <span>Certificate Earn</span>
              </div>
            </div>

            {/* ── Learning History ── */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp size={16} className="text-gray-700" />
                <h2 className="font-extrabold text-gray-900 text-base">Learning History</h2>
              </div>

              <div className="space-y-4">
                {learningHistory.map((item) => (
                  <div key={item.id} className="border border-gray-100 rounded-2xl p-5 hover:border-primary/30 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                      <span className="bg-yellow-400 text-white text-[11px] font-bold px-3 py-1 rounded-full flex-shrink-0 ml-3">
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1.5"><Clock size={12} />{item.hours}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={12} />{item.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                      <span>Done</span>
                      <span className="font-bold text-gray-700">{item.done}%</span>
                    </div>
                    <ProgressBar value={item.done} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Certificates Earned Grid ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
              >
                <div className={`w-12 h-12 ${cert.bg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                  {cert.emoji}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2 leading-snug">{cert.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">Issued : {cert.issued}</p>
              </div>
            ))}
          </div>

        </main>

        {/* Footer */}
        <footer className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white text-xs text-gray-400 mt-auto flex-wrap gap-3">
          <span>© 2026 Team Mike – UI/UX. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link href="/faqs"    className="hover:text-primary transition-colors">FAQs</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-primary transition-colors">Terms & Condition</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}