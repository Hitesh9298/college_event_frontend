

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://clgevent-back.onrender.com/api';

// Configure axios with auth token
const api = axios.create({
  baseURL: API_URL
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

// Profile-related API endpoints
export const getUserProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const formData = new FormData();
    Object.keys(userData).forEach(key => {
      if (userData[key] !== null) {
        formData.append(key, userData[key]);
      }
    });
    
    const response = await api.put('/auth/profile', formData);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

export const changePassword = async (passwordData) => {
  const response = await api.put('/user/password', passwordData);
  return response.data;
};


export const getEvents = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
      }
    });
    const response = await api.get(`/events?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// ✅ FIXED `createEvent` function (No JSON.stringify for FormData)
export const createEvent = async (eventData) => {
  try {
    console.log("Sending event data:", eventData);

    const response = await api.post('/events', eventData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating event:", error.response?.data);
    if (error.response?.data) {
      throw error.response.data;
    }
    throw {
      message: "Network error or server unavailable",
      errors: [{ msg: "Could not connect to server" }],
    };
  }
};



export const deleteEvent = async (eventId) => {
  try {
    const response = await api.delete(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

export const registerForEvent = async (eventId) => {
  try {
    const response = await api.post(`/events/${eventId}/register`);
    return response.data;
  } catch (error) {
    console.error('Error registering for event:', error);
    throw error;
  }
};

export const getSavedEvents = async () => {
  try {
    const response = await api.get('/events/user/saved');
    return response.data;
  } catch (error) {
    console.error('Error fetching saved events:', error);
    throw error;
  }
};

export const saveEvent = async (eventId) => {
  try {
    const response = await api.post(`/events/${eventId}/save`);
    return response.data;
  } catch (error) {
    console.error('Error saving event:', error);
    throw error;
  }
};

export const getEventById = async (eventId) => {
  try {
    const response = await api.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};