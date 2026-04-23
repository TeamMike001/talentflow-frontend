'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, ChevronDown, Search, LogOut, User, Settings, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function StudentNavbar({
  title = 'Titus',
  subtitle = 'Boost your tech skills now and stand out.',
  onMenuClick,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    router.push('/home');
  };

  const notifications = [
    { id: 1, text: 'New lecture added to Figma UI UX Design', time: '2 mins ago', unread: true },
    { id: 2, text: 'Your assignment is due tomorrow', time: '1 hour ago', unread: true },
    { id: 3, text: 'Instructor replied to your comment', time: '3 hours ago', unread: false },
  ];

  return (
    <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sticky top-0 z-20">

      {/* ── Main row ── */}
      <div className="flex items-center justify-between gap-3">

        {/* Left: hamburger + welcome text */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Hamburger — hidden on lg+ where the sidebar is always visible */}
          <button
            onClick={onMenuClick}
            className="lg:hidden flex-shrink-0 p-1.5 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>

          <div className="min-w-0">
            <p className="font-extrabold text-gray-900 text-sm truncate">
              Welcome back, <span className="text-primary">{title}!</span> 👋
            </p>
            <p className="text-gray-400 text-xs truncate hidden sm:block">{subtitle}</p>
          </div>
        </div>

        {/* Center: search bar */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5 w-72 lg:w-96 flex-shrink-0">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search courses..."
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none flex-1 min-w-0"
          />
        </div>

        {/* Right: search icon (mobile), bell, user */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">

          {/* Search toggle - mobile only */}
          <button
            onClick={() => setSearchOpen(v => !v)}
            className="md:hidden p-2 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            aria-label="Toggle search"
          >
            {searchOpen ? <X size={17} /> : <Search size={17} />}
          </button>

          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setNotifOpen(!notifOpen); setDropdownOpen(false); }}
              className="relative p-2 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <p className="font-bold text-gray-900 text-sm">Notifications</p>
                  <button className="text-primary text-xs font-medium hover:underline">Mark all read</button>
                </div>
                <ul className="divide-y divide-gray-50 max-h-60 overflow-y-auto">
                  {notifications.map(n => (
                    <li key={n.id} className={`px-4 py-3 hover:bg-gray-50 transition-colors ${n.unread ? 'bg-blue-50/40' : ''}`}>
                      <p className="text-sm text-gray-700 leading-snug">{n.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-2.5 border-t border-gray-100 text-center">
                  <Link href="/student/StudentNotifications" className="text-primary text-xs font-semibold hover:underline">
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => { setDropdownOpen(!dropdownOpen); setNotifOpen(false); }}
              className="flex items-center gap-1.5 sm:gap-2 cursor-pointer hover:bg-gray-50 rounded-xl px-1.5 sm:px-2 py-1.5 transition-colors"
            >
              <img
                src="https://randomuser.me/api/portraits/men/30.jpg"
                alt="User"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              {/* Name + role — hidden on small screens */}
              <div className="hidden sm:block text-left">
                <p className="font-semibold text-gray-900 text-xs leading-none">Titus Williams</p>
                <p className="text-gray-400 text-xs mt-0.5">UI/UX Designer</p>
              </div>
              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform hidden sm:block ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden py-1">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-bold text-gray-900 text-sm">Titus Williams</p>
                  <p className="text-gray-400 text-xs">titus@example.com</p>
                </div>
                <Link href="/student/StudentProfile" onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">
                  <User size={15} /> My Profile
                </Link>
                <Link href="/student/settings" onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">
                  <Settings size={15} /> Settings
                </Link>
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile search row (slides open below main row) ── */}
      {searchOpen && (
        <div className="md:hidden mt-2.5 flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none flex-1 min-w-0"
          />
        </div>
      )}
    </header>
  );
}