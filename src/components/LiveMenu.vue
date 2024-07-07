<template>
  <div class="container d-flex flex-column justify-content-center align-items-center min-vh-100">
    <h2 class="text-center my-4">{{ $t('live.live_fixtures') }}</h2>
    <ul class="list-group w-100">
      <li v-for="(fixture, index) in fixtures" :key="index" class="list-group-item">
        <div class="fixture-header d-flex justify-content-between align-items-center">
          <h4>{{ fixture.league.name }}</h4>
          <div class="d-flex align-items-center">
            <span class="badge bg-info me-2">{{ fixture.fixture.status.long }}</span>
            <span v-if="fixture.fixture.status.elapsed" class="elapsed-time">
              {{ fixture.fixture.status.elapsed }}'
            </span>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center fixture-body">
          <div class="team-info home-team d-flex align-items-center">
            <img :src="fixture.teams.home.logo" alt="Home Team Logo" class="team-logo">
            <strong class="team-name">{{ fixture.teams.home.name }}</strong>
          </div>
          <div class="score text-center">
            {{ fixture.goals.home }} - {{ fixture.goals.away }}
          </div>
          <div class="team-info away-team d-flex align-items-center">
            <strong class="team-name">{{ fixture.teams.away.name }}</strong>
            <img :src="fixture.teams.away.logo" alt="Away Team Logo" class="team-logo">
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center fixture-footer">
          <div>
            <strong>{{ $t('live.date') }}:</strong> {{ formatDate(fixture.fixture.date) }}
          </div>
          <div>
            <strong>{{ $t('live.venue') }}:</strong> {{ fixture.fixture.venue.name }}, {{ fixture.fixture.venue.city }}
          </div>
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
  width: 3rem;
  height: 3rem;
  margin-right: 10px;
}

.fixture-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.team-info {
  flex: 2;
  display: flex;
  align-items: center;
}

.home-team {
  justify-content: flex-start;
}

.away-team {
  justify-content: flex-end;
}

.team-name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  margin-right: 5px;
}

.score {
  width: 60px;
  font-size: 1.5em;
  font-weight: bold;
  color: var(--app-color);
  text-align: center;
}

.elapsed-time {
  font-size: 1em;
  font-weight: bold;
  color: var(--app-color);
  margin-left: 10px;
}

.fixture-footer {
  padding-top: 10px;
  font-style: italic;
}

.list-group-item {
  margin-bottom: 10px;
  border: 1px solid var(--app-color);
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.list-group-item:hover {
  background-color: rgba(126, 175, 52, 0.1);
}

@media (max-width: 576px) {
  .fixture-body {
    flex-direction: column;
    text-align: center;
  }

  .home-team,
  .away-team {
    justify-content: center;
  }

  .score {
    margin: 10px 0;
  }

  .team-name {
    max-width: 100px;
  }
}
</style>
