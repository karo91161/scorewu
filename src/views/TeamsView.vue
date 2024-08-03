<template>
  <v-container fluid>
    <v-layout row justify-center>
      <v-flex xs12 md8>
        <Sidebar />
        <div class="main-content">
          <h1>{{ $t('live.live_matches') }}</h1>
          <Teams />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Teams from '../components/TeamsMenu.vue'
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Teams,
    Sidebar
  }
};
</script>

<style scoped>
.main-content {
  padding: 20px;
  text-align: center;
}
</style>
