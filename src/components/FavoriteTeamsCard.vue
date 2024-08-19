<template>
  <v-card class="pa-3 d-flex align-center justify-center team-card">
    <v-avatar size="60" class="team-logo">
      <v-img :src="team.team.logo" :alt="team.team.name"></v-img>
    </v-avatar>
    <div class="team-info text-center">
      <h3 class="team-name">{{ team.team.name }}</h3>
      <p class="team-venue">{{ team.venue.name }}, {{ team.venue.city }}</p>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.team-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.team-logo {
  margin-bottom: 20px;
}

.team-info h3 {
  font-weight: bold;
  color: #1976d2;
  font-size: 1.2rem;
}

.team-info p {
  font-size: 0.9rem;
  color: #666;
}
</style>
