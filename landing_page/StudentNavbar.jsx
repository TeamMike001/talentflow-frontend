'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, ChevronDown, Search, LogOut, User, Settings, Menu, X } from 'lucide-react';
import Link from 'next/link';

const API_BASE_URL = 'http://localhost:8080';

export default function StudentNavbar({ onMenuClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
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

  useEffect(() => {
    fetchUserData();
    fetchNotifications();
    
    // Poll for notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
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

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch(`${API_BASE_URL}/api/notifications`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.slice(0, 5));
        setUnreadCount(data.filter(n => !n.read).length);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_BASE_URL}/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_BASE_URL}/api/notifications/read-all`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setDropdownOpen(false);
    router.push('/signin');
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  const displayName = userData?.name || userData?.fullName || 'Student';
  const userEmail = userData?.email || '';
  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sticky top-0 z-20">

      {/* Main row */}
      <div className="flex items-center justify-between gap-3">

        {/* Left: hamburger + welcome text */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden flex-shrink-0 p-1.5 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>

          <div className="min-w-0">
            <p className="font-extrabold text-gray-900 text-sm truncate">
              {greeting}, <span className="text-primary">{displayName}</span>! 👋
            </p>
            <p className="text-gray-400 text-xs truncate hidden sm:block">
              Ready to continue learning?
            </p>
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
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <p className="font-bold text-gray-900 text-sm">Notifications</p>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-primary text-xs font-medium hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <ul className="divide-y divide-gray-50 max-h-60 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <li className="px-4 py-8 text-center text-gray-400 text-sm">
                      No notifications yet
                    </li>
                  ) : (
                    notifications.map(n => (
                      <li 
                        key={n.id} 
                        className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${!n.read ? 'bg-blue-50/40' : ''}`}
                        onClick={() => markAsRead(n.id)}
                      >
                        <p className="text-sm text-gray-700 leading-snug">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{n.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatTime(n.createdAt)}</p>
                      </li>
                    ))
                  )}
                </ul>
                <div className="px-4 py-2.5 border-t border-gray-100 text-center">
                  <Link 
                    href="/student/notifications" 
                    className="text-primary text-xs font-semibold hover:underline"
                    onClick={() => setNotifOpen(false)}
                  >
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
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {getInitials(displayName)}
              </div>
              <div className="hidden sm:block text-left">
                <p className="font-semibold text-gray-900 text-xs leading-none">{displayName}</p>
                <p className="text-gray-400 text-xs mt-0.5">Student</p>
              </div>
              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform hidden sm:block ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden py-1">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-bold text-gray-900 text-sm">{displayName}</p>
                  <p className="text-gray-400 text-xs truncate">{userEmail}</p>
                </div>
                <Link 
                  href="/student/StudentProfile" 
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                >
                  <User size={15} /> My Profile
                </Link>
                <Link 
                  href="/student/settings" 
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                >
                  <Settings size={15} /> Settings
                </Link>
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search row */}
      {searchOpen && (
        <div className="md:hidden mt-2.5 flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search courses..."
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none flex-1 min-w-0"
          />
        </div>
      )}
    </header>
  );
}