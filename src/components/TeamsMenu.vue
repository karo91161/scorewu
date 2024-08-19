<template>
  <div class="teams-container">
    <h1>{{ $t('teams.title') }}</h1>
    <div v-if="loading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else>
      <div v-for="(league, index) in leagues" :key="league.id" class="league-section">
        <h2 @click="toggleLeague(index)">
          {{ league.name }} - {{ league.season }}
          <span class="toggle-icon">{{ isOpen(index) ? '-' : '+' }}</span>
        </h2>
        <div v-show="isOpen(index)" class="teams-grid">
          <div v-for="team in league.teams" :key="team.team.id" class="team-card">
            <img :src="team.team.logo" :alt="team.team.name" class="team-logo"/>
            <div class="team-info">
              <h3>{{ team.team.name }}</h3>
              <p>{{ team.venue.name }}, {{ team.venue.city }}</p>
            </div>
            <span class="favorite-icon" @click="toggleFavorite(team.team.id)">
              <i :class="isFavorite(team.team.id) ? 'mdi mdi-star' : 'mdi mdi-star-outline'"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchTeams, fetchFavoriteTeams, addFavoriteTeam, removeFavoriteTeam } from '@/services/leagueService';

export default {
  data() {
    return {
      leagues: [
        { id: 39, name: 'Premier League', season: 2024, teams: [] },
        { id: 140, name: 'La Liga', season: 2024, teams: [] },
        { id: 78, name: 'Bundesliga', season: 2024, teams: [] },
        { id: 135, name: 'Serie A', season: 2024, teams: [] },
        { id: 61, name: 'Ligue 1', season: 2024, teams: [] }
      ],
      openLeagues: [],
      favoriteTeams: [],
      loading: true,
    };
  },
  mounted() {
    this.fetchTeams();
    this.loadFavorites();
  },
  methods: {
    async fetchTeams() {
      try {
        for (let league of this.leagues) {
          const response = await fetchTeams(league.id, league.season);
          if (response && response.response) {
            league.teams = response.response;
          } else {
            console.error(`Invalid response format for league ${league.name}`);
          }
        }
      } catch (error) {
        console.error(`Error fetching teams for league:`, error);
      } finally {
        this.loading = false;
      }
    },
    async loadFavorites() {
      try {
        const response = await fetchFavoriteTeams();
        this.favoriteTeams = response;
      } catch (error) {
        console.error('Failed to load favorite teams:', error);
      }
    },
    toggleLeague(index) {
      const pos = this.openLeagues.indexOf(index);
      if (pos > -1) {
        this.openLeagues.splice(pos, 1);
      } else {
        this.openLeagues.push(index);
      }
    },
    isOpen(index) {
      return this.openLeagues.includes(index);
    },
    async toggleFavorite(teamId) {
      const index = this.favoriteTeams.indexOf(teamId);
      if (index === -1) {
        this.favoriteTeams.push(teamId);
        await this.updateFavoriteStatus(teamId, 'add');
      } else {
        this.favoriteTeams.splice(index, 1);
        await this.updateFavoriteStatus(teamId, 'remove');
      }
    },
    async updateFavoriteStatus(teamId, action) {
      try {
        if (action === 'add') {
          await addFavoriteTeam(teamId);
        } else {
          await removeFavoriteTeam(teamId);
        }
      } catch (error) {
        console.error('Failed to update favorite status:', error);
      }
    },
    isFavorite(teamId) {
      return this.favoriteTeams.includes(teamId);
    }
  }
};
</script>

<style scoped>
.teams-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
}

h1 {
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 40px;
  color: var(--darker-app-color);
}

.league-section {
  margin-bottom: 40px;
}

.league-section h2 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-icon {
  font-size: 1.5em;
}

.teams-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.team-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  flex: 1 1 calc(25% - 20px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.team-logo {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto 20px;
}

.team-info {
  text-align: center;
}

.team-info h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #333;
}

.team-info p {
  font-size: 1em;
  color: #666;
}

.favorite-icon {
  font-size: 2em;
  color: var(--app-color);
  cursor: pointer;
  margin-top: auto;
}

.favorite-icon .mdi-star {
  color: var(--app-color);
}

.favorite-icon .mdi-star-outline {
  color: #ccc;
}
</style>
