<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username">
      <input type="password" v-model="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { login } from '@/services/authService';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await login(this.username, this.password);
        console.log('Login response:', response);
        // Check if user is authenticated before redirecting
          this.$router.push('/home'); // Redirect to home page after successful login
      } catch (error) {
        console.error('Login failed:', error);
        // Handle login failure (e.g., display error message)
      }
    }
  }
}
</script>
