import api from "./api";

export function getProfile() {
  return api.get("/profile");
}

export function updateProfile(payload) {
  return api.put("/profile", payload);
}
