// src/components/admin/AdminNavbar.js
'use client';

import { useState, useEffect } from 'react';
import { Bell, Search, Menu, X, User } from 'lucide-react';

export default function AdminNavbar({ onMenuClick }) {
  const [user, setUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 sm:px-6 gap-3 sticky top-0 z-40 shadow-sm">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-extrabold text-gray-900 truncate">
          Admin Dashboard
        </h1>
        <p className="text-xs text-gray-400">Welcome back, {user?.name || 'Admin'}</p>
      </div>

     

      {/* Mobile search button */}
      <button
        onClick={() => setSearchOpen(!searchOpen)}
        className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100"
      >
        {searchOpen ? <X size={18} /> : <Search size={18} />}
      </button>

     
      {/* User avatar */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          {user?.name?.charAt(0) || 'A'}
        </div>
        <div className="hidden sm:block">
          <p className="font-semibold text-gray-900 text-sm">{user?.name || 'Admin'}</p>
          <p className="text-gray-400 text-xs">Administrator</p>
        </div>
      </div>

      {/* Mobile search dropdown */}
      {searchOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b px-4 py-3 shadow-sm">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}
    </header>
  );
}