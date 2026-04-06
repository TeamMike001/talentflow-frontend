'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import Link from 'next/link';
import { Bell, FileText, CheckCircle2, Clock, Trash2 } from 'lucide-react';

const initialNotifications = [
  { id: 1, type: 'assignment', icon: FileText,    iconColor: 'text-blue-500',   iconBg: 'bg-blue-50',   title: 'New Assignment',    isNew: true,  message: 'New Assignment posted in UIUX : Create a wire frame for a dashboard',                         time: '3 hrs ago',  read: false },
  { id: 2, type: 'project',    icon: CheckCircle2, iconColor: 'text-blue-500',   iconBg: 'bg-blue-50',   title: 'Project Update',    isNew: true,  message: "Your group project 'E-commerce Platform' has been updated by Sasha Bright",                  time: '8 hrs ago',  read: false },
  { id: 3, type: 'reminder',   icon: Clock,        iconColor: 'text-yellow-500', iconBg: 'bg-yellow-50', title: 'Reminder Alert',    isNew: false, message: "Upcoming deadline: 'React Component Library' assignment due in 2 days",                       time: '2 days ago', read: true  },
  { id: 4, type: 'graded',     icon: FileText,     iconColor: 'text-blue-500',   iconBg: 'bg-blue-50',   title: 'Assignment Graded', isNew: false, message: 'Your assignment Digital Marketing has been graded: 80/100',                                  time: '5 days ago', read: true  },
];

export default function StudentNotifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount   = notifications.filter(n =>  n.read).length;
  const totalCount  = notifications.length;

  const filtered = notifications.filter(n => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'read')   return  n.read;
    return true;
  });

  const markAsRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true, isNew: false } : n));
  const deleteNotification = (id) => setNotifications(prev => prev.filter(n => n.id !== id));
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true, isNew: false })));

  const tabClass = (tab) =>
    `px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
      activeTab === tab
        ? 'bg-white border border-gray-200 text-gray-900 shadow-sm'
        : 'text-gray-500 hover:text-gray-700'
    }`;

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

              <button
                onClick={markAllRead}
                className="border border-gray-200 bg-white text-gray-700 text-xs sm:text-sm font-semibold px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:border-primary hover:text-primary transition-all shadow-sm flex-shrink-0"
              >
                Mark all as read
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full w-fit mb-6 overflow-x-auto max-w-full">
              <button onClick={() => setActiveTab('all')}    className={tabClass('all')}>All ({totalCount})</button>
              <button onClick={() => setActiveTab('unread')} className={tabClass('unread')}>Unread ({unreadCount})</button>
              <button onClick={() => setActiveTab('read')}   className={tabClass('read')}>Read ({readCount})</button>
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
                const Icon = notif.icon;
                return (
                  <div
                    key={notif.id}
                    className={`bg-white rounded-2xl border p-4 sm:p-5 ${!notif.read ? 'border-gray-200 bg-gray-50' : 'border-gray-100'}`}
                  >
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Icon size={15} className={notif.iconColor} />
                          <span className="font-bold text-gray-900 text-xs sm:text-sm">{notif.title}</span>
                          {notif.isNew && (
                            <span className="bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded-full">New</span>
                          )}
                        </div>

                        <p className="text-gray-500 text-xs sm:text-sm mb-3 leading-relaxed">{notif.message}</p>

                        <div className="flex items-center gap-3">
                          {!notif.read && (
                            <button onClick={() => markAsRead(notif.id)} className="text-xs text-gray-400 hover:text-primary underline">
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

        <footer className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-100 bg-white text-xs text-gray-400 mt-auto flex-wrap gap-3">
          <span>© 2026 Team Mike – UI/UX. All rights reserved.</span>
          <div className="flex items-center gap-4 sm:gap-5">
            <Link href="/faqs"    className="hover:text-primary transition-colors">FAQs</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-primary transition-colors">Terms & Condition</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}