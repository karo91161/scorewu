<template>
  <v-container fluid>
    <v-layout row justify-center>
      <v-flex xs12 md8>
        <Sidebar />
        <div class="main-content">
          <Home />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Home from '../components/HomeMenu.vue';

export default {
  components: {
    Sidebar,
    Home
  }
}
</script>

<style scoped>
.main-content {
  padding: 20px;
  text-align: center;
}
</style>