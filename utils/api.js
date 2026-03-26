import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true // Important for sending/receiving httpOnly cookies
});

// Response interceptor to handle 401 Unauthorized (Expired Token)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't already retried this exact request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token using the httpOnly cookie
        const { data } = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
        
        // If successful, update the header for the failed request and retry
        api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, user must log in again.
        // The AuthContext will catch this and clear state.
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// We can export a function to programmatically set the token initially
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
