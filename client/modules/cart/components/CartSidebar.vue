<i18n>
es:
  SUMMARY: Resumen

  EMPTY_CART: No se han agregado productos al carro

  PRODUCT_QTY: 'Cantidad: {0}'
  SUBTOTAL: Subtotal de productos
  DISCOUNT: Descuento por marca
  TOTAL: Total a pagar

  DISCOUNT_APPLIED_0: '* Se aplicó un descuento de '
  DISCOUNT_APPLIED_1: ' por haber comprado al menos '
  DISCOUNT_APPLIED_2: ' en productos {0}!'

  DISCOUNT_ALTERNATIVE_0: 'Agrega '
  DISCOUNT_ALTERNATIVE_1: ' más en productos {0} y aprovecha un descuento total de '
  DISCOUNT_ALTERNATIVE_2: ' en tu compra!'

</i18n>

<template lang="pug">
.cart-sidebar.ui.right.very.wide.sidebar.vertical.menu(
  @click="$$('.cart-sidebar').sidebar('hide')"
  )
  .title.menu
    .header.item
      h3.ui.blue.header {{ $t('SUMMARY') }}
  
  .products.menu
    .item(
      v-if="products.length === 0"
      )
      h4.ui.header {{ $t('EMPTY_CART')}}

    .product.item(
      v-for="product in products"
      )
      .ui.grid
        .middle.aligned.row
          .four.wide.column
            .ui.small.image
              img(:src="`https://${product.image}`")

          .six.wide.column.text 
            p.brand.bold {{ product.brand }}
            p.description {{ product.description }}
            p.qty.bold {{ $t('PRODUCT_QTY', [product.qty]) }}

          .six.wide.right.aligned.column.bold.price
            | {{ formatNumber(product.subtotal) }}

  .totals.menu
    .discount-alternative.item(
      v-show="discountAlternative.amount > 0"
      )
      span {{ $t('DISCOUNT_ALTERNATIVE_0') }}
      span.bold {{ formatNumber(discountAlternative.missing) }}

      span {{ $t('DISCOUNT_ALTERNATIVE_1', [discountAlternative.brand]) }}
      span.bold {{ formatNumber(discountAlternative.amount) }}

      span {{ $t('DISCOUNT_ALTERNATIVE_2') }}    

    .subtotal.item
      div 
        span {{ $t('SUBTOTAL') }}
        span.right.bold {{ formatNumber(subtotal) }}

    .discount.item(
      v-show="discount.amount > 0"
      )
      div 
        span {{ $t('DISCOUNT') }}
        span.right.bold {{ `-${formatNumber(discount.amount)}` }}

      div 
        span {{ $t('DISCOUNT_APPLIED_0') }}
        span.bold {{ formatNumber(discount.amount) }}

        span {{ $t('DISCOUNT_APPLIED_1') }}
        span.bold {{ formatNumber(discount.threshold) }}

        span {{ $t('DISCOUNT_APPLIED_2', [discount.brand]) }}
      
    .total.item
      div 
        span.bold {{ $t('TOTAL') }}
        span.right.bold {{ formatNumber(total) }}
 
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

    formatNumber(number) {
      return `$${number.toLocaleString('es-CL')}`;
    },

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
.cart-sidebar.vertical.menu
  padding: 1.25em

  .menu
    .item
      padding-left: 0
      padding-right: 0

      .bold
        font-weight: bold
      
      .right
        float: right

    &.title
      .header.item
        .header
          border-bottom: 1px solid rgba(34,36,38,.15)
          padding-bottom: .5em
    
    &.products
      margin-top: 1em

      box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5
      background-color: #F5F5F5

      .item
        padding: 1em 2em

        &.product
          border-bottom: 1px solid rgba(34, 36, 38, 0.15)

          .price
            font-size: 1.25em
            color: #202020

          .text 
            padding-left: 0

            p
              margin-bottom: 0
              color: #202020

              &.brand,
              &.description
                font-size: 1.2em

              &.qty
                font-size: 1.1em

              &.description
                color: #505050

          &:last-child
            border-bottom: none

    
    &.totals
      padding-top: 2em

      .item
        font-size: 1.25em
        color: #505050
        margin-bottom: 1em

        &.discount-alternative
          color: #2185d0
          padding-top: 0;
          margin-top: -1em;

        &.discount
          div:first-child
            margin-bottom: .5em

        &.total
          color: black

      


</style>
