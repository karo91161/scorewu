import axios from 'axios';

const API_URL = 'http://localhost:3000';

export async function fetchPredictionForToday() {
  try {
    const response = await axios.get(`${API_URL}/api/prediction-today`);
    return response.data;
  } catch (error) {
    console.error('Error fetching prediction:', error);
    throw error;
  }
}
