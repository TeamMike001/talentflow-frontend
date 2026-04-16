const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const authService = {
  async login(email, password) {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Invalid email or password');
    }
    return response.json();
  },

  async register(name, email, password, role) {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Registration failed');
    }
    return response.json();
  },

  googleLogin() {
    window.location.href = `${API_BASE}/oauth2/authorization/google`;
  },
};