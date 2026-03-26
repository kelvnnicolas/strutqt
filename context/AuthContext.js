import React, { createContext, useState, useEffect, useContext } from 'react';
import api, { setAuthToken } from '../utils/api';
import { useRouter } from 'next/router';

const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => { },
  signup: () => { },
  logout: () => { },
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // We attempt to fetch /api/auth/me to see if user is already logged in securely
        // We aren't checking localStorage for tokens in production, but let's see if 
        // the API answers. If we have an accessToken from a previous run, interceptor handles it, 
        // but typically just calling /me triggers auto-refresh if there's an httpOnly cookie.
        
        const { data } = await api.get('/auth/me');
        if (data?.user) {
          setUser(data.user);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data.user);
      setAuthToken(data.accessToken);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const { data } = await api.post('/auth/signup', { name, email, password });
      setUser(data.user);
      setAuthToken(data.accessToken);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Signup failed' };
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
      setAuthToken(null);
      router.push('/');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
