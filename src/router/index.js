import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';
import Live from '../views/LiveView.vue';
import Teams from '../views/TeamsView.vue';
import Today from '../views/TodayView.vue';
import Prediction from '../views/PredictionView.vue';
import { logout } from '../services/authService';
import { removeUser } from '../utils/userStorage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Auth
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/live',
    name: 'Live',
    component: Live,
    meta: { requiresAuth: true }
  },
  {
    path: '/teams',
    name: 'Teams',
    component: Teams,
    meta: { requiresAuth: true }
  },
  {
    path: '/today',
    name: 'Today',
    component: Today,
    meta: { requiresAuth: true }
  },
  {
    path: '/prediction',
    name: 'Prediction',
    component: Prediction,
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: async (to, from, next) => {
      try {
        await logout();
        removeUser();
        next('/auth');
      } catch (error) {
        console.error('Kijelentkezési hiba:', error);
        next('/auth');
      }
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = !!localStorage.getItem('user');

  if (to.path === '/logout' || to.path === '/auth') {
    next();
  } else if (requiresAuth && !isAuthenticated) {
    next('/auth');
  } else {
    next();
  }
});

export default router;
