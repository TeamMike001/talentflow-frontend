// src/services/bookmarkService.js
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const bookmarkService = {
  async addBookmark(courseId) {
    const response = await fetch(`${API_BASE}/api/bookmarks/${courseId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to add bookmark');
    }
    return response.json();
  },

  async removeBookmark(courseId) {
    const response = await fetch(`${API_BASE}/api/bookmarks/${courseId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to remove bookmark');
    }
    return true;
  },

  async getMyBookmarks() {
    const response = await fetch(`${API_BASE}/api/bookmarks`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch bookmarks');
    }
    return response.json();
  },

  async isBookmarked(courseId) {
    try {
      const bookmarks = await this.getMyBookmarks();
      return bookmarks.some(b => b.courseId === courseId);
    } catch {
      return false;
    }
  },
};