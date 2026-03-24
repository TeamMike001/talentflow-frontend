import api from "./api";

export function getDiscussions() {
  return api.get("/discussions");
}
