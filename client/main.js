
import '@/core/services/plugins';
import '@/core/services/components';
// Load Jquery before semantic
import '@/semantic/dist/semantic.min.css';
import '@/semantic/dist/semantic.min';

import Vue from 'vue';
import App from '@/app';
import router from '@/core/plugins/router';
import store from '@/store';
import i18n from '@/shared/plugins/i18n';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',

  components: {
    App
  },

  template: '<app />',

  router,

  store,
  
  i18n
});
