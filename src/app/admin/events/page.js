// src/app/admin/events/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Users, X } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://talentflow-backend-9hue.onrender.com';

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showRegistrantsModal, setShowRegistrantsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrants, setRegistrants] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    venue: '',
    time: '',
    eventDate: '',
    color: 'bg-blue-600',
    avatarUrl: '',
    ticketsAvailable: 100,
    published: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!token || user.role !== 'ADMIN') {
      router.push('/admin/login');
      return;
    }
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/events`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrants = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/events/${eventId}/registrants`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRegistrants(data);
      } else {
        setRegistrants([]);
      }
    } catch (err) {
      console.error('Failed to fetch registrants:', err);
      setRegistrants([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const url = editingEvent 
        ? `${API_BASE_URL}/api/admin/events/${editingEvent.id}`
        : `${API_BASE_URL}/api/admin/events`;
      
      const method = editingEvent ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert(editingEvent ? 'Event updated successfully' : 'Event created successfully');
        setShowModal(false);
        setEditingEvent(null);
        fetchEvents();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to save event');
      }
    } catch (err) {
      alert(err.message || 'Failed to save event');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/admin/events/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          fetchEvents();
          alert('Event deleted successfully');
        } else {
          alert('Failed to delete event');
        }
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const togglePublish = async (event) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/events/${event.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...event, published: !event.published })
      });
      
      if (response.ok) {
        fetchEvents();
        alert(`Event ${!event.published ? 'published' : 'unpublished'} successfully`);
      }
    } catch (err) {
      alert('Failed to update event status');
    }
  };

  const viewRegistrants = async (event) => {
    setSelectedEvent(event);
    await fetchRegistrants(event.id);
    setShowRegistrantsModal(true);
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      venue: '',
      time: '',
      eventDate: '',
      color: 'bg-blue-600',
      avatarUrl: '',
      ticketsAvailable: 100,
      published: false,
    });
    setShowModal(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      venue: event.venue,
      time: event.time,
      eventDate: event.eventDate?.slice(0, 16) || '',
      color: event.color || 'bg-blue-600',
      avatarUrl: event.avatarUrl || '',
      ticketsAvailable: event.ticketsAvailable,
      published: event.published,
    });
    setShowModal(true);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
            <p className="text-gray-500 mt-1">Create and manage events for students</p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} /> Create Event
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tickets</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registered</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Available</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {events.map((event) => {
                  const registeredCount = event.registeredCount || 0;
                  const availableTickets = event.ticketsAvailable - registeredCount;
                  
                  return (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{event.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{event.venue || 'Online'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(event.eventDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{event.ticketsAvailable}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <button
                          onClick={() => viewRegistrants(event)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        >
                          <Users size={16} /> {registeredCount}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <span className={availableTickets <= 5 && availableTickets > 0 ? 'text-orange-600 font-semibold' : 'text-gray-500'}>
                          {availableTickets}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => togglePublish(event)}
                          className={`px-2 py-1 text-xs rounded-full ${
                            event.published 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          }`}
                        >
                          {event.published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex gap-2">
                          <button onClick={() => openEditModal(event)} className="text-blue-600 hover:text-blue-800">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-800">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create/Edit Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingEvent ? 'Edit Event' : 'Create Event'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                  rows={4} 
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Venue</label>
                  <input 
                    type="text" 
                    value={formData.venue} 
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })} 
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" 
                    placeholder="Online or physical location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input 
                    type="text" 
                    value={formData.time} 
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })} 
                    placeholder="6:00 PM – 8:00 PM" 
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Event Date *</label>
                  <input 
                    type="datetime-local" 
                    value={formData.eventDate} 
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })} 
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Total Tickets</label>
                  <input 
                    type="number" 
                    value={formData.ticketsAvailable} 
                    onChange={(e) => setFormData({ ...formData, ticketsAvailable: parseInt(e.target.value) })} 
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" 
                    min="1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Card Color</label>
                  <select 
                    value={formData.color} 
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })} 
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bg-blue-600">Blue</option>
                    <option value="bg-green-600">Green</option>
                    <option value="bg-purple-600">Purple</option>
                    <option value="bg-red-600">Red</option>
                    <option value="bg-yellow-600">Yellow</option>
                    <option value="bg-indigo-600">Indigo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL (Optional)</label>
                  <input 
                    type="text" 
                    value={formData.avatarUrl} 
                    onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })} 
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" 
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={formData.published} 
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })} 
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                />
                <label className="text-sm font-medium text-gray-700">Publish Event (visible to students immediately)</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {submitting ? 'Saving...' : (editingEvent ? 'Update Event' : 'Create Event')}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="flex-1 border border-gray-300 py-2 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Registrants Modal */}
      {showRegistrantsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h2 className="text-xl font-bold">Registered Students</h2>
                <p className="text-gray-500 text-sm mt-1">{selectedEvent.title}</p>
              </div>
              <button 
                onClick={() => setShowRegistrantsModal(false)} 
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {registrants.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users size={48} className="mx-auto mb-3 text-gray-300" />
                  <p>No students registered for this event yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {registrants.map((registrant, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">{registrant.studentName}</p>
                        <p className="text-sm text-gray-500">{registrant.studentEmail}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Registered on</p>
                        <p className="text-sm font-medium text-gray-700">
                          {new Date(registrant.registeredAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total Registered:</span>
                  <span className="text-lg font-bold text-blue-600">{registrants.length}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">Tickets Remaining:</span>
                  <span className="text-lg font-bold text-green-600">{selectedEvent.ticketsAvailable - registrants.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}