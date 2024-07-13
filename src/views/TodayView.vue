<template>
  <v-container fluid>
    <v-layout row justify-center>
      <v-flex xs12 md8>
        <Sidebar />
        <div class="main-content">
          <h1>{{ $t('live.today_matches') }}</h1>
          <Today />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Today from '../components/TodayMenu.vue'
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Today,
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
