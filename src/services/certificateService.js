// src/services/certificateService.js
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const certificateService = {
  // Get all certificates for the current user
  async getMyCertificates() {
    const response = await fetch(`${API_BASE}/api/certificates`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch certificates');
    }
    return response.json();
  },

  // Download a certificate as PDF
  async downloadCertificate(courseId) {
    const response = await fetch(`${API_BASE}/api/certificates/${courseId}/download`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to download certificate');
    }
    
    return response.blob();
  },
};