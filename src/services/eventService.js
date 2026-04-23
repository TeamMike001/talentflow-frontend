// src/services/eventService.js
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const eventService = {
  async getPublishedEvents() {
    const response = await fetch(`${API_BASE}/api/events/published`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch events');
    return response.json();
  },

  async getAllEvents() {
    const response = await fetch(`${API_BASE}/api/events`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch events');
    return response.json();
  },

  async getEventById(id) {
    const response = await fetch(`${API_BASE}/api/events/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch event');
    return response.json();
  },

  async createEvent(data) {
    const response = await fetch(`${API_BASE}/api/events`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to create event');
    }
    return response.json();
  },

  async updateEvent(id, data) {
    const response = await fetch(`${API_BASE}/api/events/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to update event');
    }
    return response.json();
  },

  async deleteEvent(id) {
    const response = await fetch(`${API_BASE}/api/events/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete event');
    return true;
  },
  async registerForEvent(eventId) {
  const response = await fetch(`${API_BASE}/api/events/${eventId}/register`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to register for event');
  }
  return response.text();
},

async cancelRegistration(eventId) {
  const response = await fetch(`${API_BASE}/api/events/${eventId}/cancel`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to cancel registration');
  }
  return true;
},

async isUserRegistered(eventId) {
  const response = await fetch(`${API_BASE}/api/events/${eventId}/registered`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) return false;
  return response.json();
},

async getAvailableTickets(eventId) {
  const response = await fetch(`${API_BASE}/api/events/${eventId}/available-tickets`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) return 0;
  return response.json();
},

async getMyRegistrations() {
  const response = await fetch(`${API_BASE}/api/events/my-registrations`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch registrations');
  return response.json();
},
};