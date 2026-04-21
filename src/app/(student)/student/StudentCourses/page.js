'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';

import Link from 'next/link';
import { BookOpen, CheckCircle, RotateCcw, ChevronRight, Award, Star } from 'lucide-react';

/* ── Data ──────────────────────────────────────────── */
const stats = [
  { icon: BookOpen,     label: 'Total Course Enrolled', value: 8,  color: 'text-gray-400', border: 'border-gray-200' },
  { icon: CheckCircle,  label: 'Courses Completed',     value: 3,  color: 'text-green-500', border: 'border-green-100' },
  { icon: RotateCcw,    label: 'Ongoing Courses',       value: 5,  color: 'text-blue-500',  border: 'border-blue-100' },
];

const courseProgress = [
  { id: 1, title: 'UI/UX Design',           progress: 75, color: 'bg-primary',   status: 'continue', icon: '📘' },
  { id: 2, title: 'Frontend Fundamentals',  progress: 35, color: 'bg-green-500', status: 'continue', icon: '🔄' },
  { id: 3, title: 'Database Management',    progress: 100,color: 'bg-green-500', status: 'completed',icon: '✅' },
  { id: 4, title: 'Digital Marketing',      progress: 50, color: 'bg-yellow-400',status: 'continue', icon: '✅' },
];

const achievements = [
  { icon: CheckCircle, color: 'text-green-500', title: 'UI Basics Completed', desc: 'Completed UI/UX Design course' },
  { icon: Star,        color: 'text-yellow-500', title: '50 Lessons Completed', desc: 'You have completed 50 lessons.' },
];

const recentCourses = [
  { id: 1, title: 'UI/UX Design', progress: 25, total: 100, image: '📐' },
];

/* ── Circular progress ─────────────────────────────── */
function CircularProgress({ value }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg width="144" height="144" className="-rotate-90">
        <circle cx="72" cy="72" r={r} strokeWidth="10" stroke="#E5E7EB" fill="none" />
        <circle
          cx="72" cy="72" r={r}
          strokeWidth="10"
          stroke="#10B981"
          fill="none"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-extrabold text-gray-900">{value}%</p>
        <p className="text-xs text-gray-400 font-medium">Completed</p>
      </div>
    </div>
  );
}

export default function StudentCoursesPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col">
        <StudentNavbar onMenuClick={() => setIsOpen(true)} />

        <main className="flex-1 p-4 lg:p-6 space-y-6">

          {/* ── Stats row ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map(({ icon: Icon, label, value, color, border }) => (
              <div key={label} className={`bg-white rounded-2xl border ${border} p-5 flex items-center gap-4 shadow-sm`}>
                <Icon size={28} className={color} />
                <div>
                  <p className="text-gray-400 text-xs font-medium">{label}</p>
                  <p className="text-3xl font-extrabold text-gray-900 leading-tight">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Main grid ── */}
          <div className="grid lg:grid-cols-3 gap-5">

            {/* Left: Course Progress + Recent */}
            <div className="lg:col-span-2 space-y-5">

              {/* Course Progress */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-extrabold text-gray-900 text-base mb-5">Your Course Progress</h2>
                <div className="space-y-4">
                  {courseProgress.map(c => (
                    <div key={c.id} className="flex items-center gap-4">
                      {/* Icon */}
                      <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-base flex-shrink-0">
                        {c.status === 'completed' ? (
                          <CheckCircle size={18} className="text-green-500" />
                        ) : c.progress < 50 ? (
                          <RotateCcw size={18} className="text-gray-400" />
                        ) : (
                          <BookOpen size={18} className="text-primary" />
                        )}
                      </div>

                      {/* Bar */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm mb-1.5 truncate">{c.title}</p>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${c.color} rounded-full transition-all`}
                            style={{ width: `${c.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Button */}
                      {c.status === 'completed' ? (
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg whitespace-nowrap">
                          Completed
                        </span>
                      ) : (
                        <Link
                          href={`/learn/${c.id}`}
                          className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap"
                        >
                          Continue
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Courses */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-extrabold text-gray-900 text-base mb-4">Recent Courses</h2>
                <div className="space-y-3">
                  {recentCourses.map(c => (
                    <Link
                      key={c.id}
                      href={`/courses/${c.id}`}
                      className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-primary/30 transition-all group"
                    >
                      <div className="w-12 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen size={18} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{c.title}</p>
                        <div className="h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden w-32">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${(c.progress / c.total) * 100}%` }} />
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs text-gray-500">{c.progress}/{c.total}</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-primary flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Progress circle + Achievements */}
            <div className="space-y-5">
              {/* Circular progress */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-center">
                <CircularProgress value={75} />
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-extrabold text-gray-900 text-base mb-4">Achievments</h2>
                <div className="space-y-4">
                  {achievements.map(a => (
                    <div key={a.title} className="flex items-start gap-3">
                      <a.icon size={18} className={`${a.color} flex-shrink-0 mt-0.5`} />
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{a.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{a.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/student/certifications"
                  className="flex items-center gap-1 text-yellow-500 text-xs font-semibold mt-4 hover:underline"
                >
                  View All <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400 mt-auto">
          <span>© 2026 Team Mike – UI/UX. All rights reserved.</span>
          <div className="flex gap-5">
            {['FAQs', 'Privacy Policy', 'Terms & Condition'].map(l => (
              <button key={l} className="hover:text-primary transition-colors">{l}</button>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
