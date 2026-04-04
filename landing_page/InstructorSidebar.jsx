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
  X,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard',         href: '/instructor/dashboard',           icon: LayoutDashboard },
  { label: 'Create New Course', href: '/instructor/createcourse',        icon: PlusCircle },
  { label: 'My Courses',        href: '/instructor/InstructorMyCourses', icon: BookOpen },
  { label: 'Message',           href: '/instructor/InstructorMessage',   icon: MessageCircle, badge: 3 },
];

const toolItems = [
  { label: 'Support',  href: '/instructor/support',            icon: Headphones },
  { label: 'Settings', href: '/instructor/InstructorSettings', icon: Settings },
];

export default function InstructorSidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="p-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2 justify-center flex-1">
          <img src="/images/logo.png" alt="Logo" className="w-20 h-auto" />
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-0.5">
          {navItems.map(({ label, href, icon: Icon, badge }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive(href)
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon size={17} className="flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                    isActive(href) ? 'bg-white text-primary' : 'bg-primary text-white'
                  }`}>
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
                  onClick={onClose}
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
    </>
  );

  return (
    <>
      {/* ── Desktop sidebar (lg+): always visible ── */}
      <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-gray-100 h-screen fixed left-0 top-0 z-30">
        <NavContent />
      </aside>

      {/* ── Mobile / tablet drawer (below lg) ── */}
      <div className="lg:hidden">
        {/* Backdrop — fades in when open */}
        <div
          onClick={onClose}
          aria-hidden="true"
          className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Drawer panel — slides in from the left */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 max-w-[80vw] bg-white shadow-2xl z-50 flex flex-col
            transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <NavContent />
        </aside>
      </div>
    </>
  );
}