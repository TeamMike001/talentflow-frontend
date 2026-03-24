import api from "./api";

export function signIn(payload) {
  return api.post("/auth/signin", payload);
}

export function signUp(payload) {
  return api.post("/auth/signup", payload);
}
