import api from "./api";

export function getCourses() {
  return api.get("/courses");
}

export function getCourseById(courseId) {
  return api.get(`/courses/${courseId}`);
}
