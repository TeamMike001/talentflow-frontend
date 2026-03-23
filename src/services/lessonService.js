import api from "./api";

export function getLessonById(lessonId) {
  return api.get(`/lessons/${lessonId}`);
}
