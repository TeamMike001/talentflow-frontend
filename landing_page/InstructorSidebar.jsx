'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  MessageCircle,
  Headphones,
  Settings,
  LogOut,
} from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { label: 'Dashboard',        href: '/instructor/dashboard',   icon: LayoutDashboard },
  { label: 'Create New Course', href: '/instructor/create-course', icon: PlusCircle },
  { label: 'My Courses',       href: '/instructor/InstructorMyCourses',  icon: BookOpen },
  { label: 'Message',          href: '/instructor/InstructorMessage',     icon: MessageCircle,  badge: 3 },
];

const toolItems = [
  { label: 'Support',  href: '/instructor/support',  icon: Headphones },
  { label: 'Settings', href: '/instructor/InstructorSettings', icon: Settings },
];

export default function InstructorSidebar() {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <aside className="fixed top-0 left-0 h-screen w-56 bg-white border-r border-gray-100 flex flex-col z-50">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
          {/* cap icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
          </svg>
        </div>
        <span className="font-extrabold text-gray-900 text-base leading-none">
          Learn<span className="text-primary">X</span>
        </span>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-0.5">
          {navItems.map(({ label, href, icon: Icon, badge }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive(href)
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon size={17} className="flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${isActive(href) ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                    {badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Tools section */}
        <div className="mt-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Tools</p>
          <ul className="space-y-0.5">
            {toolItems.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive(href)
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon size={17} className="flex-shrink-0" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Sign out */}
      <div className="px-3 pb-5 border-t border-gray-100 pt-3">
        <Link
          href="/home"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all"
        >
          <LogOut size={17} />
          Sign-out
        </Link>
      </div>
    </aside>
  );
}