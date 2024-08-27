import axios from 'axios';
import { setUser, removeUser } from '../utils/userStorage';

const API_URL = 'https://scorewu-server.onrender.com';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.message === 'Login successful') {
      setUser(response.data.user);
    }
    return response.data;
  } catch (error) {
    throw error.response.data.error || 'An error occurred during login.';
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    removeUser();
    return response.data;
  } catch (error) {
    throw error.response.data.error || 'An error occurred during logout.';
  }
};

export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    if (response.data.message === 'User registered successfully') {
      setUser(response.data.user);
    }
    return response.data;
  } catch (error) {
    throw error.response.data.error || 'An error occurred during registration.';
  }
};
