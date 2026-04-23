const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error("No token found. Please login.");
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = `Request failed: ${response.status}`;
    try {
      const error = await response.json();
      errorMessage = error.message || errorMessage;
    } catch (e) {
      // If response is not JSON, try to get text
      try {
        const text = await response.text();
        if (text) errorMessage = text;
      } catch (e2) {}
    }
    throw new Error(errorMessage);
  }
  
  if (response.status === 204) {
    return { success: true };
  }
  
  return response.json();
};

export const assignmentService = {
  // Get all assignments for a course
  getAssignmentsByCourse: async (courseId) => {
    if (!courseId) throw new Error('Course ID is required');
    const response = await fetch(`${API_BASE}/api/courses/${courseId}/assignments`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
  
  // Get single assignment by ID
  getAssignment: async (assignmentId) => {
    if (!assignmentId) throw new Error('Assignment ID is required');
    const response = await fetch(`${API_BASE}/api/assignments/${assignmentId}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
  
  // Create assignment for a course
  createAssignment: async (courseId, data) => {
    if (!courseId) throw new Error('Course ID is required');
    if (!data.title) throw new Error('Assignment title is required');
    const response = await fetch(`${API_BASE}/api/courses/${courseId}/assignments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        title: data.title,
        description: data.description || '',
        dueDate: data.dueDate || null,
        maxScore: data.maxScore || 100
      })
    });
    return handleResponse(response);
  },
  
  // Update assignment
  updateAssignment: async (assignmentId, data) => {
    if (!assignmentId) throw new Error('Assignment ID is required');
    const response = await fetch(`${API_BASE}/api/assignments/${assignmentId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        title: data.title,
        description: data.description || '',
        dueDate: data.dueDate || null,
        maxScore: data.maxScore || 100
      })
    });
    return handleResponse(response);
  },
  
  // Delete assignment
  deleteAssignment: async (assignmentId) => {
    if (!assignmentId) throw new Error('Assignment ID is required');
    const response = await fetch(`${API_BASE}/api/assignments/${assignmentId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
  
  // Submit assignment (for students)
  submitAssignment: async (assignmentId, data) => {
    if (!assignmentId) throw new Error('Assignment ID is required');
    const response = await fetch(`${API_BASE}/api/assignments/${assignmentId}/submit`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        attachmentUrl: data.attachmentUrl || data.fileUrl,
        content: data.content || ''
      })
    });
    return handleResponse(response);
  },
  
  // Grade submission (for instructors)
  gradeSubmission: async (submissionId, score, feedback) => {
    if (!submissionId) throw new Error('Submission ID is required');
    const response = await fetch(`${API_BASE}/api/submissions/${submissionId}/grade?score=${score}&feedback=${encodeURIComponent(feedback || '')}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
  
  // Get all submissions for an assignment (for instructors)
  getSubmissionsForAssignment: async (assignmentId) => {
    if (!assignmentId) throw new Error('Assignment ID is required');
    const response = await fetch(`${API_BASE}/api/assignments/${assignmentId}/submissions`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
  
  // Get my submissions (for students)
  getMySubmissions: async () => {
    const response = await fetch(`${API_BASE}/api/assignments/my-submissions`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
  
  // Get my submission for a specific assignment
  getMySubmissionForAssignment: async (assignmentId) => {
    if (!assignmentId) throw new Error('Assignment ID is required');
    const response = await fetch(`${API_BASE}/api/assignments/${assignmentId}/my-submission`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  }
};