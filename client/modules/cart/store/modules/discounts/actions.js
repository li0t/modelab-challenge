/**
 * @module cart/store/modules/discounts/actions
 */

import MT from '@/store/mutation-types';
import Vue from 'vue';

export default {
  /**
   * Fetches all discounts stored in the server.
   */
  async fetchDiscounts({ commit }) {
    try {
      const res = await Vue.axios.get('discounts?page=1&limit=0');

      commit(MT.UPDATE_DISCOUNTS, res.data);
    } catch (error) {
      console.error(error);
    }
  }
};
