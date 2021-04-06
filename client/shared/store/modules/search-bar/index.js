/**
 * @module products/store/modules/search-bar
 */

import mutations from './mutations';

export const moduleName = 'SEARCH-BAR';

export default {
  mutations,

  namespaced: true,

  state() {
    return {
      searchText: ''
    };
  }
};
