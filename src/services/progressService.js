const API_BASE_URL = 'http://localhost:8080';

export const progressService = {
  async getCourseProgress(courseId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/progress/courses/${courseId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch progress');
      const data = await response.json();
      return data.progress || 0;
    } catch (error) {
      console.error('Failed to fetch course progress:', error);
      return 0;
    }
  },
  
  async markLectureComplete(courseId, lectureId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/progress/courses/${courseId}/lectures/${lectureId}/watch`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Failed to mark lecture as complete');
    return response.json();
  },
  
  async getLectureStatus(lectureId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/progress/lectures/${lectureId}/status`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch lecture status');
      const data = await response.json();
      return data.watched || false;
    } catch (error) {
      console.error('Failed to get lecture status:', error);
      return false;
    }
  },
  
  async getAllLecturesProgress(courseId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/progress/courses/${courseId}/lectures`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch lectures progress');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to get lectures progress:', error);
      return {};
    }
  }
};