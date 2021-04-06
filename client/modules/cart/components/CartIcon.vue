<i18n>
es:


</i18n>

<template lang="pug">
.cart-icon.link.item#cart-icon(
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
#cart-icon.link.item
  border-radius: 2px!important
  background-color: #0e3d69

  .icon
    margin-right: 0
    margin-left: -2px
    color: #F7BF16
    font-size: 1.5em

  .ui.circular.label
    background-color: #F7BF16
    color: #0C346B
</style>
