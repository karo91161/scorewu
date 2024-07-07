<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card>
          <v-card-title class="headline">{{ $t('login.title') }}</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="username" :label="$t('login.username')" outlined></v-text-field>
              <v-text-field v-model="password" :label="$t('login.password')" type="password" outlined></v-text-field>
              <v-btn class="login-button" type="submit" dark>{{ $t('login.button') }}</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await this.$http.post('/api/login', {
          username: this.username,
          password: this.password
        });
        // Handle successful login, e.g., store token in localStorage and redirect
        console.log('Logged in successfully:', response.data);
        this.$router.push('/home');
      } catch (error) {
        // Handle login error, e.g., show error message
        console.error('Login error:', error.response.data.error);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-button {
  background-color: var(--app-color) !important;
}
.card {
  max-width: 400px;
  margin: auto;
}
</style>
