/**
 * @module cart/store/modules/cart
 */

import mutations from './mutations';
import actions from './actions';

export const moduleName = 'CART';

export default {
  mutations,
  actions,

  namespaced: true,

  state() {
    return {
      discountAlternative: {
        brand: null,
        threshold: 0,
        missing: 0,
        amount: 0
      },

      discount: {
        brand: null,
        threshold: 0,
        amount: 0
      },

      products: [],
      subtotal: 0,
      total: 0
    };
  }
};
