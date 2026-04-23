'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { Bell, CheckCircle, Trash2, AlertCircle, MessageCircle, UserPlus, BookOpen, Award } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

async function fetchNotifications() {
  const res = await fetch(`${API_BASE}/api/notifications`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch notifications');
  return res.json();
}

async function markAsRead(notificationId) {
  await fetch(`${API_BASE}/api/notifications/${notificationId}/read`, {
    method: 'PUT',
    headers: getAuthHeaders(),
  });
}

async function markAllAsRead() {
  await fetch(`${API_BASE}/api/notifications/read-all`, {
    method: 'PUT',
    headers: getAuthHeaders(),
  });
}

async function deleteNotification(notificationId) {
  await fetch(`${API_BASE}/api/notifications/${notificationId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

function getNotificationIcon(type) {
  switch(type) {
    case 'message': return <MessageCircle size={16} className="text-blue-500" />;
    case 'enrollment': return <UserPlus size={16} className="text-green-500" />;
    case 'assignment': return <BookOpen size={16} className="text-purple-500" />;
    case 'achievement': return <Award size={16} className="text-yellow-500" />;
    default: return <Bell size={16} className="text-gray-500" />;
  }
}

export default function InstructorNotifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (err) {
      setError('Could not load notifications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    loadNotifications();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, [router]);

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <InstructorNavbar
          greeting="Good morning"
          title="Notifications"
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Bell size={22} className="text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <CheckCircle size={14} /> Mark all as read
                </button>
              )}
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4">{error}</div>
            )}

            {notifications.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Bell size={48} className="mx-auto mb-3 text-gray-300" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`border rounded-xl p-4 transition-all ${
                      notif.read
                        ? 'bg-white border-gray-100'
                        : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          {getNotificationIcon(notif.type)}
                          <h3 className="font-semibold text-gray-900">
                            {notif.title}
                          </h3>
                          {!notif.read && (
                            <span className="text-[10px] font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {formatDate(notif.createdAt)}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        {!notif.read && (
                          <button
                            onClick={() => handleMarkRead(notif.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                            title="Mark as read"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notif.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
        <InstructorFooter />
      </div>
    </div>
  );
}