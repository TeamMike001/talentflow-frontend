'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { Plus, Clock, MoreHorizontal, X, Bell, MapPin, Calendar, ChevronLeft, ChevronRight, Check } from 'lucide-react';

/* ─── DATA ─── */
const INITIAL_UPCOMING = [
  { id: 1, title: 'UI/UX Design Masterclass: From Beginner to Pro',  venue: 'Virtual (Zoom)',     time: '6:00 PM – 8:00 PM WAT',   date: 'April 5, 2026',  daysLeft: 5,  color: 'bg-blue-600',   avatar: 'https://randomuser.me/api/portraits/women/20.jpg' },
  { id: 2, title: 'Figma for Designers: Hands-on Workshop',           venue: 'Virtual (Zoom)',     time: '4:00 PM – 6:00 PM WAT',   date: 'April 2, 2026',  daysLeft: 2,  color: 'bg-green-600',  avatar: 'https://randomuser.me/api/portraits/women/21.jpg' },
  { id: 3, title: 'Product Design & User Research Bootcamp',          venue: 'VI, Lagos, Nigeria', time: '10:00 AM – 2:00 PM WAT', date: 'April 10, 2026', daysLeft: 10, color: 'bg-purple-600', avatar: 'https://randomuser.me/api/portraits/men/22.jpg'   },
];

const ALL_TABLE_EVENTS = [
  { id: 1,  name: 'UI/UX Design Masterclass: From Beginner to Pro',  date: 'April 5, 6:00 PM WAT',   venue: 'Virtual (Zoom)',     tickets: 1200, status: 'Upcoming' },
  { id: 2,  name: 'Figma for Designers: Hands-on Workshop',           date: 'April 2, 4:00 PM WAT',   venue: 'Virtual (Zoom)',     tickets: 850,  status: 'Upcoming' },
  { id: 3,  name: 'Product Design & User Research Bootcamp',          date: 'April 10, 10:00 AM WAT', venue: 'VI, Lagos, Nigeria', tickets: 400,  status: 'Upcoming' },
  { id: 4,  name: 'Advanced CSS & Tailwind Workshop',                  date: 'April 12, 3:00 PM WAT',  venue: 'Virtual (Zoom)',     tickets: 620,  status: 'Upcoming' },
  { id: 5,  name: 'React & Next.js Deep Dive',                         date: 'April 15, 5:00 PM WAT',  venue: 'Virtual (Zoom)',     tickets: 990,  status: 'Upcoming' },
  { id: 6,  name: 'Motion Design with After Effects',                  date: 'April 18, 2:00 PM WAT',  venue: 'Lekki, Lagos',       tickets: 300,  status: 'Upcoming' },
  { id: 7,  name: 'Portfolio Review & Career Q&A',                     date: 'April 20, 7:00 PM WAT',  venue: 'Virtual (Zoom)',     tickets: 500,  status: 'Upcoming' },
  { id: 8,  name: 'Design Systems with Tokens & Figma',               date: 'April 22, 6:00 PM WAT',  venue: 'Virtual (Zoom)',     tickets: 780,  status: 'Upcoming' },
  { id: 9,  name: 'Intro to 3D Design for UI',                         date: 'April 25, 4:00 PM WAT',  venue: 'Virtual (Zoom)',     tickets: 450,  status: 'Upcoming' },
  { id: 10, name: 'Brand Identity & Visual Strategy',                  date: 'April 28, 3:00 PM WAT',  venue: 'VI, Lagos, Nigeria', tickets: 360,  status: 'Upcoming' },
  { id: 11, name: 'UX Writing & Microcopy Masterclass',               date: 'May 2, 6:00 PM WAT',     venue: 'Virtual (Zoom)',     tickets: 670,  status: 'Upcoming' },
  { id: 12, name: 'AI Tools for Designers',                            date: 'May 5, 5:00 PM WAT',     venue: 'Virtual (Zoom)',     tickets: 1100, status: 'Upcoming' },
];

const ROWS_PER_PAGE = 8;

