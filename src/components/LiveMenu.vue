<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="mx-auto mt-5 modern-card" outlined>
          <v-card-title class="headline">
            <v-row align="center" justify="center">
              <v-col class="text-center">Live Matches</v-Col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-pagination
              v-if="totalPages > 1"
              v-model="page"
              :length="totalPages"
              @input="fetchData"
              class="mt-4"
            ></v-pagination>
            <v-list dense v-if="!loading">
              <v-list-item-group>
                <v-list-item
                  v-for="fixture in fixtures"
                  :key="fixture.fixture.id"
                  class="fixture-item"
                  two-line
                >
                  <v-row align="center" justify="space-between" class="w-100">
                    <v-col cols="3" class="text-center">
                      <v-avatar size="50" class="team-logo">
                        <v-img :src="fixture.teams.home.logo"></v-img>
                      </v-avatar>
                      <div class="team-name">{{ fixture.teams.home.name }}</div>
                    </v-col>
                    <v-col cols="6" class="text-center">
                      <div class="vs-text">VS</div>
                      <div class="score">
                        <v-chip class="ma-2 home-score" large outlined>
                          {{ fixture.goals.home }}
                        </v-chip>
                        <v-chip class="ma-2 away-score" large outlined>
                          {{ fixture.goals.away }}
                        </v-chip>
                      </div>
                      <div class="match-status">
                        <v-chip class="ma-2 match-status-chip" outlined>
                          <v-icon left>mdi-clock-outline</v-icon>
                          {{ fixture.fixture.status.short }}
                        </v-chip>
                        <v-chip class="ma-2 match-time-chip" outlined>
                          <v-icon left>mdi-timer-outline</v-icon>
                          {{ fixture.fixture.status.elapsed }}'
                        </v-chip>
                      </div>
                      <div class="match-date">
                        <v-chip class="ma-2 match-date-chip" outlined>
                          <v-icon left>mdi-calendar-clock</v-icon>
                          {{ new Date(fixture.fixture.date).toLocaleDateString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' }) }}
                        </v-chip>
                      </div>
                    </v-col>
                    <v-col cols="3" class="text-center">
                      <v-avatar size="50" class="team-logo">
                        <v-img :src="fixture.teams.away.logo"></v-img>
                      </v-avatar>
                      <div class="team-name">{{ fixture.teams.away.name }}</div>
                    </v-col>
                  </v-row>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-pagination
              v-if="totalPages > 1"
              v-model="page"
              :length="totalPages"
              @input="fetchData"
              class="mt-4"
            ></v-pagination>
            <div v-else-if="loading" class="text-center mt-4">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
            <div v-else class="text-center mt-4">
              No matches found.
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fetchFixtures } from '@/services/leagueService';

export default {
  data() {
    return {
      fixtures: [],
      page: 1,
      limit: 10,
      totalCount: 0,
      loading: true,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalCount / this.limit);
    }
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const data = await fetchFixtures(this.page, this.limit);
      this.fixtures = data.response;
      this.totalCount = data.totalCount;
      this.loading = false;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.modern-card {
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  padding: 30px;
  transition: all 0.3s ease;
}

.headline {
  font-family: 'Roboto', sans-serif;
  color: #333;
  font-weight: bold;
  font-size: 1.75rem;
  margin-bottom: 20px;
}

.fixture-item {
  border-bottom: 1px solid #e0e0e0;
  padding: 20px 0;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.fixture-item:hover {
  background-color: #f9f9f9;
  transform: translateY(-3px);
}

.team-logo {
  margin: 0 auto 10px auto;
  border: 1px solid #ddd;
  border-radius: 50%;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.team-logo v-img {
  object-fit: cover;
}

.team-logo:hover {
  transform: scale(1.1);
}

.team-name {
  font-weight: bold;
  color: #1a237e;
  font-size: 1.1rem;
}

.vs-text {
  font-weight: bold;
  color: #1a237e;
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.score {
  display: flex;
  justify-content: center;
  align-items: center;
}

.match-status,
.match-date {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.match-status-chip {
  border: 1px solid #1976d2;
  color: #1976d2;
}

.match-time-chip {
  border: 1px solid #ff9800;
  color: #ff9800;
}

.match-date-chip {
  border: 1px solid #757575;
  color: #757575;
}
</style>
