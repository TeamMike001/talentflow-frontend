'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Home, User, BookOpen, Bookmark, Award, ClipboardList,
  Headphones, Users, Settings, LogOut, Bell, ChevronDown,
  Search, BookMarked, Star, ChevronRight
} from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', href: '/student/dashboard', active: true },
  { icon: User, label: 'Profile', href: '/student/profile' },
  { icon: BookOpen, label: 'Courses', href: '/courses' },
  { icon: Bookmark, label: 'Bookmarks', href: '/student/bookmarks' },
  { icon: Award, label: 'Certifications', href: '/student/certifications' },
  { icon: ClipboardList, label: 'Assignment', href: '/student/assignment' },
  { icon: Headphones, label: 'Events', href: '/student/events' },
  { icon: Users, label: 'Community', href: '/student/community' },
];

const toolItems = [
  { icon: Headphones, label: 'Support', href: '/student/support' },
  { icon: Settings, label: 'Settings', href: '/student/settings' },
];

const enrolledCourses = [
  { name: 'Foundations of User-Centered Design', instructor: 'Maya Okoro', avatar: 'https://randomuser.me/api/portraits/women/20.jpg', progress: 80, nextAssignment: 'April 7th, 2026, 11:59 PM' },
  { name: 'Wireframing & Prototyping in Figma', instructor: 'Daniel Umeh', avatar: 'https://randomuser.me/api/portraits/men/21.jpg', progress: 60, nextAssignment: 'April 7th, 2026, 11:59 PM' },
  { name: 'Interaction Design and Micro-Animations', instructor: 'Aisha Bello', avatar: 'https://randomuser.me/api/portraits/women/22.jpg', progress: 20, nextAssignment: 'April 14th, 2026, 11:59 PM' },
  { name: 'Usability Testing: From Plan to Insights', instructor: 'Kwame Mensah', avatar: 'https://randomuser.me/api/portraits/men/23.jpg', progress: 40, nextAssignment: 'April 14th, 2026, 11:59 PM' },
  { name: 'Design Systems and Component Thinking', instructor: 'Linda Eze', avatar: 'https://randomuser.me/api/portraits/women/24.jpg', progress: 50, nextAssignment: 'April 21st, 2026, 11:59 PM' },
  { name: 'Accessibility for Digital Products', instructor: 'Rafael Costa', avatar: 'https://randomuser.me/api/portraits/men/25.jpg', progress: 95, nextAssignment: 'April 21st, 2026, 11:59 PM' },
];

const stats = [
  { icon: BookOpen, value: '24', label: 'Courses Enrolled', color: 'bg-blue-500' },
  { icon: BookMarked, value: '56', label: 'Lessons Contained', color: 'bg-green-500' },
  { icon: Star, value: '12', label: 'Reviews Earned', color: 'bg-yellow-500' },
  { icon: Users, value: '15', label: 'Workshops Involvement', color: 'bg-purple-500' },
];