/* ─── STATUS BADGE ─── */
function StatusBadge({ status }) {
  const map = {
    Upcoming:  'bg-green-50 text-green-600',
    Attended:  'bg-blue-50 text-blue-600',
    Cancelled: 'bg-red-50 text-red-500',
  };
  const dotMap = {
    Upcoming:  'bg-green-500',
    Attended:  'bg-blue-500',
    Cancelled: 'bg-red-400',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${map[status] || map.Upcoming}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotMap[status] || dotMap.Upcoming}`} />
      {status}
    </span>
  );
}

/* ─── ROW MENU ─── */
function RowMenu({ onClose, onAttend, onCancel }) {
  return (
    <div className="absolute right-8 top-0 z-20 bg-white border border-gray-100 rounded-xl shadow-lg py-1 w-36 text-sm">
      <button onClick={onAttend}  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center gap-2"><Check size={13} /> Mark Attended</button>
      <button onClick={onCancel}  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500 flex items-center gap-2"><X size={13} /> Cancel</button>
      <button onClick={onClose}   className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-400">Dismiss</button>
    </div>
  );
}

/* ─── ADD REMINDER MODAL ─── */
function AddReminderModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: '', date: '', time: '', venue: '' });
  const [error, setError] = useState('');

  function handleSubmit() {
    if (!form.title.trim() || !form.date || !form.time) {
      setError('Please fill in title, date and time.');
      return;
    }
    onAdd(form);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-extrabold text-gray-900 text-base">Add Reminder</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Event Title *</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. UI/UX Design Workshop"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-gray-50" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Date *</label>
              <div className="relative">
                <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-gray-50" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Time *</label>
              <div className="relative">
                <Clock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-gray-50" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Venue</label>
            <div className="relative">
              <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })}
                placeholder="e.g. Virtual (Zoom) or Lagos, Nigeria"
                className="w-full border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-gray-50" />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>

        <div className="flex gap-2 mt-5">
          <button onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all">
            Cancel
          </button>
          <button onClick={handleSubmit}
            className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all">
            Add Reminder
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── SUCCESS TOAST ─── */
function Toast({ message, onDone }) {
  useState(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  });
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl animate-bounce-once">
      <Bell size={14} className="text-green-400" />
      {message}
    </div>
  );
}

/* ═══════════════════════════════ PAGE ═══════════════════════════════ */
export default function EventsPage() {
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [showModal,      setShowModal]      = useState(false);
  const [toast,          setToast]          = useState('');
  const [reminders,      setReminders]      = useState([
    { id: 1, title: 'Figma for Designers: Hands-on Workshop',         time: '6:00 – 8:00 PM WAT',    date: 'Date: April 5, 2026'  },
    { id: 2, title: 'UI/UX Design Masterclass: From Beginner to Pro', time: '6:00 – 8:00 PM WAT',    date: 'Date: April 2, 2026'  },
    { id: 3, title: 'Product Design & User Research Bootcamp',        time: '10:00 AM – 2:00 PM WAT', date: 'Date: April 10, 2026' },
  ]);
  const [tableEvents,    setTableEvents]    = useState(ALL_TABLE_EVENTS);
  const [openMenu,       setOpenMenu]       = useState(null);
  const [page,           setPage]           = useState(1);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);

  const totalPages   = Math.ceil(tableEvents.length / ROWS_PER_PAGE);
  const pagedEvents  = tableEvents.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);
  const upcomingEvents = INITIAL_UPCOMING;

  /* add reminder */
  function handleAddReminder(form) {
    const newReminder = {
      id:    Date.now(),
      title: form.title,
      time:  form.time + ' WAT',
      date:  'Date: ' + form.date,
    };
    setReminders((prev) => [newReminder, ...prev]);
    setToast('Reminder added successfully!');
  }

  /* remove reminder */
  function removeReminder(id) {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  }

  /* change row status */
  function changeStatus(id, status) {
    setTableEvents((prev) => prev.map((e) => e.id === id ? { ...e, status } : e));
    setOpenMenu(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-w-0">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex flex-1 overflow-hidden">

          {/* ═══ MAIN CONTENT ═══ */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 min-w-0">

            {/* Header */}
            <div className="flex items-center justify-between mb-6 gap-3">
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">Events</h1>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-md flex-shrink-0">
                <Plus size={15} /> Add reminder
              </button>
            </div>

            {/* ── Upcoming Events ── */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 text-base">Upcoming Events</h2>
                <button
                  onClick={() => setShowAllUpcoming(!showAllUpcoming)}
                  className="text-blue-600 text-sm font-medium hover:underline">
                  {showAllUpcoming ? 'Show less' : 'View all'}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {upcomingEvents.map((ev) => (
                  <div key={ev.id} className={`${ev.color} rounded-2xl p-5 text-white`}>
                    <div className="flex items-center justify-between mb-3">
                      <img src={ev.avatar} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white/40" />
                      <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
                        <Clock size={12} /> {ev.daysLeft} Days Left
                      </div>
                      <button
                        onClick={() => {
                          const newReminder = { id: Date.now(), title: ev.title, time: ev.time, date: 'Date: ' + ev.date };
                          setReminders((prev) => [newReminder, ...prev]);
                          setToast('Reminder set for "' + ev.title.slice(0, 30) + '..."');
                        }}
                        className="text-white/70 hover:text-white transition-colors" title="Add to reminders">
                        <Bell size={16} />
                      </button>
                    </div>
                    <h3 className="font-extrabold text-sm leading-snug mb-3">{ev.title}</h3>
                    <div className="space-y-0.5 text-xs text-white/80">
                      <p className="flex items-center gap-1"><MapPin size={10} /> {ev.venue}</p>
                      <p className="flex items-center gap-1"><Clock size={10} /> {ev.time}</p>
                      <p className="flex items-center gap-1"><Calendar size={10} /> {ev.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Events Table ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/60">
                      <th className="text-left px-4 sm:px-5 py-3 font-semibold text-gray-500 text-xs whitespace-nowrap">Event Name</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs whitespace-nowrap">Date &amp; Time</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs whitespace-nowrap hidden sm:table-cell">Venue</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs whitespace-nowrap hidden md:table-cell">Tickets</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs whitespace-nowrap">Status</th>
                      <th className="px-4 py-3 w-8" />
                    </tr>
                  </thead>
                  <tbody>
                    {pagedEvents.map((ev) => (
                      <tr key={ev.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors relative">
                        <td className="px-4 sm:px-5 py-3 text-gray-700 text-xs font-medium max-w-[150px] sm:max-w-none truncate">{ev.name}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{ev.date}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">{ev.venue}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{ev.tickets.toLocaleString()}</td>
                        <td className="px-4 py-3"><StatusBadge status={ev.status} /></td>
                        <td className="px-4 py-3 relative">
                          <button
                            onClick={() => setOpenMenu(openMenu === ev.id ? null : ev.id)}
                            className="text-gray-400 hover:text-gray-700 transition-colors">
                            <MoreHorizontal size={16} />
                          </button>
                          {openMenu === ev.id && (
                            <RowMenu
                              onClose={() => setOpenMenu(null)}
                              onAttend={() => changeStatus(ev.id, 'Attended')}
                              onCancel={() => changeStatus(ev.id, 'Cancelled')}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    Showing {(page - 1) * ROWS_PER_PAGE + 1}–{Math.min(page * ROWS_PER_PAGE, tableEvents.length)} of {tableEvents.length}
                  </p>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                      className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-400 disabled:opacity-40 transition-all">
                      <ChevronLeft size={13} />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button key={i} onClick={() => setPage(i + 1)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${page === i + 1 ? 'bg-blue-600 text-white' : 'border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600'}`}>
                        {i + 1}
                      </button>
                    ))}
                    <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                      className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-400 disabled:opacity-40 transition-all">
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Mobile Reminders ── */}
            <div className="lg:hidden mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-extrabold text-gray-900 text-sm">Reminders ({reminders.length})</h3>
                <button onClick={() => setShowModal(true)} className="text-blue-600 text-xs font-semibold">+ Add</button>
              </div>
              <div className="space-y-3">
                {reminders.map((r) => (
                  <div key={r.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex items-start gap-2">
                    <Clock size={13} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 leading-snug mb-0.5">{r.title}</p>
                      <p className="text-xs text-gray-400">Time: {r.time}</p>
                      <p className="text-xs text-gray-400">{r.date}</p>
                    </div>
                    <button onClick={() => removeReminder(r.id)} className="text-gray-300 hover:text-red-400 flex-shrink-0">
                      <X size={13} />
                    </button>
                  </div>
                ))}
                {reminders.length === 0 && (
                  <div className="bg-white border border-dashed border-gray-200 rounded-xl p-4 text-center text-xs text-gray-400">
                    No reminders yet. Tap "+ Add" to create one.
                  </div>
                )}
              </div>
            </div>
          </main>

          {/* ═══ DESKTOP REMINDERS PANEL ═══ */}
          <aside className="hidden lg:flex flex-col w-64 bg-white border-l border-gray-100 overflow-y-auto p-5 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-gray-900 text-sm">Reminders ({reminders.length})</h3>
              <button
                onClick={() => setShowModal(true)}
                className="text-blue-600 text-xs font-semibold hover:underline flex items-center gap-0.5">
                <Plus size={12} /> Add
              </button>
            </div>

            <div className="space-y-3 flex-1">
              {reminders.map((r) => (
                <div key={r.id} className="bg-gray-50 border border-gray-100 rounded-xl p-3 group relative">
                  <button
                    onClick={() => removeReminder(r.id)}
                    className="absolute top-2 right-2 text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={12} />
                  </button>
                  <div className="flex items-start gap-2 mb-1 pr-4">
                    <Clock size={13} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs font-semibold text-gray-800 leading-snug">{r.title}</p>
                  </div>
                  <p className="text-xs text-gray-400 pl-5">Time: {r.time}</p>
                  <p className="text-xs text-gray-400 pl-5">{r.date}</p>
                </div>
              ))}
              {reminders.length === 0 && (
                <div className="border border-dashed border-gray-200 rounded-xl p-4 text-center text-xs text-gray-400">
                  No reminders yet.
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© 2026 Team Mike – UI/UX. All rights reserved.</span>
          <div className="flex gap-5">
            {['FAQs', 'Privacy Policy', 'Terms & Condition'].map((l) => (
              <button key={l} className="hover:text-gray-600 transition-colors">{l}</button>
            ))}
          </div>
        </footer>
      </div>

      {/* ── Add Reminder Modal ── */}
      {showModal && <AddReminderModal onClose={() => setShowModal(false)} onAdd={handleAddReminder} />}

      {/* ── Toast notification ── */}
      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      {/* Close menu on outside click */}
      {openMenu && (
        <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
      )}
    </div>
  );
}