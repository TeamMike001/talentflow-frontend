'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Bell, Menu, X, Settings, User, LogOut, ChevronDown, MessageCircle } from 'lucide-react';
const API_BASE_URL = 'http://localhost:8080';

export default function InstructorNavbar({ onMenuClick }) {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const [greeting, setGreeting] = useState('Good Morning');

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  useEffect(() => {
    fetchUserData();
    fetchUnreadCount();
    
    // Poll for unread count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

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

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const user = await response.json();
        setUserData(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        // Fallback to localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUserData(JSON.parse(storedUser));
        }
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch(`${API_BASE_URL}/api/notifications/unread`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.length || 0);
      }
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    router.push('/signin');
  };

  const handleNavigation = (path) => {
    setDropdownOpen(false);
    router.push(path);
  };

  const displayName = userData?.name || 'Instructor';
  const userEmail = userData?.email || '';
  const userInitial = displayName?.charAt(0)?.toUpperCase() || 'I';
  const userRole = userData?.role || 'Instructor';

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
        <h1 className="text-lg font-extrabold text-gray-900 leading-tight truncate">
          {displayName}
        </h1>
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

      {/* Notification Bell */}
      <Link
        href="/instructor/notifications"
        className="relative w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
      >
        <Bell size={17} className="text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Link>

      {/* Avatar with dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-xl px-2 py-1 transition-colors"
        >
          <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {userInitial}
          </div>
          <div className="hidden sm:block text-left">
            <p className="font-semibold text-gray-900 text-sm leading-tight">{displayName}</p>
            <p className="text-gray-400 text-xs">{userRole}</p>
          </div>
          <ChevronDown
            size={14}
            className={`text-gray-400 transition-transform hidden sm:block ${dropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-bold text-gray-900 text-sm">{displayName}</p>
              <p className="text-gray-400 text-xs truncate">{userEmail}</p>
              <p className="text-xs text-blue-600 mt-1">{userRole}</p>
            </div>
            <button
              onClick={() => handleNavigation('/instructor/profile')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <User size={16} className="text-gray-500" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => handleNavigation('/instructor/settings')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Settings size={16} className="text-gray-500" />
              <span>Settings</span>
            </button>
            <Link
              href="/instructor/messages"
              onClick={() => setDropdownOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <MessageCircle size={16} className="text-gray-500" />
              <span>Messages</span>
            </Link>
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