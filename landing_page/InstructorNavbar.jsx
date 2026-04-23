'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, Menu, X, Settings, User, LogOut } from 'lucide-react';

export default function InstructorNavbar({
  greeting = 'Good Morning',
  title = 'Dashboard',
  onMenuClick,
}) {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    // Simulate logout - clear any stored tokens/session
    // Example: await signOut({ redirect: false });
    localStorage.removeItem('token'); // if using token
    sessionStorage.clear();
    // Redirect to login page
    router.push('/home');
  };

  const handleNavigation = (path) => {
    setDropdownOpen(false);
    router.push(path);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 sm:px-6 gap-3 sticky top-0 z-40">

      {/* Hamburger — visible below lg */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Title area */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 font-medium">{greeting}</p>
        <h1 className="text-lg font-extrabold text-gray-900 leading-tight truncate">{title}</h1>
      </div>

      {/* Search bar — hidden on small, visible md+ */}
      <div className="relative hidden md:block w-48 lg:w-64">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses, students..."
          className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-primary focus:bg-white transition-all"
        />
      </div>

      {/* Search icon — visible only on small screens */}
      <button
        onClick={() => setSearchOpen((prev) => !prev)}
        className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
        aria-label="Toggle search"
      >
        {searchOpen ? <X size={18} /> : <Search size={18} />}
      </button>

      {/* Bell */}
      <button className="relative w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0">
        <Bell size={17} className="text-gray-600" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
      </button>

      {/* Avatar with dropdown */}
      <div className="relative" ref={dropdownRef}>
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Jese Leos"
          className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 cursor-pointer flex-shrink-0 hover:opacity-80 transition-opacity"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
            <button
              onClick={() => handleNavigation('/instructor/profile')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <User size={16} className="text-gray-500" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => handleNavigation('/instructor/InstructorSettings')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Settings size={16} className="text-gray-500" />
              <span>Settings</span>
            </button>
            <div className="border-t border-gray-100 my-1" />
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile search dropdown */}
      {searchOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 px-4 py-3 shadow-sm z-50">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, students…"
              autoFocus
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-primary focus:bg-white transition-all"
            />
          </div>
        </div>
      )}
    </header>
  );
}