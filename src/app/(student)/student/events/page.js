// src/app/(student)/student/events/page.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { Calendar, MapPin, Clock, Ticket, CheckCircle, AlertCircle, X } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://talentflow-backend-9hue.onrender.com';

export default function StudentEventsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registering, setRegistering] = useState({});
  const [registeredEvents, setRegisteredEvents] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const router = useRouter();

  // Calculate days remaining until event
  const getDaysRemaining = (eventDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const event = new Date(eventDate);
    event.setHours(0, 0, 0, 0);
    const diffTime = event - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Format date for display
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatEventTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const fetchEvents = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/events/public`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Calculate days remaining for each event
        const eventsWithDays = data.map(event => ({
          ...event,
          daysRemaining: getDaysRemaining(event.eventDate),
          isPast: new Date(event.eventDate) < new Date(),
          availableTickets: event.ticketsAvailable - (event.registeredCount || 0)
        }));
        setEvents(eventsWithDays);
      } else if (response.status === 403) {
        setError('Access denied. Please login again.');
      } else {
        setError('Failed to load events');
      }
    } catch (err) {
      setError('Error loading events');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRegisteredEvents = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/events/my-registrations`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        const registeredMap = {};
        data.forEach(event => {
          registeredMap[event.id] = true;
        });
        setRegisteredEvents(registeredMap);
      }
    } catch (err) {
      console.error('Failed to fetch registered events:', err);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    fetchEvents();
    fetchRegisteredEvents();
  }, [fetchEvents, fetchRegisteredEvents, router]);

  const registerForEvent = async (eventId) => {
    setRegistering(prev => ({ ...prev, [eventId]: true }));
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/events/${eventId}/register`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Successfully registered for the event!');
        await Promise.all([fetchEvents(), fetchRegisteredEvents()]);
      } else {
        alert(data.message || data.error || 'Failed to register for event');
      }
    } catch (err) {
      console.error('Error registering for event:', err);
      alert('Error registering for event. Please try again.');
    } finally {
      setRegistering(prev => ({ ...prev, [eventId]: false }));
    }
  };

  const cancelRegistration = async (eventId) => {
    if (!confirm('Are you sure you want to cancel your registration?')) return;
    
    setRegistering(prev => ({ ...prev, [eventId]: true }));
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/events/${eventId}/cancel`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        alert('Registration cancelled successfully!');
        await Promise.all([fetchEvents(), fetchRegisteredEvents()]);
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to cancel registration');
      }
    } catch (err) {
      console.error('Error cancelling registration:', err);
      alert('Error cancelling registration. Please try again.');
    } finally {
      setRegistering(prev => ({ ...prev, [eventId]: false }));
    }
  };

  const viewEventDetails = (event) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  const getStatusMessage = (event) => {
    if (event.isPast) {
      return { text: 'Event Ended', color: 'bg-gray-100 text-gray-500' };
    }
    if (event.daysRemaining === 0) {
      return { text: 'Today!', color: 'bg-orange-100 text-orange-700' };
    }
    if (event.daysRemaining < 0) {
      return { text: 'Past Event', color: 'bg-gray-100 text-gray-500' };
    }
    if (event.daysRemaining <= 3) {
      return { text: `${event.daysRemaining} days left`, color: 'bg-orange-100 text-orange-700' };
    }
    return { text: `${event.daysRemaining} days left`, color: 'bg-green-100 text-green-700' };
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
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
              <p className="text-gray-500 mt-2">Join live sessions, webinars, and workshops</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 flex items-center gap-2">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {events.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border">
                <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">No upcoming events at the moment</p>
                <p className="text-sm text-gray-400 mt-2">Check back later for new events!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => {
                  const isRegistered = registeredEvents[event.id] === true;
                  const isSoldOut = event.availableTickets <= 0;
                  const status = getStatusMessage(event);
                  
                  return (
                    <div 
                      key={event.id} 
                      className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                      onClick={() => viewEventDetails(event)}
                    >
                      {/* Event Image/Banner */}
                      <div className={`relative h-48 ${event.color || 'bg-gradient-to-r from-blue-500 to-purple-600'}`}>
                        {event.avatarUrl ? (
                          <img 
                            src={event.avatarUrl} 
                            alt={event.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = ''; }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Calendar size={48} className="text-white/50" />
                          </div>
                        )}
                        
                        {/* Status Badge */}
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${status.color}`}>
                          {status.text}
                        </div>
                        
                        {/* Published/Draft Badge */}
                        {!event.published && (
                          <div className="absolute top-4 left-4 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                            Draft
                          </div>
                        )}
                      </div>
                      
                      <div className="p-5">
                        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {event.title}
                        </h2>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Calendar size={14} />
                            <span>{formatEventDate(event.eventDate)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Clock size={14} />
                            <span>{formatEventTime(event.eventDate)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <MapPin size={14} />
                            <span>{event.venue || 'Online'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Ticket size={14} />
                            <span className={event.availableTickets <= 5 && event.availableTickets > 0 ? 'text-orange-600 font-semibold' : ''}>
                              {event.availableTickets} ticket{event.availableTickets !== 1 ? 's' : ''} available
                            </span>
                          </div>
                        </div>
                        
                        {event.isPast ? (
                          <div className="w-full py-2.5 bg-gray-100 text-gray-500 rounded-xl text-center font-semibold">
                            Event Ended
                          </div>
                        ) : isRegistered ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              cancelRegistration(event.id);
                            }}
                            disabled={registering[event.id]}
                            className="w-full py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                          >
                            {registering[event.id] ? 'Cancelling...' : 'Cancel Registration'}
                          </button>
                        ) : !event.published ? (
                          <div className="w-full py-2.5 bg-gray-100 text-gray-500 rounded-xl text-center font-semibold">
                            Coming Soon
                          </div>
                        ) : isSoldOut ? (
                          <div className="w-full py-2.5 bg-gray-300 text-gray-500 rounded-xl text-center font-semibold cursor-not-allowed">
                            Sold Out
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              registerForEvent(event.id);
                            }}
                            disabled={registering[event.id]}
                            className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                          >
                            {registering[event.id] ? 'Registering...' : 'Register Now'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Event Details Modal */}
      {showDetailsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailsModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className={`relative h-48 ${selectedEvent.color || 'bg-gradient-to-r from-blue-500 to-purple-600'}`}>
              {selectedEvent.avatarUrl ? (
                <img 
                  src={selectedEvent.avatarUrl} 
                  alt={selectedEvent.title} 
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => { e.target.src = ''; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Calendar size={48} className="text-white/50" />
                </div>
              )}
              <button
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedEvent.title}</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} className="text-blue-500" />
                  <span className="text-sm">{formatEventDate(selectedEvent.eventDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} className="text-blue-500" />
                  <span className="text-sm">{formatEventTime(selectedEvent.eventDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} className="text-blue-500" />
                  <span className="text-sm">{selectedEvent.venue || 'Online'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Ticket size={16} className="text-blue-500" />
                  <span className="text-sm">{selectedEvent.availableTickets} tickets remaining</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">About This Event</h3>
                <p className="text-gray-600 leading-relaxed">{selectedEvent.description}</p>
              </div>

              {/* Progress Bar for Tickets */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Registration Progress</span>
                  <span>{selectedEvent.registeredCount || 0} / {selectedEvent.ticketsAvailable} registered</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${((selectedEvent.registeredCount || 0) / selectedEvent.ticketsAvailable) * 100}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              {!selectedEvent.isPast && (
                registeredEvents[selectedEvent.id] ? (
                  <button
                    onClick={() => {
                      cancelRegistration(selectedEvent.id);
                      setShowDetailsModal(false);
                    }}
                    disabled={registering[selectedEvent.id]}
                    className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {registering[selectedEvent.id] ? 'Cancelling...' : 'Cancel Registration'}
                  </button>
                ) : selectedEvent.availableTickets > 0 && selectedEvent.published ? (
                  <button
                    onClick={() => {
                      registerForEvent(selectedEvent.id);
                      setShowDetailsModal(false);
                    }}
                    disabled={registering[selectedEvent.id]}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {registering[selectedEvent.id] ? 'Registering...' : 'Register for Event'}
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed"
                  >
                    {!selectedEvent.published ? 'Coming Soon' : 'Sold Out'}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}