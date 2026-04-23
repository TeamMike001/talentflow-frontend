// src/app/(student)/student/events/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { eventService } from '@/services/eventService';
import { Calendar, MapPin, Clock, Users, ArrowLeft, CheckCircle, AlertCircle, User, Ticket } from 'lucide-react';

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [availableTickets, setAvailableTickets] = useState(0);

  useEffect(() => {
    fetchEventData();
  }, [id]);

  const fetchEventData = async () => {
    try {
      setLoading(true);
      const [eventData, registered, tickets] = await Promise.all([
        eventService.getEventById(id),
        eventService.isUserRegistered(id).catch(() => false),
        eventService.getAvailableTickets(id).catch(() => 0),
      ]);
      setEvent(eventData);
      setIsRegistered(registered);
      setAvailableTickets(tickets);
    } catch (err) {
      console.error('Failed to fetch event:', err);
      setError(err.message || 'Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (availableTickets <= 0) {
      alert('Sorry, no tickets available for this event.');
      return;
    }
    
    const confirmRegister = window.confirm(`Are you sure you want to register for "${event.title}"?`);
    if (!confirmRegister) return;
    
    setRegistering(true);
    try {
      await eventService.registerForEvent(id);
      alert(`Successfully registered for ${event.title}!`);
      setIsRegistered(true);
      // Refresh available tickets
      const tickets = await eventService.getAvailableTickets(id);
      setAvailableTickets(tickets);
    } catch (err) {
      alert(err.message || 'Failed to register for event');
    } finally {
      setRegistering(false);
    }
  };

  const handleCancelRegistration = async () => {
    const confirmCancel = window.confirm(`Are you sure you want to cancel your registration for "${event.title}"?`);
    if (!confirmCancel) return;
    
    setRegistering(true);
    try {
      await eventService.cancelRegistration(id);
      alert(`Registration cancelled for ${event.title}`);
      setIsRegistered(false);
      const tickets = await eventService.getAvailableTickets(id);
      setAvailableTickets(tickets);
    } catch (err) {
      alert(err.message || 'Failed to cancel registration');
    } finally {
      setRegistering(false);
    }
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

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg max-w-md">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error || 'Event not found'}</p>
          <button onClick={() => router.back()} className="bg-primary text-white px-6 py-2 rounded-xl">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const registeredCount = event.ticketsAvailable - availableTickets;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-56 flex flex-col min-w-0">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft size={20} /> Back to Events
          </button>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-64 md:h-80 overflow-hidden">
              <img 
                src={event.avatarUrl || 'https://via.placeholder.com/1200x400?text=Event+Banner'} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin size={18} className="text-primary" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar size={18} className="text-primary" />
                  <span>{formatDate(event.eventDate)}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock size={18} className="text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Ticket size={18} className="text-primary" />
                  <span>{availableTickets} tickets available</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">About This Event</h2>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Registered Attendees</span>
                  <span className="text-sm font-semibold text-gray-700">{registeredCount} / {event.ticketsAvailable}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary rounded-full h-2 transition-all duration-500"
                    style={{ width: `${(registeredCount / event.ticketsAvailable) * 100}%` }}
                  />
                </div>
              </div>
              
              {isRegistered ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-xl">
                    <CheckCircle size={20} />
                    <span className="font-medium">You are registered for this event!</span>
                  </div>
                  <button
                    onClick={handleCancelRegistration}
                    disabled={registering}
                    className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-all disabled:opacity-50"
                  >
                    {registering ? 'Processing...' : 'Cancel Registration'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={registering || availableTickets <= 0}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    availableTickets > 0
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {registering ? 'Processing...' : 
                   availableTickets > 0 ? 'Register for this Event' : 'Sold Out'}
                </button>
              )}
            </div>
          </div>
        </main>
        
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