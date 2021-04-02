/**
 * @module cart/store/modules/cart/actions
 */

import MT from '@/store/mutation-types';
import getBestDiscount from './services/get-best-discount';

import { moduleName as discountsModuleName } from '../discounts';


export default {
  async addProduct({ commit, dispatch }, product) {
    commit(MT.ADD_PRODUCT, product);

    await dispatch('refreshCart');
  },

  async removeProduct({ commit, dispatch }, productId) {
    commit(MT.REMOVE_PRODUCT, productId);

    await dispatch('refreshCart');
  },

  async updateProdQty({ commit, dispatch }, update) {
    commit(MT.UPDATE_PROD_QTY, update);

    await dispatch('refreshCart');
  },

  async refreshCart({ commit, state, rootState }) {
    const discounts = rootState[discountsModuleName].discounts;
    
    const { discountAlternative, bestDiscount } = getBestDiscount(discounts, state.products);

    commit(MT.UPDATE_DISCOUNT, bestDiscount);
    commit(MT.UPDATE_DISCOUNT_ALTERNATIVE, discountAlternative);
    commit(MT.UPDATE_SUBTOTAL);
    commit(MT.UPDATE_TOTAL);
  }
};
