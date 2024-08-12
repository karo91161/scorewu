<template>
  <v-container class="container">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card>
          <v-card-title class="headline">{{ $t('auth.title') }}</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login" ref="loginForm">
              <v-text-field
                v-model="email"
                :label="$t('auth.email')"
                outlined
                :rules="[emailRule]"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :label="$t('auth.password')"
                :type="showPassword ? 'text' : 'password'"
                outlined
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="togglePasswordVisibility"
                :rules="[passwordRule]"
                required
              ></v-text-field>
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
            <v-form @submit.prevent="register" ref="registerForm">
              <v-text-field
                v-model="registerEmail"
                :label="$t('auth.email')"
                outlined
                :rules="[emailRule]"
                required
              ></v-text-field>
              <v-text-field
                v-model="registerPassword"
                :label="$t('auth.password')"
                :type="showRegisterPassword ? 'text' : 'password'"
                outlined
                :append-icon="showRegisterPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="toggleRegisterPasswordVisibility"
                :rules="[passwordRule]"
                required
              ></v-text-field>
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
import { login as authLogin, register as authRegister } from '../services/authService';
import { setUser } from '../utils/userStorage';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      showPassword: false, // Új állapot a jelszó láthatóságának kezelésére
      showRegisterPassword: false, // Új állapot a regisztrációs jelszó láthatóságának kezelésére
      showRegisterDialog: false,
      registerEmail: '',
      registerPassword: '',
      registerError: null,
    }
  },
  computed: {
    emailRule() {
      return (v) => !!v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Invalid email format';
    },
    passwordRule() {
      return (v) => !!v && v.length >= 6 && /\d/.test(v) || 'Password must be at least 6 characters and contain at least one number';
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleRegisterPasswordVisibility() {
      this.showRegisterPassword = !this.showRegisterPassword;
    },
    async login() {
      if (this.$refs.loginForm.validate()) {
        try {
          const sanitizedEmail = this.sanitizeInput(this.email);
          const sanitizedPassword = this.sanitizeInput(this.password);
          const response = await authLogin(sanitizedEmail, sanitizedPassword);
          if (response.message === 'Login successful') {
            setUser(response.user);
            this.$router.push('/home');
          }
        } catch (error) {
          this.error = error.response?.data?.error || 'An error occurred during login';
        }
      }
    },
    async register() {
      if (this.$refs.registerForm.validate()) {
        try {
          const sanitizedEmail = this.sanitizeInput(this.registerEmail);
          const sanitizedPassword = this.sanitizeInput(this.registerPassword);
          const response = await authRegister(sanitizedEmail, sanitizedPassword);
          if (response.message === 'User registered successfully') {
            setUser(response.user);
            this.showRegisterDialog = false;
            this.$router.push('/home');
          }
        } catch (error) {
          this.registerError = error.response?.data?.error || 'An error occurred during registration';
        }
      }
    },
    sanitizeInput(input) {
      return input.replace(/[<>\\/\\'";]/g, '');
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 100px;
}
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
