<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="mx-auto mt-5" outlined>
          <v-card-title class="headline">Today's Match Prediction</v-card-title>
          <v-card-text>
            <div v-if="prediction">
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
                <v-col cols="6">
                  <v-card class="pa-3">
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
                <v-col cols="6">
                  <v-card class="pa-3">
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

export default {
  data() {
    return {
      prediction: null
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      const data = await fetchPredictionForToday();
      this.prediction = data;
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
</style>
