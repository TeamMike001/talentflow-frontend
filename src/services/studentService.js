// src/services/studentService.js
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const studentService = {
  // Only recommended / published courses (no enrollment)
  async getRecommendedCourses() {
    const response = await fetch(`${API_BASE}/api/courses/published`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to load recommended courses');
    }
    return response.json();
  },
};