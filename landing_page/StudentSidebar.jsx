'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home, User, BookOpen, Bookmark, Award,
  ClipboardList, Headphones, Users, Settings, LogOut, X,
} from 'lucide-react';

const navItems = [
  { icon: Home,          label: 'Home',           href: '/student/dashboard' },
  { icon: User,          label: 'Profile',         href: '/student/StudentProfile' },
  { icon: BookOpen,      label: 'Courses',         href: '/student/courses' },
  { icon: Bookmark,      label: 'Bookmarks',       href: '/student/bookmarks' },
  { icon: Award,         label: 'Certifications',  href: '/student/certifications' },
  { icon: ClipboardList, label: 'Assignment',      href: '/student/assignment' },
  { icon: Headphones,    label: 'Events',          href: '/student/events' },
  { icon: Users,         label: 'Community',       href: '/student/community' },
];

const toolItems = [
  { icon: Headphones, label: 'Support',  href: '/student/support' },
  { icon: Settings,   label: 'Settings', href: '/student/settings' },
];

// ─── Shared inner content ────────────────────────────────────────────────────
function SidebarContent({ onClose }) {
  const pathname = usePathname();
  const router   = useRouter();

  const handleLogout = () => {
    router.push('/home');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo + optional close button (mobile only) */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <img src="/images/logo.png" alt="Logo" className="w-20 h-auto" />
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-lg hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Scrollable nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-gray-400 text-xs font-semibold px-3 mb-2 uppercase tracking-wider">
          Main Page
        </p>
        <ul className="space-y-1 mb-6">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <li key={label}>
                <Link
                  href={href}
                  onClick={onClose}           // close drawer on navigation (mobile)
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
            );
          })}
        </ul>

        <p className="text-gray-400 text-xs font-semibold px-3 mb-2 uppercase tracking-wider">
          Tools
        </p>
        <ul className="space-y-1">
          {toolItems.map(({ icon: Icon, label, href }) => {
            const active = pathname === href;
            return (
              <li key={label}>
                <Link
                  href={href}
                  onClick={onClose}
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
            );
          })}
        </ul>
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/men/30.jpg"
            alt="User"
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-sm truncate">Titus Williams</p>
            <p className="text-gray-400 text-xs truncate">UI/UX Designer</p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function StudentSidebar({ isOpen, onClose }) {
  return (
    <>
      {/* ── Desktop: always-visible fixed sidebar ── */}
      <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-gray-100 h-screen fixed left-0 top-0 z-30">
        <SidebarContent />
      </aside>

      {/* ── Mobile: backdrop + slide-in drawer ── */}
      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`lg:hidden fixed left-0 top-0 h-screen w-64 bg-white z-50 shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <SidebarContent onClose={onClose} />
      </aside>
    </>
  );
}