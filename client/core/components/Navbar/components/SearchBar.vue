
<i18n>
es:
  BRANDS: Marcas
  APPLY_FILTERS: Aplicar filtros
  REMOVE_FILTERS: Quitar filtros
  PAGINATE: Cargar más
</i18n>

<template lang="pug">
.ui.input
  input(
    type="text"
    @change="updateSearchText($event.target.value || '')"
    @keyup.enter="search()"
    )
  
</template>

<script>
import MT from '@/store/mutation-types';

import { mapModuleState, mapModuleActions, mapModuleMutations } from '@/shared/services/map-store-module';
import { moduleName as productsModuleName } from '@/modules/products/store/modules/products';
import { moduleName as searchBarModuleName } from '@/shared/store/modules/search-bar';

export default {
  name: 'SearchBar',

  components: {},

  data() {
    return {};
  },

  computed: {
    ...mapModuleState(searchBarModuleName, ['searchText'])
  },

  methods: {
    ...mapModuleActions(productsModuleName, ['fetchProducts', 'reset']),

    ...mapModuleMutations(searchBarModuleName, {
      updateSearchText: MT.UPDATE_SEARCH_TEXT
    }),

    async search() {
      await this.reset();
      await this.fetchProducts();
    }
  }
};
</script>
<style lang="sass" scoped>
</style>