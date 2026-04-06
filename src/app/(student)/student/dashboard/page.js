'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import Link from 'next/link';
import { BookOpen, BookMarked, Star, Users, Menu } from 'lucide-react';

const enrolledCourses = [
  { name: 'Foundations of User-Centered Design', instructor: 'Maya Okoro', avatar: 'https://randomuser.me/api/portraits/women/20.jpg', progress: 80, nextAssignment: 'April 7th, 2026, 11:59 PM' },
  { name: 'Wireframing & Prototyping in Figma', instructor: 'Daniel Umeh', avatar: 'https://randomuser.me/api/portraits/men/21.jpg', progress: 60, nextAssignment: 'April 7th, 2026, 11:59 PM' },
  { name: 'Interaction Design and Micro-Animations', instructor: 'Aisha Bello', avatar: 'https://randomuser.me/api/portraits/women/22.jpg', progress: 20, nextAssignment: 'April 14th, 2026, 11:59 PM' },
  { name: 'Usability Testing: From Plan to Insights', instructor: 'Kwame Mensah', avatar: 'https://randomuser.me/api/portraits/men/23.jpg', progress: 40, nextAssignment: 'April 14th, 2026, 11:59 PM' },
  { name: 'Design Systems and Component Thinking', instructor: 'Linda Eze', avatar: 'https://randomuser.me/api/portraits/women/24.jpg', progress: 50, nextAssignment: 'April 21st, 2026, 11:59 PM' },
  { name: 'Accessibility for Digital Products', instructor: 'Rafael Costa', avatar: 'https://randomuser.me/api/portraits/men/25.jpg', progress: 95, nextAssignment: 'April 21st, 2026, 11:59 PM' },
];

const stats = [
  { icon: BookOpen,   value: '24', label: 'Courses Enrolled',        color: 'bg-blue-500' },
  { icon: BookMarked, value: '56', label: 'Lessons Contained',       color: 'bg-green-500' },
  { icon: Star,       value: '12', label: 'Reviews Earned',          color: 'bg-yellow-500' },
  { icon: Users,      value: '15', label: 'Workshops Involvement',   color: 'bg-purple-500' },
];

const recommended = [
  { id: 1, title: 'Foundations of User Centered Design',      desc: 'Learn how to put users first-research basics, personas, and journey mapping.',           tags: ['Beginner', 'Live Class'],    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80' },
  { id: 2, title: 'Wireframing & Prototyping in Figma',       desc: 'Hands-on practice with Figma: turn ideas into clickable prototypes and test flows.',       tags: ['Beginner', 'Self Paced'],    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80' },
  { id: 3, title: 'Usability Testing: From Plan to Insights', desc: 'Design, run, and analyze usability tests that reveal real pain points.',                    tags: ['Intermediate', 'Live Class'], image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80' },
  { id: 4, title: 'Design Systems and Component Thinking',    desc: 'Build scalable UI with reusable components, tokens, and guidelines.',                       tags: ['Advanced', 'Self Paced'],    image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&q=80' },
];

function ProgressBar({ value }) {
  return (
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar — receives isOpen + onClose so mobile toggle works */}
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        {/* Navbar — receives onMenuClick to open the sidebar */}
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 space-y-5 sm:space-y-6">

          {/* ── Course table + stats ── */}
          <div className="grid lg:grid-cols-4 gap-5 sm:gap-6">

            {/* Table */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-4 sm:px-6 py-4 font-bold text-primary text-sm whitespace-nowrap">Course Name</th>
                      <th className="text-left px-4 py-4 font-bold text-primary text-sm whitespace-nowrap">Instructor</th>
                      <th className="text-left px-4 py-4 font-bold text-primary text-sm whitespace-nowrap">Progress</th>
                      <th className="text-left px-4 py-4 font-bold text-primary text-sm whitespace-nowrap">Next Assignment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrolledCourses.map((c, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 sm:px-6 py-3.5 text-gray-700 font-medium text-xs max-w-[180px] sm:max-w-xs">{c.name}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <img src={c.avatar} alt={c.instructor} className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
                            <span className="text-gray-600 text-xs whitespace-nowrap">{c.instructor}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 w-28 sm:w-32"><ProgressBar value={c.progress} /></td>
                        <td className="px-4 py-3.5 text-gray-500 text-xs whitespace-nowrap">{c.nextAssignment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
              {stats.map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                  <div className={`w-9 h-9 sm:w-11 sm:h-11 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-extrabold text-gray-900 text-lg sm:text-xl leading-none">{value}</p>
                    <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 leading-snug">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Recommended Courses ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <div className="flex items-start justify-between mb-1">
              <h2 className="font-extrabold text-primary text-base">Recommended Courses</h2>
              <button className="px-3 sm:px-4 py-2 bg-primary/10 text-primary text-xs font-semibold rounded-xl hover:bg-primary hover:text-white transition-all">
                View all
              </button>
            </div>
            <p className="text-gray-400 text-xs mb-4 sm:mb-5">
              Based on your learning activity, we&apos;ve curated a personalized course just for you.
            </p>
            {/* 1 col → 2 col (sm) → 4 col (lg) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {recommended.map(course => (
                <div key={course.id} className="group">
                  <div className="h-32 sm:h-36 rounded-xl overflow-hidden mb-3 bg-gray-100">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5 leading-snug group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-3">{course.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {course.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">{tag}</span>
                    ))}
                  </div>
                  <Link href={`/courses/${course.id}`} className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-dark transition-all text-center block">
                    Enroll now
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}