import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export const moduleName = 'cart';

export default {
  mutations,
  actions,
  getters,

  namespaced: true,

  state() {
    return {
      discountAlternative: null,
      discount: null,

      products: [],
      subtotal: 0,
      total: 0
    };
  }
};
