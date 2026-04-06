'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { Plus, Clock, MoreHorizontal } from 'lucide-react';

const upcomingEvents = [
  { id: 1, title: 'UI/UX Design Masterclass: From Beginner to Pro',  venue: 'Virtual (Zoom)',      time: '6:00 PM – 8:00 PM WAT',   date: 'April 5, 2026',  daysLeft: 5,  color: 'bg-blue-600',   avatar: 'https://randomuser.me/api/portraits/women/20.jpg' },
  { id: 2, title: 'Figma for Designers: Hands-on Workshop',           venue: 'Virtual (Zoom)',      time: '4:00 PM – 6:00 PM WAT',   date: 'April 2, 2026',  daysLeft: 2,  color: 'bg-green-600',  avatar: 'https://randomuser.me/api/portraits/women/21.jpg' },
  { id: 3, title: 'Product Design & User Research Bootcamp',          venue: 'VI, Lagos, Nigeria',  time: '10:00 AM – 2:00 PM WAT',  date: 'April 10, 2026', daysLeft: 10, color: 'bg-purple-600', avatar: 'https://randomuser.me/api/portraits/men/22.jpg'   },
];

const tableEvents = Array(8).fill({
  name: 'UI/UX Design Masterclass...', date: 'April 5, 6:00 PM WAT', venue: 'Virtual (Zoom)', tickets: 1200,
});

const reminders = [
  { title: 'Figma for Designers: Hands-on Workshop',               time: '6:00 – 8:00 PM WAT',   date: 'Date: April 5, 2026'  },
  { title: 'UI/UX Design Masterclass: From Beginner to Pro',       time: '6:00 – 8:00 PM WAT',   date: 'Date: April 2, 2026'  },
  { title: 'Product Design & User Research Bootcamp',              time: '10:00 AM – 2:00 PM WAT', date: 'Date: April 10, 2026' },
];

export default function EventsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-w-0">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex flex-1 overflow-hidden">

          {/* ── MAIN CONTENT ── */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 min-w-0">

            {/* Header */}
            <div className="flex items-center justify-between mb-6 gap-3">
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">Events</h1>
              <button className="flex items-center gap-2 bg-primary text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-primary-dark transition-all shadow-md flex-shrink-0">
                <Plus size={15} /> Add reminder
              </button>
            </div>

            {/* Upcoming Events */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 text-base">Upcoming Events</h2>
                <button className="text-primary text-sm font-medium hover:underline">View all</button>
              </div>
              {/* 1 col mobile → 3 col desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {upcomingEvents.map(ev => (
                  <div key={ev.id} className={`${ev.color} rounded-2xl p-5 text-white`}>
                    <div className="flex items-center justify-between mb-3">
                      <img src={ev.avatar} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white/40" />
                      <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
                        <Clock size={12} /> {ev.daysLeft} Days Left
                      </div>
                      <button className="text-white/70 hover:text-white"><MoreHorizontal size={16} /></button>
                    </div>
                    <h3 className="font-extrabold text-sm leading-snug mb-3">{ev.title}</h3>
                    <div className="space-y-0.5 text-xs text-white/80">
                      <p>Venue: {ev.venue}</p>
                      <p>Time: {ev.time}</p>
                      <p>Date: {ev.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-left px-4 sm:px-5 py-3 font-semibold text-gray-500 text-xs whitespace-nowrap">Event Name</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs whitespace-nowrap">Date & Time</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs whitespace-nowrap hidden sm:table-cell">Venue</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs whitespace-nowrap hidden md:table-cell">Tickets</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs whitespace-nowrap">Status</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {tableEvents.map((ev, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 sm:px-5 py-3 text-gray-700 text-xs font-medium max-w-[140px] sm:max-w-none truncate">{ev.name}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{ev.date}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">{ev.venue}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{ev.tickets.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full whitespace-nowrap">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Upcoming
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 hover:text-gray-600 cursor-pointer">
                          <MoreHorizontal size={16} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile reminders — shown inline below table */}
            <div className="lg:hidden mt-6">
              <h3 className="font-extrabold text-gray-900 text-sm mb-3">Reminders</h3>
              <div className="space-y-3">
                {reminders.map((r, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                    <div className="flex items-start gap-2 mb-1">
                      <Clock size={13} className="text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-xs font-semibold text-gray-800 leading-snug">{r.title}</p>
                    </div>
                    <p className="text-xs text-gray-400 pl-5">Time: {r.time}</p>
                    <p className="text-xs text-gray-400 pl-5">{r.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* ── REMINDERS PANEL — desktop only ── */}
          <div className="hidden lg:flex flex-col w-64 bg-white border-l border-gray-100 overflow-y-auto p-5 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-gray-900 text-sm">Reminders</h3>
              <button className="text-primary text-xs font-semibold hover:underline">Close</button>
            </div>
            <div className="space-y-3">
              {reminders.map((r, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                  <div className="flex items-start gap-2 mb-1">
                    <Clock size={13} className="text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-xs font-semibold text-gray-800 leading-snug">{r.title}</p>
                  </div>
                  <p className="text-xs text-gray-400 pl-5">Time: {r.time}</p>
                  <p className="text-xs text-gray-400 pl-5">{r.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="bg-white border-t border-gray-100 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© 2026 Team Mike – UI/UX. All rights reserved.</span>
          <div className="flex gap-5">
            {['FAQs', 'Privacy Policy', 'Terms & Condition'].map(l => <button key={l} className="hover:text-primary">{l}</button>)}
          </div>
        </footer>
      </div>
    </div>
  );
}