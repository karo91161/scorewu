<template>
  <div>
    <h2>League Fixtures</h2>
    <ul>
      <li v-for="(fixture, index) in fixtures" :key="index">
        <div>{{ fixture.league.name }} - {{ fixture.fixture.status.long }}</div>
        <div>Home: {{ fixture.teams.home.name }} ({{ fixture.goals.home }})</div>
        <div>Away: {{ fixture.teams.away.name }} ({{ fixture.goals.away }})</div>
        <div>Date: {{ formatDate(fixture.fixture.date) }}</div>
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
        console.log('this.fixtures', this.fixtures)
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
