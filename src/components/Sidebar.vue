<template>
  <v-navigation-drawer app :permanent="true">
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
      <v-list-item v-for="(item, index) in items" :key="index" :to="item.to" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
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
        { title: 'Home', icon: 'mdi-home', to: '/home' },
        { title: 'Leagues', icon: 'mdi-trophy', to: '/leaguaes' },
      ]
    }
  }
}
</script>

<style scoped>
.logo {
  width: 200px;
  margin-left: 50px;
}
</style>
