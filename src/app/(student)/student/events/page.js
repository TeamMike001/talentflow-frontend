// src/app/(student)/student/events/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { Calendar, MapPin, Clock, Users, Ticket, CheckCircle } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export default function StudentEventsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch published events
      const eventsRes = await fetch(`${API_BASE_URL}/api/events/public`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        setEvents(eventsData);
        
        // Check registration status for each event
        const regStatus = {};
        for (const event of eventsData) {
          const regRes = await fetch(`${API_BASE_URL}/api/events/${event.id}/registered`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (regRes.ok) {
            const data = await regRes.json();
            regStatus[event.id] = data.registered;
          }
        }
        setRegisteredEvents(regStatus);
      }
    } catch (err) {
      setError('Error loading events');
    } finally {
      setLoading(false);
    }
  };

  const registerForEvent = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/events/${eventId}/register`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        alert('Successfully registered for the event!');
        await fetchEvents();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to register');
      }
    } catch (err) {
      alert('Error registering for event');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-56 flex flex-col">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
              <p className="text-gray-500 mt-2">Join live sessions, webinars, and workshops</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6">{error}</div>
            )}

            {events.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border">
                <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">No upcoming events at the moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-all">
                    <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar size={48} className="text-white/50" />
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h2>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Calendar size={14} />
                          <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <MapPin size={14} />
                          <span>{event.venue || 'Online'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Ticket size={14} />
                          <span>{event.ticketsAvailable - (event.registeredCount || 0)} tickets left</span>
                        </div>
                      </div>
                      
                      {registeredEvents[event.id] ? (
                        <div className="flex items-center justify-center gap-2 py-2 bg-green-50 text-green-600 rounded-xl">
                          <CheckCircle size={16} /> Registered
                        </div>
                      ) : (
                        <button
                          onClick={() => registerForEvent(event.id)}
                          disabled={(event.ticketsAvailable - (event.registeredCount || 0)) <= 0}
                          className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          Register Now
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}