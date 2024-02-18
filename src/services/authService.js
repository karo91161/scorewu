// services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Change this to your backend API URL

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data.error || 'An error occurred during login.';
  }
};
