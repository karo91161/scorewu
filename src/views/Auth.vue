<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card>
          <v-card-title class="headline">{{ $t('auth.title') }}</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="email" :label="$t('auth.email')" outlined></v-text-field>
              <v-text-field v-model="password" :label="$t('auth.password')" type="password" outlined></v-text-field>
              <v-btn class="login-button" type="submit" dark>{{ $t('auth.button') }}</v-btn>
            </v-form>
            <v-alert v-if="error" type="error" class="error">{{ error }}</v-alert>
          </v-card-text>
        </v-card>
        <div class="register">
          <v-btn @click="showRegisterDialog = true" text>{{ $t('auth.register') }}</v-btn>
        </div>
      </v-flex>

      <!-- Register Dialog -->
      <v-dialog v-model="showRegisterDialog" max-width="500px">
        <v-card>
          <v-card-title>{{ $t('auth.register') }}</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field v-model="registerEmail" :label="$t('auth.email')" outlined></v-text-field>
              <v-text-field v-model="registerPassword" :label="$t('auth.password')" type="password" outlined></v-text-field>
              <v-btn type="submit" color="primary">{{ $t('auth.button') }}</v-btn>
            </v-form>
            <v-alert v-if="registerError" type="error">{{ registerError }}</v-alert>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      showRegisterDialog: false,
      registerEmail: '',
      registerPassword: '',
      registerError: null,
    }
  },
  methods: {
    async login() {
      try {
        const response = await this.$http.post('/api/login', {
          email: this.email,
          password: this.password
        });
        // Handle successful login, e.g., store token in localStorage and redirect
        console.log('Logged in successfully:', response.data);
        this.$router.push('/home');
      } catch (error) {
        // Handle login error, e.g., show error message
        console.error('Login error:', error.response.data.error);
        this.error = error.response.data.error || 'An error occurred during login';
      }
    },
    async register() {
      try {
        const response = await this.$http.post('/api/register', {
          email: this.registerEmail,
          password: this.registerPassword
        });
        // Handle successful registration, e.g., show success message or redirect
        console.log('Registered successfully:', response.data);
        this.showRegisterDialog = false;
      } catch (error) {
        // Handle registration error, e.g., show error message
        console.error('Registration error:', error.response.data.error);
        this.registerError = error.response.data.error || 'An error occurred during registration';
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
.register {
  margin-top: 20px;
  display: grid;
}
.error {
  margin: 20px;
}
</style>
