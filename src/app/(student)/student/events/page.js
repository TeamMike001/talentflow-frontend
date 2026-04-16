// src/app/(student)/student/events/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { eventService } from '@/services/eventService';
import { Calendar, MapPin, Clock, Users, CheckCircle } from 'lucide-react';

export default function EventsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registering, setRegistering] = useState({});
  const [registeredEvents, setRegisteredEvents] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetchEvents();
    fetchRegisteredStatus();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventService.getPublishedEvents();
      setEvents(data || []);
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const fetchRegisteredStatus = async () => {
    try {
      const registered = await eventService.getMyRegistrations();
      const statusMap = {};
      registered.forEach(event => {
        statusMap[event.id] = true;
      });
      setRegisteredEvents(statusMap);
    } catch (err) {
      console.error('Failed to fetch registrations:', err);
    }
  };

  const handleRegister = async (eventId, eventTitle, availableTickets) => {
    if (availableTickets <= 0) {
      alert('Sorry, no tickets available for this event.');
      return;
    }
    
    const confirmRegister = window.confirm(`Are you sure you want to register for "${eventTitle}"?`);
    if (!confirmRegister) return;
    
    setRegistering(prev => ({ ...prev, [eventId]: true }));
    try {
      await eventService.registerForEvent(eventId);
      alert(`Successfully registered for ${eventTitle}!`);
      setRegisteredEvents(prev => ({ ...prev, [eventId]: true }));
      // Refresh events to update ticket count
      fetchEvents();
    } catch (err) {
      alert(err.message || 'Failed to register for event');
    } finally {
      setRegistering(prev => ({ ...prev, [eventId]: false }));
    }
  };

  const handleViewEvent = (eventId) => {
    router.push(`/student/events/${eventId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-w-0">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-extrabold text-gray-900">Events</h1>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-2xl mb-6">
                {error}
              </div>
            )}

            {events.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border">
                <Calendar size={64} className="mx-auto mb-4 text-gray-300" />
                <h2 className="text-xl font-bold text-gray-700 mb-2">No Events Yet</h2>
                <p className="text-gray-500">Check back later for upcoming events.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => {
                  const isRegistered = registeredEvents[event.id];
                  const availableTickets = event.ticketsAvailable - (event.registeredCount || 0);
                  
                  return (
                    <div 
                      key={event.id} 
                      onClick={() => handleViewEvent(event.id)}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="h-40 overflow-hidden bg-gray-100">
                        <img 
                          src={event.avatarUrl || 'https://via.placeholder.com/400x200?text=Event'} 
                          alt={event.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{event.description}</p>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-primary flex-shrink-0" />
                            <span className="truncate">{event.venue}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-primary flex-shrink-0" />
                            <span>{formatDate(event.eventDate)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-primary flex-shrink-0" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={14} className="text-primary flex-shrink-0" />
                            <span>{availableTickets} tickets available</span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          {isRegistered ? (
                            <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 py-2 rounded-lg">
                              <CheckCircle size={14} />
                              <span className="text-sm font-medium">Registered</span>
                            </div>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRegister(event.id, event.title, availableTickets);
                              }}
                              disabled={registering[event.id] || availableTickets <= 0}
                              className={`w-full py-2 rounded-lg text-sm font-semibold transition-all ${
                                availableTickets > 0
                                  ? 'bg-primary text-white hover:bg-primary-dark'
                                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              {registering[event.id] ? 'Registering...' : 
                               availableTickets > 0 ? 'Register Now' : 'Sold Out'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>

        <footer className="bg-white border-t border-gray-100 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© 2026 Team Mike – UI/UX. All rights reserved.</span>
          <div className="flex gap-5">
            {['FAQs', 'Privacy Policy', 'Terms & Condition'].map(l => <button key={l} className="hover:text-primary">{l}</button>)}
          </div>
        </footer>
      </div>
    </div>
  );
}