/**
 * @module @module products/store/modules/products/mutations
 */

import MT from '@/store/mutation-types';

export default {
  [MT.PUSH_PRODUCTS](state, products) {
    state.products.push(...products);
  },

  [MT.UPDATE_PRODUCTS](state, products) {
    state.products = products;
  },

  [MT.UPDATE_FETCHING](state, fetching) {
    state.fetching = fetching;
  },

  [MT.UPDATE_PAGE](state, page) {
    state.page = page;
  },

  [MT.UPDATE_REMAINING_PRODUCTS](state, remainingProducts) {
    state.remainingProducts = remainingProducts;
  },

  [MT.PUSH_BRAND_FILTER](state, brand) {
    state.brandsFilters.push(brand);
  },

  [MT.SPLICE_BRAND_FILTER](state, index) {
    state.brandsFilters.splice(index, 1);
  }
};
