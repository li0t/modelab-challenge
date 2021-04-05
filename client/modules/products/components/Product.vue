<i18n>
es:
  DELIVERY: Despacho
  PICKUP: Retiro
  ADD_TO_CART: Agregar

</i18n>

<template lang="pug">
.product.ui.card
  .small.image
    img(:src="`https://${product.image}`")

  .content
    .description 
      span
        span.brand {{ `${product.brand} ` }}
        span {{ product.description }}
      
    .price {{ `$${product.price.toLocaleString('es')}` }}

    .ui.small.icon.labels
      .ui.blue.basic.label 
        i.fas.fa-truck.icon
        | {{ $t('DELIVERY')}}
      .ui.orange.basic.label
        i.fas.fa-warehouse.icon
        | {{ $t('PICKUP')}}

    .actions.center.aligned
      button.ui.push-product.small.button(
        v-if="cartProductQty === 0"
        @click="addProduct(product)"
        )
        | {{ $t('ADD_TO_CART')}}

      .ui.icon.small.buttons.edit-buttons(
        v-else
        )

        button.ui.button.minus-button(
          @click="updateQty(cartProductQty - 1)"
          )
          i.fas.fa-minus.icon


        button.ui.button.product-qty
          | {{ cartProductQty }}

        button.ui.button.plus-button(
          @click="updateQty(cartProductQty + 1)"
          )
          i.fas.fa-plus.icon
 
</template>

<script>
import { mapModuleActions, mapModuleState } from '@/shared/services/map-store-module';
import { moduleName as cartModuleName } from '@/modules/cart/store/modules/cart';

export default {
  name: 'Product',

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      qty: 0
    };
  },

  computed: {
    ...mapModuleState(cartModuleName, { cartProducts: 'products' }),

    cartProductQty() {
      return this.cartProducts.length && this.getCartProductQty();
    }
  },

  methods: {
    ...mapModuleActions(cartModuleName, ['addProduct', 'removeProduct', 'updateProdQty']),

    getCartProductQty() {
      for (const product of this.cartProducts) {
        if (product.id === this.product.id) {
          return product.qty;
        }
      }

      return 0;
    },

    async updateQty(newQty) {
      const productId = this.product.id;

      if (newQty <= 0) {
        await this.removeProduct(productId);
      } else {
        await this.updateProdQty({ productId, qty: newQty });
      }
    }
  }
};
</script>
<style lang="sass" scoped>
.product.ui.card
  width: 250px

  .content
    height: 180px
    
    .description
      height: 25%
      .brand
        font-weight: bold
        color: black

    .price 
      font-size: 1.35em;
      font-weight: bold;

    .labels
      margin-top: 2em
      .label
        padding: .5em 1em
        border-radius: 50px
            
    .actions
      margin-top: .5em

      button
        color: #2185d0
        background-color: white

      .push-product
        box-shadow: 0px 0px 3px grey
        border-radius: 50px
        padding: .65em 3em
      
      .edit-buttons
        box-shadow: 0px 0px 3px grey
        border-radius: 50px
        
        .button
          padding-top: .65em
          padding-bottom: .65em

        .minus-button
          border-radius: 50px 0 0 50px
        
        .plus-button
          border-radius: 0 50px 50px 0 
        
        .product-qty
          cursor: pointer
          background-color: #F5F5F5
          width: 70px

</style>