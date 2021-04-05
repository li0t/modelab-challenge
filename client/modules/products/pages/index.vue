
<i18n>
es:


</i18n>

<template lang="pug">
.view(
  :class="{ loading: fetching}"
  )

  .products.ui.four.cards
  
    product(
      v-for="product in products"
      :product="product"
      :key="product._id"
      )
 
</template>

<script>
import Product from '../components/Product';

import { mapModuleActions, mapModuleState } from '@/shared/services/map-store-module';
import { moduleName as discountsModuleName } from '@/modules/cart/store/modules/discounts';

export default {
  name: 'ProductsIndex',

  components: {
    Product
  },

  data() {
    return {
      fetching: false,
      products: []
    };
  },

  computed: {
    ...mapModuleState(discountsModuleName, ['discounts'])
  },

  async created() {
    await this.fetchDiscounts();
    await this.fetchProducts();
  },

  methods: {
    ...mapModuleActions(discountsModuleName, ['fetchDiscounts']),

    async fetchProducts() {
      this.fetching = true;

      const res = await this.$http.get(`/products?limit=0`);

      this.products = res.data;

      this.fetching = false;
    }
  }
};
</script>
