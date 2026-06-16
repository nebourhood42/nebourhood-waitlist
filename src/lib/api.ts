import axios from 'axios';

const api = axios.create({
  baseURL: 'https://waitlist-api.nebourhood.org',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const sessionStr = localStorage.getItem('auth_session');
      if (sessionStr) {
        try {
          const session = JSON.parse(sessionStr);
          if (session && session.token) {
            config.headers.Authorization = `Bearer ${session.token}`;
          }
        } catch (err) {
          console.error('Failed to parse auth_session from localStorage:', err);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
