/**
 * @module @module cart/store/modules/discounts/mutations
 */

import MT from '@/store/mutation-types';
import Vue from 'vue';

export default {
  [MT.FETCH_DISCOUNTS.PENDING](state) {
    Vue.set(state, MT.FETCH_DISCOUNTS.loadingKey, true);
  },

  [MT.FETCH_DISCOUNTS.SUCCESS](state, data) {
    Vue.set(state, MT.FETCH_DISCOUNTS.loadingKey, false);
    Vue.set(state, MT.FETCH_DISCOUNTS.stateKey, data);
  },

  [MT.FETCH_DISCOUNTS.FAILURE](state, err) {
    console.error(err);
    Vue.set(state, MT.FETCH_DISCOUNTS.failureKey, true);
    Vue.set(state, MT.FETCH_DISCOUNTS.loadingKey, false);
  }
};
