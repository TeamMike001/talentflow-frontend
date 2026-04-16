// src/app/admin/events/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { eventService } from '@/services/eventService';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    venue: '',
    time: '',
    eventDate: '',
    daysLeft: 0,
    color: 'bg-blue-600',
    avatarUrl: '',
    ticketsAvailable: 100,
    published: false,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getAllEvents();
      setEvents(data || []);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await eventService.updateEvent(editingEvent.id, formData);
        alert('Event updated successfully');
      } else {
        await eventService.createEvent(formData);
        alert('Event created successfully');
      }
      setShowModal(false);
      setEditingEvent(null);
      fetchEvents();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.deleteEvent(id);
        fetchEvents();
        alert('Event deleted successfully');
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      venue: '',
      time: '',
      eventDate: '',
      daysLeft: 0,
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
      daysLeft: event.daysLeft,
      color: event.color,
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
          <h1 className="text-2xl font-bold">Manage Events</h1>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark"
          >
            <Plus size={18} /> Create Event
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Venue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Tickets</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{event.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{event.venue}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(event.eventDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{event.ticketsAvailable}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${event.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {event.published ? 'Published' : 'Draft'}
                    </span>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Create/Edit Event */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold mb-4">{editingEvent ? 'Edit Event' : 'Create Event'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-3 border rounded-xl" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="w-full p-3 border rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Venue *</label>
                  <input type="text" value={formData.venue} onChange={(e) => setFormData({ ...formData, venue: e.target.value })} className="w-full p-3 border rounded-xl" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time *</label>
                  <input type="text" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} placeholder="6:00 PM – 8:00 PM WAT" className="w-full p-3 border rounded-xl" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Event Date *</label>
                  <input type="datetime-local" value={formData.eventDate} onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })} className="w-full p-3 border rounded-xl" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Days Left</label>
                  <input type="number" value={formData.daysLeft} onChange={(e) => setFormData({ ...formData, daysLeft: parseInt(e.target.value) })} className="w-full p-3 border rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Card Color</label>
                  <select value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="w-full p-3 border rounded-xl">
                    <option value="bg-blue-600">Blue</option>
                    <option value="bg-green-600">Green</option>
                    <option value="bg-purple-600">Purple</option>
                    <option value="bg-red-600">Red</option>
                    <option value="bg-yellow-600">Yellow</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input type="text" value={formData.avatarUrl} onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })} className="w-full p-3 border rounded-xl" placeholder="https://..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tickets Available</label>
                  <input type="number" value={formData.ticketsAvailable} onChange={(e) => setFormData({ ...formData, ticketsAvailable: parseInt(e.target.value) })} className="w-full p-3 border rounded-xl" />
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <input type="checkbox" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} className="w-5 h-5" />
                  <label className="text-sm font-medium">Publish Event (visible to students)</label>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-primary text-white py-2 rounded-xl hover:bg-primary-dark">
                  {editingEvent ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-300 py-2 rounded-xl hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}