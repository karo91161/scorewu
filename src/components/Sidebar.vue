<template>
  <v-navigation-drawer app :permanent="true" class="sidebar">
    <v-list dense>
      <div class="d-flex align-center logo">
        <v-img
          alt="ScoreWU Logo"
          class="shrink mr-2"
          contain
          src="@/assets/scorewu-logo.png"
          transition="scale-transition"
          width="150"
        />
      </div>
      <v-divider class="my-4"></v-divider>
      <v-list-item v-for="(item, index) in items" :key="index" :to="item.to" link class="sidebar-item">
        <v-list-item-icon>
          <v-icon class="sidebar-icon">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="sidebar-title">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: this.$t('menu.home'), icon: 'mdi-home', to: '/home' },
        { title: this.$t('menu.live'), icon: 'mdi-trophy', to: '/live' },
      ]
    }
  }
}
</script>

<style scoped>
.sidebar {
  background-color: white;
  color: var(--app-color);
}

.logo {
  width: 200px;
  margin-left: 50px;
}

.sidebar-item {
  margin: 10px 0;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none;
}

.sidebar-item:hover {
  background-color: var(--darker-app-color);
  color: white;
  text-decoration: none;
}

.sidebar-item:hover .sidebar-title,
.sidebar-item:hover .sidebar-icon {
  text-decoration: none;
}

.sidebar-icon {
  color: var(--app-color);
  transition: color 0.3s ease;
}

.sidebar-item:hover .sidebar-icon {
  color: white;
  text-decoration: none;
}

.sidebar-title {
  font-weight: bold;
  color: var(--app-color);
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  transition: color 0.3s ease;
  text-decoration: none;
}

.sidebar-item:hover .sidebar-title {
  color: white;
  text-decoration: none;
}

</style>
