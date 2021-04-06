/**
 * @module @module products/store/modules/search-bar/mutations
 */

import MT from '@/store/mutation-types';

export default {
  [MT.UPDATE_SEARCH_TEXT](state, searchText) {
    state.searchText = searchText;
  }
};
