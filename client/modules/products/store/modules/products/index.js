/**
 * @module products/store/modules/products
 */

import mutations from './mutations';
import actions from './actions';

export const moduleName = 'PRODUCTS';

export default {
  mutations,
  actions,

  namespaced: true,

  state() {
    return {
      remainingProducts: 0,

      fetching: false,

      brandsFilters: [],
      products: [],
      limit: 10,
      page: 1
    };
  }
};
