'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { ChevronLeft, ChevronRight, Filter, Plus } from 'lucide-react';

/* ── Calendar helpers ──────────────────────────────── */
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const eventColors = {
  meeting:       { bg: 'bg-green-100',  text: 'text-green-700',  label: 'Meeting'        },
  designReview:  { bg: 'bg-red-100',    text: 'text-red-600',    label: 'Design Review'   },
  discussion:    { bg: 'bg-purple-100', text: 'text-purple-600', label: 'Discussion'      },
  marketResearch:{ bg: 'bg-green-100',  text: 'text-green-700',  label: 'Market Research' },
  newDeals:      { bg: 'bg-green-100',  text: 'text-green-700',  label: 'New Deals'       },
};

const calendarEvents = {
  '2026-01-02': [{ type: 'designReview' }],
  '2026-01-05': [{ type: 'meeting', time: '11:30 – 13:00' }],
  '2026-01-09': [{ type: 'designReview', time: '10:00 – 11:00' }, { type: 'discussion', time: '10:00 – 11:00' }],
  '2026-01-14': [{ type: 'marketResearch' }, { type: 'discussion' }],
  '2026-01-19': [{ type: 'designReview' }, { type: 'newDeals' }],
  '2026-01-22': [{ type: 'meeting' }, { type: 'designReview' }],
  '2026-01-28': [{ type: 'meeting' }, { type: 'designReview' }, { type: 'newDeals' }, { type: 'discussion' }],
  '2026-01-30': [{ type: 'meeting' }, { type: 'designReview' }, { type: 'newDeals' }, { type: 'discussion' }],
};

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
function formatKey(y, m, d) {
  return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

export default function SchedulePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState('Monthly');
  const [year,  setYear]  = useState(2026);
  const [month, setMonth] = useState(0); // January

  const daysInMonth   = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1 < 0 ? 11 : month - 1);

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y-1); } else setMonth(m => m-1); };
  const nextMonth = () => { if (month === 11) { setMonth(0);  setYear(y => y+1); } else setMonth(m => m+1); };
  const goToday   = () => { setYear(2026); setMonth(0); };

  // Build grid cells
  const cells = [];
  // Prev month spillover
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, current: false, prev: true });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true });
  }
  // Next month spillover
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, current: false, next: true });
  }

  const today = new Date();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col">
        {/* Custom navbar for schedule */}
        <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsOpen(true)} className="lg:hidden p-2 rounded-xl bg-gray-100 text-gray-500">
              <Filter size={18} />
            </button>
            <div>
              <p className="text-gray-400 text-xs">Good Morning</p>
              <p className="font-extrabold text-gray-900 text-base">Schedule</p>
            </div>
          </div>
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5 w-64">
            <svg width="15" height="15" className="text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input type="text" placeholder="Search" className="bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none flex-1" />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl bg-gray-100 text-gray-500">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
            <img src="https://randomuser.me/api/portraits/men/30.jpg" alt="User" className="w-8 h-8 rounded-full object-cover" />
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* Calendar header */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-4">
                <h2 className="text-lg font-extrabold text-primary">Calendar</h2>
                {/* View toggle */}
                <div className="flex gap-1 border-b border-gray-100">
                  {['Monthly', 'Weekly', 'Daily'].map(v => (
                    <button
                      key={v}
                      onClick={() => setViewMode(v)}
                      className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                        viewMode === v
                          ? 'text-primary border-b-2 border-primary'
                          : 'text-gray-400 hover:text-gray-700'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button className="flex items-center gap-1.5 border border-primary text-primary text-xs font-semibold px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                  <Filter size={13} /> Filter
                </button>
                <button className="flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                  <Plus size={13} /> Add Event
                </button>
              </div>
            </div>

            {/* Month navigation */}
            <div className="flex flex-wrap items-center gap-3 px-5 py-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-primary flex items-center gap-1">
                {MONTHS[month]} {year}
                <ChevronDown size={16} />
              </h3>
              <button onClick={prevMonth} className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-colors">
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={goToday}
                className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition-colors"
              >
                Today
              </button>
              <button onClick={nextMonth} className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-colors">
                <ChevronRight size={15} />
              </button>
            </div>

            {/* Responsive calendar wrapper with horizontal scroll on mobile */}
            <div className="overflow-x-auto">
              <div className="min-w-[640px] md:min-w-full">
                {/* Day headers */}
                <div className="grid grid-cols-7 border-b border-gray-100">
                  {DAYS.map(d => (
                    <div key={d} className="text-center py-2.5 text-xs font-semibold text-gray-400">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7" style={{ minHeight: '480px' }}>
                  {cells.map((cell, idx) => {
                    const key = cell.current ? formatKey(year, month, cell.day) : '';
                    const events = calendarEvents[key] || [];
                    const isToday = cell.current && cell.day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

                    return (
                      <div
                        key={idx}
                        className={`border-r border-b border-gray-50 p-1.5 min-h-[70px] sm:min-h-24 ${
                          !cell.current ? 'bg-gray-50/50' : 'bg-white hover:bg-gray-50/50'
                        } transition-colors`}
                      >
                        <div className={`text-xs font-semibold mb-1 w-6 h-6 flex items-center justify-center rounded-full ${
                          isToday
                            ? 'bg-primary text-white'
                            : cell.current ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          {cell.day}
                        </div>
                        <div className="space-y-0.5">
                          {events.slice(0, 3).map((ev, ei) => {
                            const style = eventColors[ev.type] || eventColors.meeting;
                            return (
                              <div
                                key={ei}
                                className={`${style.bg} ${style.text} text-[11px] sm:text-xs px-1.5 py-0.5 rounded font-medium truncate cursor-pointer hover:opacity-80`}
                              >
                                {style.label}
                                {ev.time && <span className="block text-[10px] sm:text-xs opacity-70">{ev.time}</span>}
                              </div>
                            );
                          })}
                          {events.length > 3 && (
                            <div className="text-[10px] sm:text-xs text-gray-400 font-medium px-1">+{events.length - 3} more</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© 2026 Team Mike – UI/UX. All rights reserved.</span>
          <div className="flex flex-wrap justify-center gap-5">
            {['FAQs', 'Privacy Policy', 'Terms & Condition'].map(l => (
              <button key={l} className="hover:text-primary transition-colors">{l}</button>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

function ChevronDown({ size }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}