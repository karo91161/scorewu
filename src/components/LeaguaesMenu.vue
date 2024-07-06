<template>
  <div class="container d-flex flex-column justify-content-center align-items-center min-vh-100">
    <h2 class="text-center my-4">{{ $t('league_fixtures') }}</h2>
    <ul class="list-group w-100">
      <li v-for="(fixture, index) in fixtures" :key="index" class="list-group-item">
        <div class="fixture-header d-flex justify-content-between align-items-center">
          <h4>{{ fixture.league.name }}</h4>
          <span class="badge bg-info">{{ fixture.fixture.status.long }}</span>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <div>
              <strong>{{ $t('home') }}:</strong> {{ fixture.teams.home.name }} 
              <img :src="fixture.teams.home.logo" alt="Home Team Logo" class="team-logo">
            </div>
            <div>
              <strong>{{ $t('away') }}:</strong> {{ fixture.teams.away.name }} 
              <img :src="fixture.teams.away.logo" alt="Away Team Logo" class="team-logo">
            </div>
          </div>
          <div>
            <div class="score">
              {{ fixture.goals.home }} - {{ fixture.goals.away }}
            </div>
            <div class="date">
              <strong>{{ $t('date') }}:</strong> {{ formatDate(fixture.fixture.date) }}
            </div>
          </div>
        </div>
        <div class="venue">
          <strong>{{ $t('venue') }}:</strong> {{ fixture.fixture.venue.name }}, {{ fixture.fixture.venue.city }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchFixtures } from '@/services/leagueService';

export default {
  data() {
    return {
      fixtures: []
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString();
    },
    async fetchFixtures() {
      try {
        this.fixtures = await fetchFixtures();
        console.log('this.fixtures', this.fixtures);
      } catch (error) {
        console.error('Error fetching fixtures:', error);
      }
    }
  },
  mounted() {
    this.fetchFixtures();
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
.fixture-header {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.team-logo {
  width: 30px;
  height: 30px;
  margin-left: 10px;
}
.score {
  font-size: 1.5em;
  font-weight: bold;
}
.venue {
  margin-top: 10px;
  font-style: italic;
}
.date {
  margin-top: 5px;
}
.list-group-item {
  margin-bottom: 10px;
}
</style>
