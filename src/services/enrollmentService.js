// src/services/enrollmentService.js
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const enrollmentService = {
  async enroll(courseId) {
    const response = await fetch(`${API_BASE}/api/enrollments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ courseId }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to enroll in course');
    }
    return response.json();
  },

  async unenroll(courseId) {
    const response = await fetch(`${API_BASE}/api/enrollments/${courseId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to unenroll from course');
    }
    return true;
  },

  async checkEnrollment(courseId) {
    const response = await fetch(`${API_BASE}/api/enrollments/check/${courseId}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      return false;
    }
    return response.json();
  },

  async getMyEnrollments() {
    const response = await fetch(`${API_BASE}/api/enrollments/my`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch your enrollments');
    }
    return response.json();
  },
};