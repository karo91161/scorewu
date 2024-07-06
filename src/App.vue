<template>
  <v-app>
    <v-app-bar app color="#7eaf34" dark class="custom-app-bar">
      <div class="ml-auto">
        <LanguageSelector />
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import LanguageSelector from '@/components/LanguageSelector.vue';

export default {
  name: 'App',

  components: {
    LanguageSelector,
  },
};
</script>
