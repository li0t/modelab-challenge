/**
 * Store index module.
 *
 * @module store/index
 */
import modules from './modules';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,
  modules,

  state: {}
});
