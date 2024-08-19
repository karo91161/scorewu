<template>
  <v-container fluid>
    <v-layout row justify-center>
      <v-flex xs12 md8>
        <Sidebar />
        <div class="main-content">
          <Live />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Live from '../components/LiveMenu.vue'
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Live,
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
