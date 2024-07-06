<template>
  <v-container fluid>
    <v-layout row justify-center>
      <v-flex xs12 md8>
        <Sidebar />
        <div class="main-content">
          <h1>Football Leagues</h1>
          <Leaguaes />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Leaguaes from '../components/LeaguaesMenu.vue'
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Leaguaes,
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
