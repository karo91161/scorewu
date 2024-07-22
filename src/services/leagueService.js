// services/leagueService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000';

export async function fetchFixtures(page = 1, limit = 50) {
  try {
    const response = await axios.get(`${API_URL}/fixtures-live`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    throw error;
  }
}

export async function fetchTodayFixtures(page = 1, limit = 50) {
  try {
    const response = await axios.get(`${API_URL}/fixtures-today`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching today\'s fixtures:', error);
    throw error;
  }
}