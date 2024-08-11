<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="mx-auto mt-5" outlined>
          <v-card-title class="headline">Today's Match Prediction</v-card-title>
          <v-card-text>
            <div v-if="loading" class="text-center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
            <div v-else-if="prediction">
              <h3>Fixture ID: {{ prediction.fixtureId }}</h3>
              <p><strong>Predicted Winner:</strong> {{ prediction.winner }}</p>
              <v-progress-linear
                :value="prediction.confidence"
                color="green"
                striped
                height="20"
              >
                <template v-slot:default>
                  <strong>Confidence: {{ prediction.confidence }}%</strong>
                </template>
              </v-progress-linear>
              <p><strong>Under/Over:</strong> {{ prediction.under_over }}</p>
              <v-row>
                <v-col cols="6" class="d-flex justify-center">
                  <v-card class="pa-3 d-flex justify-center align-center">
                    <v-progress-circular
                      :value="Math.abs(prediction.goals.home)"
                      color="blue"
                      size="100"
                      width="15"
                      rotate="-90"
                    >
                      <strong>Home: {{ prediction.goals.home }}</strong>
                    </v-progress-circular>
                  </v-card>
                </v-col>
                <v-col cols="6" class="d-flex justify-center">
                  <v-card class="pa-3 d-flex justify-center align-center">
                    <v-progress-circular
                      :value="Math.abs(prediction.goals.away)"
                      color="red"
                      size="100"
                      width="15"
                      rotate="-90"
                    >
                      <strong>Away: {{ prediction.goals.away }}</strong>
                    </v-progress-circular>
                  </v-card>
                </v-col>
              </v-row>
              <p><strong>Advice:</strong> {{ prediction.advice }}</p>
              <v-divider class="my-4"></v-divider>
              <v-row>
                <v-col cols="12">
                  <apexchart type="pie" :options="chartOptions" :series="chartSeries"></apexchart>
                </v-col>
              </v-row>
            </div>
            <div v-else>
              <p>No prediction available for today's match.</p>
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

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      prediction: null,
      loading: true,
      chartOptions: {
        chart: {
          width: '100%',
          type: 'pie',
        },
        labels: ['Home Goals', 'Away Goals'],
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
      this.updateChart();
      this.loading = false;
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
.v-progress-circular {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
.d-flex {
  display: flex;
}
.justify-center {
  justify-content: center;
}
.align-center {
  align-items: center;
}
</style>
