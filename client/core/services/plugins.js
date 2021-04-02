/**
 * Plugins service.
 *
 * @module core/services/plugins
 */
import plugins from '../configs/plugins';
import VueAxios from 'vue-axios';
import axios from './axios';
import Vue from 'vue';

Vue.use(VueAxios, axios);

for (const plugin of plugins) {
  Vue.use(plugin);
}
