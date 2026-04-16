const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("No token found. Please login.");
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const instructorService = {
  async createCourse(courseData) {
    const response = await fetch(`${API_BASE}/api/courses`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to create course');
    }
    return response.json();
  },

  async getMyCourses() {
    const response = await fetch(`${API_BASE}/api/courses/my-courses`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch your courses');
    return response.json();
  },

  async getCourse(courseId) {
    const response = await fetch(`${API_BASE}/api/courses/${courseId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch course');
    return response.json();
  },

 async updateCourse(courseId, courseData) {
    const response = await fetch(`${API_BASE}/api/courses/${courseId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      let errorMsg = 'Failed to update course';
      try {
        const errorJson = JSON.parse(errorText);
        errorMsg = errorJson.message || errorMsg;
      } catch {}
      throw new Error(errorMsg);
    }
    return response.json();
  },

  async deleteCourse(courseId) {
    const response = await fetch(`${API_BASE}/api/courses/${courseId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete course');
    return true;
  },
};