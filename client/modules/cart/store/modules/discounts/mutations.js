/**
 * @module @module cart/store/modules/discounts/mutations
 */

import MT from '@/store/mutation-types';

export default {
  [MT.UPDATE_DISCOUNTS](state, discounts) {
    state.discounts = discounts;
  }
};
