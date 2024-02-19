<template>
  <v-navigation-drawer app :permanent="true">
    <v-list dense>
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
