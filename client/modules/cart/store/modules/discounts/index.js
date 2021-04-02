/**
 * @module cart/store/modules/discounts
 */

import mutations from './mutations';
import actions from './actions';

export const moduleName = 'DISCOUNTS';

export default {
  mutations,
  actions,

  namespaced: true,

  state() {
    return {
      discounts: []
    };
  }
};
