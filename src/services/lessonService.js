import { apiFetch } from './api';

export const lessonService = {
  getLessonsByCourse: (courseId) => apiFetch(`/api/courses/${courseId}/lessons`),
  getLesson: (id) => apiFetch(`/api/lessons/${id}`),
  createLesson: (courseId, data) => apiFetch(`/api/courses/${courseId}/lessons`, { method: 'POST', body: JSON.stringify(data) }),
  updateLesson: (id, data) => apiFetch(`/api/lessons/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteLesson: (id) => apiFetch(`/api/lessons/${id}`, { method: 'DELETE' }),
  markComplete: (lessonId) => apiFetch(`/api/lessons/${lessonId}/complete`, { method: 'POST' }),
};