/**
 * @module products/store/modules/products/actions
 */

import MT from '@/store/mutation-types';
import Vue from 'vue';

import { moduleName as searchBarModuleName } from '@/shared/store/modules/search-bar';

export default {
  /**
   * Fetches a page of products stored in the server.
   */
  async fetchProducts({ state, commit, dispatch }) {
    commit(MT.UPDATE_FETCHING, true);

    let query = await dispatch('getProductsQuery', state.page);
    let res = await Vue.axios.get(`/products?${query}`);

    commit(MT.PUSH_PRODUCTS, res.data);

    query = await dispatch('getProductsQuery', state.page + 1);
    res = await Vue.axios.get(`/products/count?${query}`);

    commit(MT.UPDATE_REMAINING_PRODUCTS, res.data);

    commit(MT.UPDATE_FETCHING, false);
  },

  getProductsQuery({ state, rootState }, page) {
    const searchText = rootState[searchBarModuleName].searchText;

    let query = `text=${searchText}&limit=${state.limit}&page=${page}`;

    for (const brand of state.brandsFilters) {
      query += `&brands=${brand}`;
    }

    return query;
  },

  reset({ commit }) {
    commit(MT.UPDATE_PAGE, 1);
    commit(MT.UPDATE_PRODUCTS, []);
  }
};
