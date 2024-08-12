<template>
  <v-app>
    <v-app-bar app class="app-bar" dark>
      <div class="ml-auto">
        <LanguageSelector @languageChanged="updateSidebar" />
      </div>
    </v-app-bar>

    <v-main class="fancy-background">
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

.fancy-background {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7), rgba(126, 175, 52, 0.8)),
              url('https://www.transparenttextures.com/patterns/clean-gray-paper.png');
  background-size: cover, cover;
  background-blend-mode: overlay;
  box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
}

/* Extra styling to ensure the background feels premium and sophisticated */
.fancy-background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.6), transparent 70%);
  pointer-events: none;
  z-index: -1;
}
</style>
