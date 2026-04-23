'use client';

import { useState, useEffect } from 'react';
import { Bell, Search, Menu, X, User, ChevronDown } from 'lucide-react';

export default function AdminNavbar({ onMenuClick }) {
  const [user, setUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user', e);
      }
    }
  }, []);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        {/* Left section - Menu button and title */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button - ALWAYS VISIBLE on mobile */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>
          
          {/* Mobile title */}
          <div className="lg:hidden">
            <h1 className="text-base font-bold text-gray-900">Admin Panel</h1>
          </div>
        </div>

        {/* Search - Desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users, courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Mobile search button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all"
            aria-label="Search"
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* User menu - Desktop */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-all"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 text-sm">{user?.name || 'Admin'}</p>
                <p className="text-gray-400 text-xs">Administrator</p>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {/* Dropdown menu */}
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user?.name || 'Admin'}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'admin@talentflow.com'}</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile user avatar */}
          <div className="sm:hidden">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search dropdown */}
      {searchOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 shadow-lg">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users, courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
    </header>
  );
}