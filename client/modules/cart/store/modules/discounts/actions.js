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
    commit(MT.FETCH_DISCOUNTS.PENDING);
    
    try {
      const res = await Vue.axios.get('discounts?page=1&limit=0');

      commit(MT.FETCH_DISCOUNTS.SUCCESS, res.data);

    } catch (error) {
      commit(MT.FETCH_DISCOUNTS.FAILURE, error);
    }
  }
};
