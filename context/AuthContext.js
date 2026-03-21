import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  signup: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Rehydrate session from localStorage
    const checkAuth = () => {
      try {
        const storedToken = localStorage.getItem('struqt_auth_token');
        const storedUser = localStorage.getItem('struqt_user');
        
        if (storedToken && storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // ensure clean state if token is missing
          localStorage.removeItem('struqt_auth_token');
          localStorage.removeItem('struqt_user');
        }
      } catch (error) {
        console.error('Failed to parse user session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    // Mock API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser = { id: 1, name: email.split('@')[0], email };
          const mockToken = 'mock_jwt_token_12345';
          
          setUser(mockUser);
          localStorage.setItem('struqt_auth_token', mockToken);
          localStorage.setItem('struqt_user', JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };

  const signup = async (name, email, password) => {
    // Mock API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const mockUser = { id: 2, name, email };
          const mockToken = 'mock_jwt_token_67890';
          
          setUser(mockUser);
          localStorage.setItem('struqt_auth_token', mockToken);
          localStorage.setItem('struqt_user', JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error('Missing required fields'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('struqt_auth_token');
    localStorage.removeItem('struqt_user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
