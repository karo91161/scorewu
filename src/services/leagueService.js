// services/leagueService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000';

export async function fetchFixtures() {
  try {
    const response = await axios.get(`${API_URL}/fixtures-live`);
    return response.data;
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    throw error;
  }
}
