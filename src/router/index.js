import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';
import Live from '../views/LiveView.vue';
import Today from '../views/TodayView.vue';
import Prediction from '../views/PredictionView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/auth',
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
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
