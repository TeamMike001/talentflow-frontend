'use client';

import { useState, useEffect } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import Link from 'next/link';
import { Bell, FileText, CheckCircle2, Clock, Trash2, Lock, Download } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080';

export default function StudentNotifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/notifications`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_BASE_URL}/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_BASE_URL}/api/notifications/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_BASE_URL}/api/notifications/mark-all-read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'assignment': return <FileText size={18} className="text-blue-500" />;
      case 'password_change': return <Lock size={18} className="text-yellow-500" />;
      case 'data_export': return <Download size={18} className="text-green-500" />;
      default: return <Bell size={18} className="text-gray-500" />;
    }
  };

  const getIconBg = (type) => {
    switch(type) {
      case 'assignment': return 'bg-blue-50';
      case 'password_change': return 'bg-yellow-50';
      case 'data_export': return 'bg-green-50';
      default: return 'bg-gray-50';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = notifications.filter(n => n.read).length;
  const totalCount = notifications.length;

  const filtered = notifications.filter(n => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'read') return n.read;
    return true;
  });

  const tabClass = (tab) =>
    `px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
      activeTab === tab
        ? 'bg-white border border-gray-200 text-gray-900 shadow-sm'
        : 'text-gray-500 hover:text-gray-700'
    }`;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-w-0">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-3xl mx-auto">

            {/* Header */}
            <div className="flex items-start justify-between mb-6 gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Bell size={20} className="text-gray-700" />
                  <h1 className="font-extrabold text-gray-900 text-lg sm:text-xl">Notifications</h1>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm">
                  You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
                </p>
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="border border-gray-200 bg-white text-gray-700 text-xs sm:text-sm font-semibold px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:border-primary hover:text-primary transition-all shadow-sm flex-shrink-0"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full w-fit mb-6 overflow-x-auto max-w-full">
              <button onClick={() => setActiveTab('all')} className={tabClass('all')}>All ({totalCount})</button>
              <button onClick={() => setActiveTab('unread')} className={tabClass('unread')}>Unread ({unreadCount})</button>
              <button onClick={() => setActiveTab('read')} className={tabClass('read')}>Read ({readCount})</button>
            </div>

            {/* List */}
            <div className="space-y-3">
              {filtered.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <Bell size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No notifications here</p>
                </div>
              )}

              {filtered.map((notif) => {
                const Icon = getNotificationIcon(notif.type);
                return (
                  <div
                    key={notif.id}
                    className={`bg-white rounded-2xl border p-4 sm:p-5 ${!notif.read ? 'border-gray-200 bg-gray-50' : 'border-gray-100'}`}
                  >
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <div className={`p-1.5 rounded-lg ${getIconBg(notif.type)}`}>
                            {Icon}
                          </div>
                          <span className="font-bold text-gray-900 text-xs sm:text-sm">{notif.title}</span>
                          {!notif.read && (
                            <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">New</span>
                          )}
                        </div>

                        <p className="text-gray-500 text-xs sm:text-sm mb-3 leading-relaxed">{notif.message}</p>

                        <div className="flex items-center gap-3">
                          {!notif.read && (
                            <button onClick={() => markAsRead(notif.id)} className="text-xs text-gray-400 hover:text-blue-600 underline">
                              Mark as read
                            </button>
                          )}
                          <button onClick={() => deleteNotification(notif.id)} className="text-red-400 hover:text-red-600">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <span className="text-xs text-gray-400 flex-shrink-0 whitespace-nowrap">{notif.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}