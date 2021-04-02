/**
 * @module cart/store/actions
 */

import MT from '@/store/mutation-types';
import getProductsDiscounts from './services/get-products-discounts';

export default {
  async pushProduct({ commit, dispatch }, product) {
    commit(MT.PUSH_PRODUCT, product);

    await dispatch('refreshCart');
  },

  async spliceProduct({ commit, dispatch }, productId) {
    commit(MT.SPLICE_PRODUCT, productId);

    await dispatch('refreshCart');
  },

  async updateProdQty({ commit, dispatch }, update) {
    commit(MT.UPDATE_PROD_QTY, update);

    await dispatch('refreshCart');
  },

  async refreshCart({ commit, state, rootState }) {
    const discounts = rootState["discounts"].discounts;
    
    const { discountAlternative, bestDiscount } = getProductsDiscounts(discounts, state.products);

    commit(MT.UPDATE_DISCOUNT, bestDiscount);
    commit(MT.UPDATE_DISCOUNT_ALTERNATIVE, discountAlternative);
    commit(MT.UPDATE_SUBTOTAL);
    commit(MT.UPDATE_TOTAL);
  }
};
