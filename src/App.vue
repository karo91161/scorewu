<template>
  <v-app>
    <v-app-bar app class="app-bar" dark>
      <div class="ml-auto">
        <LanguageSelector @languageChanged="updateSidebar" />
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
  components: {
    LanguageSelector
  },
  methods: {
    updateSidebar() {
      this.$refs.sidebar.updateMenuItems();
    }
  }
}
</script>

<style>
.app-bar {
  background-color: var(--app-color) !important;
}
</style>
