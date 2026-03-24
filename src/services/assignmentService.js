import api from "./api";

export function getAssignmentById(assignmentId) {
  return api.get(`/assignments/${assignmentId}`);
}

export function submitAssignment(assignmentId, payload) {
  return api.post(`/assignments/${assignmentId}/submit`, payload);
}
