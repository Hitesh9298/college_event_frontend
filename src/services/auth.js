import axios from 'axios';
import { API_URL } from '../config';

const BASE_URL = `${API_URL}/api/auth`;

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      username,
      email,
      password
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('userId', response.data.user._id);
      localStorage.setItem('username', response.data.user.username);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Registration failed';
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password
    });
    
    if (response.data.token) {
      // Store all necessary auth data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('userId', response.data.user._id);
      localStorage.setItem('username', response.data.user.username);
      return true;
    }
    return false;
  } catch (error) {
    throw error.response?.data?.error || 'Login failed';
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return Boolean(token); // Returns true if token exists and is not empty/null
};

export const getCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user || null;
  } catch {
    return null;
  }
};

export const getCurrentUserId = () => {
  return localStorage.getItem('userId');
};
