import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import vuetify from './plugins/vuetify'
import i18n from './i18n';
import './styles/global.scss';

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://localhost:3000'

new Vue({
  i18n,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')