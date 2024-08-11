<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <h1>Your Favorite Teams</h1>
        <div v-if="loading" class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <v-row v-else class="teams-grid" justify="center">
          <v-col
            v-for="team in favoriteTeams"
            :key="team.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            class="d-flex justify-center"
          >
            <FavoriteTeamsCard :team="team" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-5">
      <v-col cols="12" md="10">
        <h2 v-if="selectedTeam">{{ selectedTeam.team.name }}'s Performance Last Season</h2>
        <div v-if="teamPerformanceLoading" class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <v-card v-else-if="teamPerformance" class="performance-card" outlined>
          <v-card-title>
            Match Results
          </v-card-title>
          <v-card-text class="scrollable">
            <v-list dense>
              <v-list-item
                v-for="match in teamPerformance.matches"
                :key="match._id.$oid"
                :class="getResultClass(match.result)"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ formatDate(match.date) }} - {{ getMatchup(match) }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ match.result.toUpperCase() }} ({{ getGoalsForDisplay(match) }}:{{ getGoalsAgainstDisplay(match) }})
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        <div v-else class="text-center">
          No team performance data available.
        </div>
      </v-col>
    </v-row>

    <!-- Predikciós kártya -->
    <v-row justify="center" class="mt-5">
      <v-col cols="12" md="10">
        <h2 v-if="selectedTeam" class="text-center font-weight-bold">
          {{ selectedTeam.team.name }}'s Performance Predictions
        </h2>
        <div v-if="predictionsLoading" class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <v-card v-else class="predictions-card" outlined>
          <v-card-title class="d-flex align-center justify-space-between">
            <span>Season Predictions</span>
            <v-icon color="primary">mdi-chart-line</v-icon>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" class="text-center">
                <v-icon large color="success">mdi-trophy</v-icon>
                <div class="prediction-stat">
                  <strong>{{ winProbability }}%</strong>
                  <p>Várható nyerési esély</p>
                </div>
              </v-col>
              <v-col cols="6" class="text-center">
                <v-icon large color="warning">mdi-handshake</v-icon>
                <div class="prediction-stat">
                  <strong>{{ drawProbability }}%</strong>
                  <p>Várható döntetlen esély</p>
                </div>
              </v-col>
              <v-col cols="6" class="text-center">
                <v-icon large color="error">mdi-alert-circle</v-icon>
                <div class="prediction-stat">
                  <strong>{{ lossProbability }}%</strong>
                  <p>Várható vereség esély</p>
                </div>
              </v-col>
              <v-col cols="6" class="text-center">
                <v-icon large color="primary">mdi-soccer</v-icon>
                <div class="prediction-stat">
                  <strong>{{ avgGoalsFor }}</strong>
                  <p>Várható átlagos gólszám</p>
                </div>
              </v-col>
              <v-col cols="6" class="text-center">
                <v-icon large color="primary">mdi-shield</v-icon>
                <div class="prediction-stat">
                  <strong>{{ avgGoalsAgainst }}</strong>
                  <p>Várható kapott gólok száma</p>
                </div>
              </v-col>
              <v-col cols="6" class="text-center">
                <v-icon large color="success">mdi-home</v-icon>
                <div class="prediction-stat">
                  <strong>{{ homeWinProbability }}%</strong>
                  <p>Esély a győzelemre otthon</p>
                </div>
              </v-col>
              <v-col cols="6" class="text-center">
                <v-icon large color="info">mdi-airplane</v-icon>
                <div class="prediction-stat">
                  <strong>{{ awayWinProbability }}%</strong>
                  <p>Esély a győzelemre idegenben</p>
                </div>
              </v-col>
              <v-col cols="6" class="text-center">
                <v-icon large color="primary">mdi-cube-outline</v-icon>
                <div class="prediction-stat">
                  <strong>{{ mostLikelyGoalDifference }}</strong>
                  <p>Várható nyertes különbség</p>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { fetchFavoriteTeams, fetchTeamById, fetchTeamPerformance } from '@/services/leagueService';
