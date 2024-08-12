<template>
  <v-container fluid>
    <v-layout row justify-center>
      <v-flex xs12 md8>
        <Sidebar />
        <div class="main-content">
          <Prediction />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Prediction from '../components/PredictionMenu.vue'
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Prediction,
    Sidebar
  }
};
</script>

<style scoped>
.today-view {
  padding: 20px;
}
.main-content {
  padding: 20px;
  text-align: center;
}
</style>
