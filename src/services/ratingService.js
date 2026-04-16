import { apiFetch } from './api';

export const ratingService = {
  createRating: (data) => apiFetch('/api/ratings', { method: 'POST', body: JSON.stringify(data) }),
  getCourseRatings: (courseId) => apiFetch(`/api/ratings/course/${courseId}`),
};