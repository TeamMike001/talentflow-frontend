'use client';

import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import Link from 'next/link';
import { BookOpen, CheckCircle2, RotateCcw, ChevronRight } from 'lucide-react';

const courseProgress = [
  { id: 1, title: 'UI/UX Design', progress: 75, color: 'bg-primary', borderColor: 'border-primary/30', icon: <BookOpen size={18} className="text-primary" />, iconBg: 'bg-blue-50', status: 'continue', completed: false },
  { id: 2, title: 'Frontend Fundamentals', progress: 30, color: 'bg-green-500', borderColor: 'border-green-200', icon: <RotateCcw size={18} className="text-green-500" />, iconBg: 'bg-green-50', status: 'continue', completed: false },
  { id: 3, title: 'Database Management', progress: 100, color: 'bg-green-500', borderColor: 'border-green-200', icon: <CheckCircle2 size={18} className="text-green-500" />, iconBg: 'bg-green-50', status: 'completed', completed: true },
  { id: 4, title: 'Digital Marketing', progress: 50, color: 'bg-yellow-400', borderColor: 'border-yellow-200', icon: <CheckCircle2 size={18} className="text-blue-500" />, iconBg: 'bg-blue-50', status: 'continue', completed: false },
];

const achievements = [
  { icon: '✅', iconBg: 'bg-green-100', title: 'UI Basics Completed', desc: 'Completed UI/UX Design course' },
  { icon: '🏆', iconBg: 'bg-yellow-100', title: '50 Lessons Completed', desc: 'You have completed 50 lessons.' },
];

// Donut chart via SVG — 75% completion
function DonutChart({ percent = 75 }) {
  const r = 50;
  const circ = 2 * Math.PI * r;
  const filled = (percent / 100) * circ;
  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="-rotate-90" width="128" height="128" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={r} fill="none" stroke="#E5E7EB" strokeWidth="12" />
        <circle
          cx="64" cy="64" r={r} fill="none"
          stroke="#10B981" strokeWidth="12"
          strokeDasharray={`${filled} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-extrabold text-2xl text-green-500">{percent}%</span>
        <span className="text-xs text-gray-400">Completed</span>
      </div>
    </div>
  );
}

export default function StudentCourses() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar />

      <div className="flex-1 lg:ml-56 flex flex-col">
        <StudentNavbar />

        <main className="flex-1 p-6 space-y-5">

          {/* ── Top Stats Row ── */}
          <div className="grid grid-cols-3 gap-5">
            {[
              { icon: <BookOpen size={22} className="text-gray-400" />, label: 'Total Course Enrolled', value: '8', border: 'border-gray-200' },
              { icon: <CheckCircle2 size={22} className="text-green-500" />, label: 'Courses Completed', value: '3', border: 'border-gray-200' },
              { icon: <div className="w-5 h-5 rounded-full border-[3px] border-primary border-r-transparent animate-spin" />, label: 'Ongoing Courses', value: '5', border: 'border-gray-200' },
            ].map((stat) => (
              <div key={stat.label} className={`bg-white rounded-2xl border ${stat.border} shadow-sm p-5`}>
                <div className="flex items-center gap-3">
                  {stat.icon}
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="font-extrabold text-gray-900 text-2xl leading-none mt-0.5">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-4 gap-5 items-start">

            {/* ── Course Progress List + Recent ── */}
            <div className="lg:col-span-3 space-y-5">

              {/* Progress list */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-extrabold text-gray-900 text-base mb-5">Your Course Progress</h2>
                <div className="space-y-5">
                  {courseProgress.map((course) => (
                    <div key={course.id} className="flex items-center gap-4">
                      {/* Status icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                        course.completed ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-white'
                      }`}>
                        {course.completed
                          ? <CheckCircle2 size={18} className="text-green-500" />
                          : course.icon}
                      </div>

                      {/* Title + bar */}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm mb-2">{course.title}</p>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${course.color} rounded-full`} style={{ width: `${course.progress}%` }} />
                        </div>
                      </div>

                      {/* Action button */}
                      <button className={`text-xs font-bold px-5 py-2 rounded-xl transition-all flex-shrink-0 ${
                        course.status === 'completed'
                          ? 'bg-white border border-gray-200 text-gray-400 cursor-default'
                          : 'bg-primary text-white hover:bg-primary-dark'
                      }`}>
                        {course.status === 'completed' ? 'Completed' : 'Continue'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Courses */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-extrabold text-gray-900 text-base mb-4">Recent Courses</h2>
                <Link
                  href="/courses/1"
                  className="flex items-center gap-4 border border-gray-200 rounded-xl p-4 hover:border-primary/40 transition-all group"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm mb-2">UI/UX Design</p>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '25%' }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                    <span>25/100</span>
                    <ChevronRight size={14} className="group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              </div>

            </div>

            {/* ── Right Column: Donut + Achievements ── */}
            <div className="space-y-5">

              {/* Donut */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <DonutChart percent={75} />
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-extrabold text-gray-900 text-sm">Achievements</h2>
                  <Link href="#" className="text-xs text-primary font-semibold hover:underline flex items-center gap-0.5">
                    View All <ChevronRight size={12} />
                  </Link>
                </div>
                <div className="space-y-4">
                  {achievements.map((a) => (
                    <div key={a.title} className="flex items-start gap-3">
                      <div className={`w-9 h-9 ${a.iconBg} rounded-full flex items-center justify-center flex-shrink-0 text-base`}>
                        {a.icon}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-xs">{a.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{a.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}