import { calculatePredictions } from '@/services/predictionService'; 
import FavoriteTeamsCard from '@/components/FavoriteTeamsCard.vue';

export default {
  components: {
    FavoriteTeamsCard,
  },
  data() {
    return {
      favoriteTeams: [],
      selectedTeam: null,
      teamPerformance: null,
      predictions: [],
      loading: true,
      teamPerformanceLoading: true,
      predictionsLoading: true,
      currentSeason: 2024,
      winProbability: 0,
      drawProbability: 0,
      lossProbability: 0,
      avgGoalsFor: 0,
      avgGoalsAgainst: 0,
    };
  },
  async created() {
    await this.loadFavoriteTeams();
    if (this.favoriteTeams.length > 0) {
      this.selectedTeam = this.favoriteTeams[0];
      await this.loadTeamPerformance();
      await this.loadPredictions(); 
    }
  },
  methods: {
    async loadFavoriteTeams() {
      try {
        const favoriteTeamIds = await fetchFavoriteTeams();
        const teamRequests = favoriteTeamIds.map(id => fetchTeamById(id));
        this.favoriteTeams = await Promise.all(teamRequests);
      } catch (error) {
        console.error('Failed to load favorite teams:', error);
      } finally {
        this.loading = false;
      }
    },
    async loadTeamPerformance() {
      try {
        if (this.selectedTeam) {
          this.teamPerformance = await fetchTeamPerformance(this.selectedTeam.team.id, 2023);
        }
      } catch (error) {
        console.error('Failed to load team performance:', error);
      } finally {
        this.teamPerformanceLoading = false;
      }
    },
    async loadPredictions() {
      try {
        if (this.teamPerformance) {
          const predictions = await calculatePredictions(this.teamPerformance);
          this.winProbability = predictions.winProbability;
          this.drawProbability = predictions.drawProbability;
          this.lossProbability = predictions.lossProbability;
          this.avgGoalsFor = predictions.avgGoalsFor;
          this.avgGoalsAgainst = predictions.avgGoalsAgainst;
          this.homeWinProbability = predictions.homeWinProbability;
          this.awayWinProbability = predictions.awayWinProbability;
          this.mostLikelyGoalDifference = predictions.mostLikelyGoalDifference;
        }
      } catch (error) {
        console.error('Failed to load predictions:', error);
      } finally {
        this.predictionsLoading = false;
      }
    },
    getGoalsForDisplay(match) {
      return match.home ? match.goalsFor : match.goalsAgainst;
    },
    getGoalsAgainstDisplay(match) {
      return match.home ? match.goalsAgainst : match.goalsFor;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    getMatchup(match) {
      const homeTeam = match.home ? this.selectedTeam.team.name : match.opponent;
      const awayTeam = match.home ? match.opponent : this.selectedTeam.team.name;
      return `${homeTeam} vs ${awayTeam}`;
    },
    getResultClass(result) {
      switch (result.toLowerCase()) {
        case 'win':
          return 'result-win';
        case 'draw':
          return 'result-draw';
        case 'loss':
          return 'result-loss';
        default:
          return '';
      }
    }
  },
};
</script>

<style scoped>
.teams-grid {
  gap: 10px;
}

.performance-card,
.predictions-card {
  overflow-y: auto;
}

.scrollable {
  max-height: 300px;
  overflow-y: auto;
}

.result-win {
  background-color: #e8f5e9;
}

.result-draw {
  background-color: #fff9c4;
}

.result-loss {
  background-color: #ffebee;
}

.v-list-item {
  border-bottom: 1px solid #ddd;
}

.predictions-card {
  background: linear-gradient(135deg, #f3f4f6, #ffffff);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: visible;
}

.v-card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.prediction-stat {
  font-size: 1.2rem;
  color: #555;
  margin-top: 10px;
}

.prediction-stat p {
  font-size: 0.9rem;
  margin-top: 5px;
  color: #777;
}

.v-icon {
  margin-bottom: 10px;
}

h2 {
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.v-card {
  border-radius: 12px;
  overflow: visible;
}

.v-card-text {
  padding: 20px;
  max-height: none;
}
</style>
