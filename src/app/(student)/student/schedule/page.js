'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { ChevronLeft, ChevronRight, Filter, Plus, Menu, X } from 'lucide-react';

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

const initialEvents = {
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('Monthly');
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(0);
  const [events, setEvents] = useState(initialEvents);
  const [filterTypes, setFilterTypes] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ 
    date: '', 
    type: 'meeting', 
    startTime: '', 
    endTime: '' 
  });

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1 < 0 ? 11 : month - 1);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y-1); }
    else setMonth(m => m-1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y+1); }
    else setMonth(m => m+1);
  };
  const goToday = () => { setYear(2026); setMonth(0); };

  const cells = [];
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, current: false, prev: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, current: false, next: true });
  }

  const today = new Date();

  const getFilteredEvents = (dateKey) => {
    const dayEvents = events[dateKey] || [];
    if (filterTypes.length === 0) return dayEvents;
    return dayEvents.filter(ev => filterTypes.includes(ev.type));
  };

  const handleAddEvent = () => {
    if (!newEvent.date) {
      alert('Please select a date');
      return;
    }
    let timeString = '';
    if (newEvent.startTime && newEvent.endTime) {
      timeString = `${newEvent.startTime} – ${newEvent.endTime}`;
    } else if (newEvent.startTime) {
      timeString = newEvent.startTime;
    }
    
    const updatedEvents = { ...events };
    if (!updatedEvents[newEvent.date]) {
      updatedEvents[newEvent.date] = [];
    }
    updatedEvents[newEvent.date].push({
      type: newEvent.type,
      time: timeString || undefined,
    });
    setEvents(updatedEvents);
    setShowAddModal(false);
    setNewEvent({ date: '', type: 'meeting', startTime: '', endTime: '' });
  };

  const toggleFilter = (type) => {
    if (filterTypes.includes(type)) {
      setFilterTypes(filterTypes.filter(t => t !== type));
    } else {
      setFilterTypes([...filterTypes, type]);
    }
  };
  const clearFilters = () => setFilterTypes([]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        {/* Top bar with navbar */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between px-4 py-2 lg:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <div className="flex-1">
              <StudentNavbar />
            </div>
          </div>
        </div>

        <main className="flex-1 p-4 lg:p-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            {/* ========== FIXED HEADER: buttons always visible on mobile ========== */}
            <div className="p-4 sm:p-5 border-b border-gray-100">
              {/* First row: Title + view toggle */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="text-lg font-extrabold text-primary">Calendar</h2>
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
              
              {/* Second row: Filter + Add Event buttons (always on their own row on mobile) */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Filter button */}
                <div className="relative">
                  <button
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className={`flex items-center gap-1.5 border px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      filterTypes.length > 0
                        ? 'bg-primary text-white border-primary'
                        : 'border-primary text-primary hover:bg-blue-50'
                    }`}
                  >
                    <Filter size={13} /> Filter {filterTypes.length > 0 && `(${filterTypes.length})`}
                  </button>
                  {showFilterDropdown && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-20 p-3">
                      <div className="text-xs font-semibold mb-2">Event Types</div>
                      {Object.keys(eventColors).map(type => (
                        <label key={type} className="flex items-center gap-2 py-1 text-sm">
                          <input
                            type="checkbox"
                            checked={filterTypes.includes(type)}
                            onChange={() => toggleFilter(type)}
                            className="rounded"
                          />
                          <span className={`text-xs ${eventColors[type].text}`}>
                            {eventColors[type].label}
                          </span>
                        </label>
                      ))}
                      {filterTypes.length > 0 && (
                        <button onClick={clearFilters} className="text-xs text-red-500 mt-2 w-full text-left">
                          Clear all
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Add Event button */}
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <Plus size={13} /> Add Event
                </button>
              </div>
            </div>

            {/* Month navigation (unchanged) */}
            <div className="flex flex-wrap items-center gap-3 px-5 py-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-primary flex items-center gap-1">
                {MONTHS[month]} {year}
                <ChevronDown size={16} />
              </h3>
              <button onClick={prevMonth} className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-primary hover:text-primary">
                <ChevronLeft size={15} />
              </button>
              <button onClick={goToday} className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg">
                Today
              </button>
              <button onClick={nextMonth} className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-primary hover:text-primary">
                <ChevronRight size={15} />
              </button>
            </div>

            {/* Calendar grid (same) */}
            <div className="overflow-x-auto">
              <div className="min-w-[640px] md:min-w-full">
                <div className="grid grid-cols-7 border-b border-gray-100">
                  {DAYS.map(d => <div key={d} className="text-center py-2.5 text-xs font-semibold text-gray-400">{d}</div>)}
                </div>
                <div className="grid grid-cols-7" style={{ minHeight: '480px' }}>
                  {cells.map((cell, idx) => {
                    const dateKey = cell.current ? formatKey(year, month, cell.day) : '';
                    const eventsForDay = getFilteredEvents(dateKey);
                    const isToday = cell.current && cell.day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                    return (
                      <div key={idx} className={`border-r border-b border-gray-50 p-1.5 min-h-[70px] sm:min-h-24 ${!cell.current ? 'bg-gray-50/50' : 'bg-white hover:bg-gray-50/50'} transition-colors`}>
                        <div className={`text-xs font-semibold mb-1 w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-primary text-white' : cell.current ? 'text-gray-700' : 'text-gray-300'}`}>
                          {cell.day}
                        </div>
                        <div className="space-y-0.5">
                          {eventsForDay.slice(0, 3).map((ev, ei) => {
                            const style = eventColors[ev.type] || eventColors.meeting;
                            return (
                              <div key={ei} className={`${style.bg} ${style.text} text-[11px] sm:text-xs px-1.5 py-0.5 rounded font-medium truncate cursor-pointer hover:opacity-80`}>
                                {style.label}
                                {ev.time && <span className="block text-[10px] opacity-70">{ev.time}</span>}
                              </div>
                            );
                          })}
                          {eventsForDay.length > 3 && <div className="text-[10px] text-gray-400 font-medium px-1">+{eventsForDay.length - 3} more</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-white border-t border-gray-100 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400 mt-auto">
          <span>© 2026 Team Mike – UI/UX. All rights reserved.</span>
          <div className="flex flex-wrap justify-center gap-5">
            {['FAQs', 'Privacy Policy', 'Terms & Condition'].map(l => (
              <button key={l} className="hover:text-primary transition-colors">{l}</button>
            ))}
          </div>
        </footer>
      </div>

      {/* ADD EVENT MODAL with dynamic time picker */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Add New Event</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {/* Date field */}
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  min="2026-01-01"
                  max="2026-12-31"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>

              {/* Event type */}
              <div>
                <label className="block text-sm font-medium mb-1">Event Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  {Object.keys(eventColors).map(type => (
                    <option key={type} value={type}>{eventColors[type].label}</option>
                  ))}
                </select>
              </div>

              {/* Dynamic time range (start & end) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Start time</label>
                  <input
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End time</label>
                  <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400">Leave times empty for all-day event</p>

              <button
                onClick={handleAddEvent}
                className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary-dark"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
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