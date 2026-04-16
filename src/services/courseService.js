// src/services/courseService.js
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const courseService = {
  // Get all published courses
  async getPublishedCourses() {
    const response = await fetch(`${API_BASE}/api/courses/published`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch published courses');
    }
    return response.json();
  },

  // Get a single course by ID
  async getCourseById(id) {
    if (!id) {
      throw new Error('Course ID is required');
    }
    
    const response = await fetch(`${API_BASE}/api/courses/${id}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Course not found');
      }
      if (response.status === 400) {
        throw new Error('Invalid course ID');
      }
      if (response.status === 401) {
        throw new Error('Please login again');
      }
      throw new Error('Failed to fetch course');
    }
    return response.json();
  },

  // Get courses by category
  async getCoursesByCategory(category) {
    const response = await fetch(`${API_BASE}/api/courses?category=${category}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch courses by category');
    }
    return response.json();
  },

  // Get enrolled courses for student
  async getEnrolledCourses() {
    const response = await fetch(`${API_BASE}/api/enrollments/my-courses`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch enrolled courses');
    }
    return response.json();
  },
};