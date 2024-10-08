import axios from 'axios';
import { getUser } from '../utils/userStorage';

const API_URL = 'https://scorewu-server.onrender.com';

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

export async function fetchTeams(league, season) {
  try {
    const response = await axios.get(`${API_URL}/teams`, {
      params: { league, season }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
}

export async function fetchFavoriteTeams() {
  const USER = await getUser();
  try {
    const response = await axios.get(`${API_URL}/favorites`, {
      params: {
        userId: USER.id
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite teams:', error);
    throw error;
  }
}

export async function addFavoriteTeam(teamId) {
  const USER = await getUser();
  try {
    const response = await axios.post(`${API_URL}/favorites`, {
      teamId,
      userId: USER.id
    });
    return response.data;
  } catch (error) {
    console.error('Error adding favorite team:', error);
    throw error;
  }
}

export async function removeFavoriteTeam(teamId) {
  const USER = await getUser();
  try {
    const response = await axios.delete(`${API_URL}/favorites`, {
      data: {
        teamId,
        userId: USER.id
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error removing favorite team:', error);
    throw error;
  }
}

export async function fetchTeamById(teamId) {
  try {
    const response = await axios.get(`${API_URL}/team`, {
      params: { id: teamId }
    });
    return response.data.response;
  } catch (error) {
    console.error(`Error fetching team with ID ${teamId}:`, error);
    throw error;
  }
}

export async function fetchTeamPerformance(teamId, season) {
  try {
    const response = await axios.get(`${API_URL}/team-performance`, {
      params: { teamId, season },
    });
    return response.data.performance;
  } catch (error) {
    console.error(`Error fetching team performance:`, error);
    throw error;
  }
}

export async function fetchFixtureById(fixtureId) {
  try {
    const response = await axios.get(`${API_URL}/fixtures/${fixtureId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching fixture with ID ${fixtureId}:`, error);
    throw error;
  }
}