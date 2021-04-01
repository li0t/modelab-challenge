
<i18n>
es:


</i18n>

<template lang="pug">
.view(
  :class="{ loading: fetching}"
  )

  .products.ui.cards
  
    product(
      v-for="product in products"
      :product="product"
      )
 
</template>

<script>
import { mapModuleState } from '@/shared/services/map-store-module';
import Product from '../components/Product';

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
    ...mapModuleState({})
  },

  async created() {
    await this.fetchProducts();
  },

  methods: {
    async fetchProducts() {
      this.fetching = true;

      const res = await this.$http.get(`/products`);

      this.products = res.data;

      this.fetching = false;
    }
  }
};
</script>
