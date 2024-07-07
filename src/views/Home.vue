<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs4>
        <Sidebar></Sidebar>
      </v-flex>
      <v-flex xs8>
        <h1>{{ $t('main.main_page') }}</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Sidebar
  }
}
</script>
