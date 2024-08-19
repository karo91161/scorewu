import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#7eaf34', // app-color
        },
        dark: {
          primary: '#7eaf34', // app-color
        },
      },
    },
  });
