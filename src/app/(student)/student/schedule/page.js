'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { ChevronLeft, ChevronRight, Filter, Plus, X } from 'lucide-react';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS_FULL  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const DAYS_SHORT = ['S','M','T','W','T','F','S'];

const eventColors = {
  meeting:        { bg: 'bg-green-100',  text: 'text-green-700',  border: 'border-green-300',  label: 'Meeting'         },
  designReview:   { bg: 'bg-red-100',    text: 'text-red-600',    border: 'border-red-300',    label: 'Design Review'   },
  discussion:     { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300', label: 'Discussion'      },
  marketResearch: { bg: 'bg-green-100',  text: 'text-green-700',  border: 'border-green-300',  label: 'Market Research' },
  newDeals:       { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', label: 'New Deals'       },
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

function getDaysInMonth(y, m)   { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y, m)      { return new Date(y, m, 1).getDay(); }
function fmt(y, m, d)           { return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`; }

/* ── tiny chevron helper (avoids naming collision with lucide) ── */
function Chevron({ dir = 'down', size = 16 }) {
  const paths = {
    down:  'M19 9l-7 7-7-7',
    up:    'M5 15l7-7 7 7',
    left:  'M15 19l-7-7 7-7',
    right: 'M9 19l7-7-7-7',
  };
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={paths[dir]} />
    </svg>
  );
}

/* ── Event pill ── */
function EventPill({ ev, compact = false }) {
  const s = eventColors[ev.type] || eventColors.meeting;
  if (compact) {
    return (
      <div className={`w-1.5 h-1.5 rounded-full ${s.bg.replace('bg-', 'bg-').replace('-100', '-400')} flex-shrink-0`} />
    );
  }
  return (
    <div className={`${s.bg} ${s.text} rounded px-1 py-0.5 leading-tight`}>
      <p className="font-semibold truncate" style={{ fontSize: '10px' }}>{s.label}</p>
      {ev.time && <p className="truncate opacity-70" style={{ fontSize: '9px' }}>{ev.time}</p>}
    </div>
  );
}

export default function SchedulePage() {
  const [sidebarOpen,       setSidebarOpen]       = useState(false);
  const [viewMode,          setViewMode]           = useState('Monthly');
  const [year,              setYear]               = useState(2026);
  const [month,             setMonth]              = useState(0);
  const [events,            setEvents]             = useState(initialEvents);
  const [filterTypes,       setFilterTypes]        = useState([]);
  const [showFilterPanel,   setShowFilterPanel]    = useState(false);
  const [showAddModal,      setShowAddModal]        = useState(false);
  const [selectedDayDetail, setSelectedDayDetail]  = useState(null); // for mobile day tap
  const [newEvent, setNewEvent] = useState({ date: '', type: 'meeting', startTime: '', endTime: '' });

  /* navigation */
  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y-1); } else setMonth(m => m-1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y+1); } else setMonth(m => m+1); };
  const goToday   = () => { setYear(2026); setMonth(0); };

  /* build grid cells */
  const daysInMonth    = getDaysInMonth(year, month);
  const firstDay       = getFirstDay(year, month);
  const daysInPrevMon  = getDaysInMonth(year, month === 0 ? 11 : month - 1);
  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--)     cells.push({ day: daysInPrevMon - i, current: false });
  for (let d = 1; d <= daysInMonth; d++)       cells.push({ day: d, current: true });
  while (cells.length < 42)                    cells.push({ day: cells.length - daysInMonth - firstDay + 1, current: false });

  const today = new Date();

  const getEventsForDay = (key) => {
    const all = events[key] || [];
    if (!filterTypes.length) return all;
    return all.filter(e => filterTypes.includes(e.type));
  };

  /* add event */
  const handleAdd = () => {
    if (!newEvent.date) { alert('Please select a date'); return; }
    const time = newEvent.startTime && newEvent.endTime
      ? `${newEvent.startTime} – ${newEvent.endTime}`
      : newEvent.startTime || undefined;
    setEvents(prev => ({
      ...prev,
      [newEvent.date]: [...(prev[newEvent.date] || []), { type: newEvent.type, time }],
    }));
    setShowAddModal(false);
    setNewEvent({ date: '', type: 'meeting', startTime: '', endTime: '' });
  };

  const toggleFilter = (t) =>
    setFilterTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">

        {/* ── Navbar ── */}
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        {/* ── Page header ── */}
        <div className="bg-white border-b border-gray-100 px-4 lg:px-6 py-3 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs">Good Morning</p>
            <p className="font-extrabold text-gray-900 text-base sm:text-lg">Schedule</p>
          </div>
          {/* desktop search already in StudentNavbar */}
        </div>

        <main className="flex-1 p-3 sm:p-4 lg:p-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* ── Calendar controls ── */}
            <div className="border-b border-gray-100">

              {/* ROW 1: Calendar | Monthly/Weekly/Daily tabs | Filter | + Add Event */}
              <div className="px-3 sm:px-5 py-3 flex items-center gap-1 sm:gap-2">

                {/* Title */}
                <h2 className="text-sm sm:text-lg font-extrabold text-primary flex-shrink-0 mr-1">
                  Calendar
                </h2>

                {/* View tabs — underline style */}
                <div className="flex">
                  {['Monthly', 'Weekly', 'Daily'].map(v => (
                    <button
                      key={v}
                      onClick={() => setViewMode(v)}
                      className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                        viewMode === v
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-400 hover:text-gray-700'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                {/* Push Filter + Add to far right */}
                <div className="flex-1" />

                {/* Filter button */}
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setShowFilterPanel(!showFilterPanel)}
                    className={`flex items-center gap-1 sm:gap-1.5 border px-2 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      filterTypes.length
                        ? 'bg-primary text-white border-primary'
                        : 'border-primary text-primary hover:bg-blue-50'
                    }`}
                  >
                    <Filter size={12} />
                    <span className="hidden sm:inline">Filter</span>
                    {filterTypes.length > 0 && (
                      <span className="bg-white text-primary rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-extrabold">
                        {filterTypes.length}
                      </span>
                    )}
                  </button>

                  {/* Filter dropdown */}
                  {showFilterPanel && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowFilterPanel(false)} />
                      <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 z-20 p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-extrabold text-gray-700">Event Types</p>
                          {filterTypes.length > 0 && (
                            <button onClick={() => setFilterTypes([])} className="text-xs text-red-500 font-medium">Clear</button>
                          )}
                        </div>
                        {Object.entries(eventColors).map(([key, s]) => (
                          <label key={key} className="flex items-center gap-2 py-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filterTypes.includes(key)}
                              onChange={() => toggleFilter(key)}
                              className="w-3.5 h-3.5 accent-primary rounded"
                            />
                            <span className={`text-xs font-medium ${s.text}`}>{s.label}</span>
                          </label>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Add Event button */}
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1 sm:gap-1.5 bg-primary text-white text-xs font-bold px-2.5 sm:px-4 py-1.5 rounded-lg hover:bg-primary-dark transition-colors flex-shrink-0"
                >
                  <Plus size={12} />
                  <span className="hidden sm:inline">Add Event</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>

              {/* ROW 2: < prev | Today | next > | January 2026 */}
              <div className="px-3 sm:px-5 pb-3 flex items-center gap-2">
                <button onClick={prevMonth} className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-colors flex-shrink-0">
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={goToday}
                  className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition-colors flex-shrink-0"
                >
                  Today
                </button>
                <button onClick={nextMonth} className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-colors flex-shrink-0">
                  <ChevronRight size={14} />
                </button>
                <button className="flex items-center gap-1 text-primary font-bold text-sm sm:text-base ml-1 flex-shrink-0">
                  {MONTHS[month]} {year}
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Calendar grid ── */}
            <div className="overflow-x-auto">
              {/* Minimum width keeps 7 cols readable even on small phones */}
              <div style={{ minWidth: '320px' }}>

                {/* Day headers — full label ≥ sm, single letter on xs */}
                <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
                  {DAYS_FULL.map((d, i) => (
                    <div key={d} className="text-center py-2 text-gray-400 font-semibold select-none">
                      <span className="hidden sm:inline text-xs">{d}</span>
                      <span className="sm:hidden text-[10px]">{DAYS_SHORT[i]}</span>
                    </div>
                  ))}
                </div>

                {/* Cells */}
                <div className="grid grid-cols-7">
                  {cells.map((cell, idx) => {
                    const key = cell.current ? fmt(year, month, cell.day) : '';
                    const dayEvents = getEventsForDay(key);
                    const isToday =
                      cell.current &&
                      cell.day === today.getDate() &&
                      month === today.getMonth() &&
                      year  === today.getFullYear();

                    return (
                      <div
                        key={idx}
                        onClick={() => cell.current && setSelectedDayDetail({ key, day: cell.day, events: dayEvents })}
                        className={`
                          border-r border-b border-gray-100 transition-colors cursor-pointer
                          /* mobile: compact */ p-0.5 min-h-[52px]
                          /* tablet+: normal */ sm:p-1.5 sm:min-h-[90px]
                          ${!cell.current ? 'bg-gray-50/60' : 'bg-white hover:bg-blue-50/30'}
                        `}
                      >
                        {/* Day number */}
                        <div className={`
                          text-[10px] sm:text-xs font-bold flex items-center justify-center rounded-full
                          w-5 h-5 sm:w-6 sm:h-6 mb-0.5 sm:mb-1 mx-auto sm:mx-0
                          ${isToday  ? 'bg-primary text-white'
                          : cell.current ? 'text-gray-700'
                          : 'text-gray-300'}
                        `}>
                          {cell.day}
                        </div>

                        {/* Events */}
                        <div className="space-y-0.5">
                          {/* Mobile: show dots only (max 3) */}
                          <div className="flex gap-0.5 flex-wrap sm:hidden px-0.5">
                            {dayEvents.slice(0, 3).map((ev, ei) => (
                              <EventPill key={ei} ev={ev} compact />
                            ))}
                            {dayEvents.length > 3 && (
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                            )}
                          </div>

                          {/* Desktop: show label pills */}
                          <div className="hidden sm:block space-y-0.5">
                            {dayEvents.slice(0, 3).map((ev, ei) => (
                              <EventPill key={ei} ev={ev} />
                            ))}
                            {dayEvents.length > 3 && (
                              <p style={{ fontSize: '9px' }} className="text-gray-400 font-semibold px-1">
                                +{dayEvents.length - 3} more
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-white border-t border-gray-100 px-4 lg:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© 2026 Team Mike – UI/UX. All rights reserved.</span>
          <div className="flex gap-4">
            {['FAQs','Privacy Policy','Terms & Condition'].map(l => (
              <button key={l} className="hover:text-primary transition-colors">{l}</button>
            ))}
          </div>
        </footer>
      </div>

      {/* ── Mobile day detail sheet ── */}
      {selectedDayDetail && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedDayDetail(null)} />
          <div className="relative bg-white w-full sm:max-w-sm sm:rounded-2xl rounded-t-2xl p-5 shadow-2xl z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-gray-900 text-base">
                {MONTHS[month]} {selectedDayDetail.day}, {year}
              </h3>
              <button onClick={() => setSelectedDayDetail(null)} className="p-1 text-gray-400 hover:text-gray-700">
                <X size={18} />
              </button>
            </div>
            {selectedDayDetail.events.length === 0 ? (
              <p className="text-gray-400 text-sm">No events on this day.</p>
            ) : (
              <div className="space-y-2.5">
                {selectedDayDetail.events.map((ev, i) => {
                  const s = eventColors[ev.type] || eventColors.meeting;
                  return (
                    <div key={i} className={`${s.bg} ${s.text} rounded-xl px-4 py-3`}>
                      <p className="font-bold text-sm">{s.label}</p>
                      {ev.time && <p className="text-xs opacity-80 mt-0.5">{ev.time}</p>}
                    </div>
                  );
                })}
              </div>
            )}
            <button
              onClick={() => {
                setNewEvent(e => ({ ...e, date: selectedDayDetail.key }));
                setSelectedDayDetail(null);
                setShowAddModal(true);
              }}
              className="mt-4 w-full py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={15} /> Add event on this day
            </button>
          </div>
        </div>
      )}

      {/* ── Add Event Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl p-5 shadow-2xl z-10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-extrabold text-gray-900">Add New Event</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-gray-400 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={e => setNewEvent(n => ({ ...n, date: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-blue-100"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Type</label>
                <div className="relative">
                  <select
                    value={newEvent.type}
                    onChange={e => setNewEvent(n => ({ ...n, type: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:border-primary bg-white"
                  >
                    {Object.entries(eventColors).map(([k, s]) => (
                      <option key={k} value={k}>{s.label}</option>
                    ))}
                  </select>
                  <Chevron dir="down" size={15} />
                </div>
              </div>

              {/* Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start time</label>
                  <input
                    type="time"
                    value={newEvent.startTime}
                    onChange={e => setNewEvent(n => ({ ...n, startTime: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">End time</label>
                  <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={e => setNewEvent(n => ({ ...n, endTime: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400">Leave times empty for an all-day event.</p>

              <button
                onClick={handleAdd}
                className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all text-sm shadow-md"
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