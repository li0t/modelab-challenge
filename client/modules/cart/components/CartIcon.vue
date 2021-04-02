<i18n>
es:


</i18n>

<template lang="pug">
.cart-icon.link.item(
  @click="$$('.cart-sidebar').sidebar('show')"
  )
  i.fas.fa-shopping-cart.icon
  .ui.circular.label(
    v-show="productsQty > 0"
    )
    | {{ productsQty }}
 
</template>

<script>
import { mapModuleState } from '@/shared/services/map-store-module';
import { moduleName as cartModuleName } from '@/modules/cart/store/modules/cart';

export default {
  name: 'CartIcon',

  props: {},

  data() {
    return {};
  },

  computed: {
    ...mapModuleState(cartModuleName, { cartProducts: 'products' }),

    productsQty() {
      return this.cartProducts.length && this.getProductsQty();
    }
  },

  methods: {
    getProductsQty() {
      let qty = 0;

      for (const product of this.cartProducts) {
        qty += product.qty;
      }

      return qty;
    }
  }
};
</script>
<style lang="sass" scoped>
.cart-icon
  background-color: #0C346B;
</style>