const recommended = [
  { id: 1, title: 'Foundations of User Centered Design', desc: 'Learn how to put users first-research basics, personas, and journey mapping to build products people actually want.', tags: ['Beginner', 'Live Class'], image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80' },
  { id: 2, title: 'Wireframing & Prototyping in Figma', desc: 'Hands-on practice with Figma: turn ideas into clickable prototypes and test flows before you build.', tags: ['Beginner', 'Self Paced'], image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80' },
  { id: 3, title: 'Usability Testing: From Plan to Insights', desc: 'Design, run, and analyze usability tests that reveal real pain points-then turn findings into fixes.', tags: ['Intermediate', 'Live Class'], image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80' },
  { id: 4, title: 'Design Systems and Component Thinking', desc: 'Build scalable UI with reusable components, tokens, and guidelines that keep teams in sync.', tags: ['Advanced', 'Self Paced'], image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&q=80' },
];

function ProgressBar({ value }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-gray-100 min-h-screen fixed left-0 top-0 z-30">
        {/* Logo */}
        <div className="p-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19" stroke="#2563EB" strokeWidth="2" fill="white"/>
                <path d="M20 10L32 16L20 22L8 16L20 10Z" fill="#2563EB"/>
                <path d="M12 18.5V25C12 25 15 28 20 28C25 28 28 25 28 25V18.5" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="32" y1="16" x2="32" y2="24" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="32" cy="25" r="2" fill="#F59E0B"/>
              </svg>
            </div>
            <span className="font-extrabold text-base">
              <span className="text-gray-900">Talent</span>
              <span className="text-[#F59E0B]">Flow</span>
            </span>
          </Link>
        </div>

        {/* Main nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="text-gray-400 text-xs font-semibold px-3 mb-2 uppercase tracking-wider">Main Page</p>
          <ul className="space-y-0.5 mb-6">
            {navItems.map(({ icon: Icon, label, href, active }) => (
              <li key={label}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <Icon size={17} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-gray-400 text-xs font-semibold px-3 mb-2 uppercase tracking-wider">Tools</p>
          <ul className="space-y-0.5">
            {toolItems.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Link href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-all">
                  <Icon size={17} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User at bottom */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <img src="https://randomuser.me/api/portraits/men/30.jpg" alt="User" className="w-9 h-9 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-sm truncate">Titus Williams</p>
              <p className="text-gray-400 text-xs truncate">UI/UX Designer</p>
            </div>
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 lg:ml-56 flex flex-col">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div>
            <p className="font-extrabold text-gray-900 text-base">
              Welcome back, <span className="text-primary">Titus!</span> 👋
            </p>
            <p className="text-gray-400 text-xs">Boost your tech skills now and stand out.</p>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5 w-72">
            <Search size={15} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none flex-1"
            />
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
              <Bell size={18} />
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <img src="https://randomuser.me/api/portraits/men/30.jpg" alt="User" className="w-8 h-8 rounded-full object-cover" />
              <div className="hidden sm:block">
                <p className="font-semibold text-gray-900 text-xs">Titus Williams</p>
                <p className="text-gray-400 text-xs">UI/UX Designer</p>
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 space-y-6">
          <div className="grid lg:grid-cols-4 gap-6">

            {/* Course progress table – takes 3 cols */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-6 py-4 font-bold text-primary text-sm">Course Name</th>
                      <th className="text-left px-4 py-4 font-bold text-primary text-sm">Course Instructor</th>
                      <th className="text-left px-4 py-4 font-bold text-primary text-sm">Progress</th>
                      <th className="text-left px-4 py-4 font-bold text-primary text-sm">Next Assignment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrolledCourses.map((c, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3.5 text-gray-700 font-medium text-xs max-w-xs">{c.name}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <img src={c.avatar} alt={c.instructor} className="w-6 h-6 rounded-full object-cover" />
                            <span className="text-gray-600 text-xs whitespace-nowrap">{c.instructor}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 w-32">
                          <ProgressBar value={c.progress} />
                        </td>
                        <td className="px-4 py-3.5 text-gray-500 text-xs whitespace-nowrap">{c.nextAssignment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stats – 1 col */}
            <div className="space-y-4">
              {stats.map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
                  <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-extrabold text-gray-900 text-xl leading-none">{value}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Courses */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-1">
              <h2 className="font-extrabold text-primary text-base">Recommended Courses</h2>
              <button className="px-4 py-2 bg-primary/10 text-primary text-xs font-semibold rounded-xl hover:bg-primary hover:text-white transition-all">
                View all
              </button>
            </div>
            <p className="text-gray-400 text-xs mb-5">Based on your learning activity, we&apos;ve curated a personalized course just for you.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {recommended.map(course => (
                <div key={course.id} className="group">
                  <div className="h-36 rounded-xl overflow-hidden mb-3 bg-gray-100">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5 leading-snug group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-3">{course.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {course.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">{tag}</span>
                    ))}
                  </div>
                  <Link
                    href={`/courses/${course.id}`}
                    className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-dark transition-all text-center block"
                  >
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
