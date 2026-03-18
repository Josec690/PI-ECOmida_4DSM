export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
export const API_STATIC_URL = `${API_URL}/static/`;
