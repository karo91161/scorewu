<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs4>
        <Sidebar></Sidebar>
      </v-flex>
      <v-flex xs8>
          <div>
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
