<template>
  <v-app>
    <v-app-bar app class="app-bar" dark>
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

<style lang="scss">
.app-bar {
  background-color: var(--app-color) !important;
}
</style>