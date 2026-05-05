import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [token]);

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
    } catch (error) {
      setToken(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    try {
      const response = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
        confirmPassword,
      });
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed',
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
