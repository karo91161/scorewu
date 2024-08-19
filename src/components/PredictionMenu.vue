<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="mx-auto mt-5 modern-card" elevation="3">
          <v-card-title class="headline d-flex align-center justify-space-between">
            <span>{{ $t('prediction.title') }}</span>
            <v-btn icon @click="refreshData">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div v-if="loading" class="text-center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
            <div v-else-if="prediction && fixture">
              <v-row>
                <v-col cols="12">
                  <h3 class="fixture-name">{{ fixtureName }}</h3>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4" class="d-flex justify-center">
                  <v-avatar size="100" class="team-avatar">
                    <v-img :src="fixture.teams.home.logo" :alt="fixture.teams.home.name" />
                  </v-avatar>
                </v-col>
                <v-col cols="4" class="d-flex justify-center align-center">
                  <div class="score-container">
                    <h1 class="score">{{ $t('prediction.goals') }}: {{ Math.abs(prediction.goals.home) }} - {{ Math.abs(prediction.goals.away) }}</h1>
                    <p class="confidence">{{ $t('prediction.confidence') }}: {{ prediction.confidence }}%</p>
                  </div>
                </v-col>
                <v-col cols="4" class="d-flex justify-center">
                  <v-avatar size="100" class="team-avatar">
                    <v-img :src="fixture.teams.away.logo" :alt="fixture.teams.away.name" />
                  </v-avatar>
                </v-col>
              </v-row>
              <v-divider class="my-4"></v-divider>
              <v-row>
                <v-col cols="6">
                  <p><strong>{{ $t('prediction.predicted_winner') }}:</strong> {{ prediction.winner }}</p>
                  <p><strong>{{ $t('prediction.under_over') }}:</strong> {{ prediction.under_over }}</p>
                  <p><strong>{{ $t('prediction.advice') }}:</strong> {{ prediction.advice }}</p>
                </v-col>
                <v-col cols="6">
                  <apexchart type="pie" :options="chartOptions" :series="chartSeries"></apexchart>
                </v-col>
              </v-row>
            </div>
            <div v-else>
              <p>{{ $t('prediction.no_prediction') }}</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fetchPredictionForToday } from '@/services/predictionService';
import VueApexCharts from 'vue-apexcharts';
import { fetchFixtureById } from '@/services/leagueService';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      prediction: null,
      fixture: null,  // Új változó a fixture adatainak
      loading: true,
      fixtureName: '',
      chartOptions: {
        chart: {
          width: '100%',
          type: 'pie',
        },
        labels: [this.$t('prediction.home_goals'), this.$t('prediction.away_goals')],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      chartSeries: [],
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const data = await fetchPredictionForToday();
      this.prediction = data;
      await this.fetchFixtureName();
      this.updateChart();
      this.loading = false;
    },
    async fetchFixtureName() {
      if (this.prediction && this.prediction.fixtureId) {
        this.fixture = await fetchFixtureById(this.prediction.fixtureId);
        this.fixtureName = `${this.fixture.teams.home.name} vs ${this.fixture.teams.away.name}`;
      }
    },
    updateChart() {
      if (this.prediction) {
        this.chartSeries = [Math.abs(this.prediction.goals.home), Math.abs(this.prediction.goals.away)];
      }
    },
    async refreshData() {
      await this.fetchData();
    }
  }
};
</script>

<style scoped>
.modern-card {
  border-radius: 16px;
  padding: 24px;
  background-color: #f8f9fa;
}

.headline {
  font-weight: 600;
  font-size: 1.25rem;
  color: #333;
}

.fixture-name {
  font-weight: bold;
  font-size: 1.5rem;
  color: #555;
  text-align: center;
}

.team-avatar {
  border: 2px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.score-container {
  text-align: center;
}

.score {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
}

.confidence {
  font-size: 1rem;
  color: #666;
}

.v-progress-circular {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
</style>
