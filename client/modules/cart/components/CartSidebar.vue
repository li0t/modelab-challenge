<i18n>
es:
  PRODUCT_QTY: 'Cantidad: {0}'
  SUBTOTAL: Subtotal de productos
  DISCOUNT: Descuento por marca
  DISCOUNT_APPLIED_0: '* Se aplicó un descuento de '
  DISCOUNT_APPLIED_1: ' por haber comprado al menos '
  DISCOUNT_APPLIED_2: ' en productos {0}!'

  DISCOUNT_ALTERNATIVE_0: 'Agrega '
  DISCOUNT_ALTERNATIVE_1: ' más en tus productos {0} y aprovecha un descuento total de '
  DISCOUNT_ALTERNATIVE_2: ' en tu compra!'

</i18n>

<template lang="pug">
.cart-sidebar.ui.right.wide.sidebar.vertical.menu(
  @click="$$('.cart-sidebar').sidebar('hide')"
  )
  .menu
    .item(
      v-for="product in products"
      )
      .ui.grid
        .row
          .four.wide.column
            .ui.small.image
              img(:src="`https://${product.image}`")

          .four.wide.column 
            p {{ product.brand }}
            p {{ product.description }}
            p {{ $t('PRODUCT_QTY', [product.qty]) }}

          .eight.wide.right.aligned.column
            | {{ product.subtotal }}

  .menu
    .discount-alternative(
      v-show="discountAlternative.amount > 0"
      )
      span {{ $t('DISCOUNT_ALTERNATIVE_0') }}
      span.bold {{ discountAlternative.missing }}
      span {{ $t('DISCOUNT_ALTERNATIVE_1', [discountAlternative.brand]) }}
      span.bold {{ discountAlternative.amount }}
      span {{ $t('DISCOUNT_ALTERNATIVE_2') }}    

    .subtotal.item
      div 
        span {{ $t('SUBTOTAL') }}
        span.right {{ subtotal }}

    .discount.item(
      v-show="discount.amount > 0"
      )
      div 
        span {{ $t('DISCOUNT') }}
        span.right {{ discount.amount }}

      div 
        span {{ $t('DISCOUNT_APPLIED_0') }}
        span.bold {{ discount.amount }}
        span {{ $t('DISCOUNT_APPLIED_1') }}
        span.bold {{ discount.threshold }}
        span {{ $t('DISCOUNT_APPLIED_2', [discount.brand]) }}
      
    .total.item
      div 
        span {{ $t('TOTAL') }}
        span.right {{ total }}
 
</template>

<script>
import MT from '@/store/mutation-types';

import { mapModuleMutations, mapModuleState } from '@/shared/services/map-store-module';
import { moduleName as cartModuleName } from '@/modules/cart/store/modules/cart';

export default {
  name: 'CartSidebar',

  props: {},

  data() {
    return {};
  },

  computed: {
    ...mapModuleState(cartModuleName, ['products', 'subtotal', 'total', 'discount', 'discountAlternative'])
  },

  mounted() {
    this.initCartSidebar();
  },

  methods: {
    ...mapModuleMutations(cartModuleName, {
      displayCart: MT.DISPLAY_CART
    }),

    initCartSidebar() {
      this.$$('.cart-sidebar').sidebar('setting', 'transition', 'overlay');
    },

    getProductsQty() {
      let qty = 0;

      for (const product of this.products) {
        qty += product.qty;
      }

      return qty;
    }
  }
};
</script>
<style lang="sass" scoped>
.cart-sidebar
  .menu
    .item
      .bold
        font-weight: bold
      
      .right
        float: right

</style>
