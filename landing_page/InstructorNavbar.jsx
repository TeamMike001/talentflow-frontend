'use client';

import { useState } from 'react';
import { Search, Bell, Menu, X } from 'lucide-react';

export default function InstructorNavbar({
  greeting = 'Good Morning',
  title = 'Dashboard',
  onMenuClick,
}) {
  const [searchOpen, setSearchOpen] = useState(false);

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
          placeholder="Search"
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

      {/* Avatar */}
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Jese Leos"
        className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 cursor-pointer flex-shrink-0"
      />

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