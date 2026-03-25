'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home, User, BookOpen, Bookmark, Award,
  ClipboardList, Headphones, Users, Settings, LogOut,
} from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', href: '/student/dashboard' },
  { icon: User, label: 'Profile', href: '/student/profile' },
  { icon: BookOpen, label: 'Courses', href: '/student/courses' },
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

export default function StudentSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push('/home');
  };

  return (
    <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-gray-100 h-screen fixed left-0 top-0 z-30">
      
      {/* Logo */}
      <div className="p-5 border-b border-gray-100 flex items-center gap-2">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-20 h-auto"
        />
      </div>

      {/* Scrollable Content */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        
        {/* Main */}
        <p className="text-gray-400 text-xs font-semibold px-3 mb-2 uppercase tracking-wider">
          Main Page
        </p>
        <ul className="space-y-1 mb-6">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active =
              pathname === href || pathname.startsWith(href + '/');

            return (
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
            );
          })}
        </ul>

        {/* Tools */}
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

      {/* User + Logout (Fixed bottom) */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/men/30.jpg"
            alt="User"
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-sm truncate">
              Titus Williams
            </p>
            <p className="text-gray-400 text-xs truncate">
              UI/UX Designer
            </p>
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
    </aside>
  );
}