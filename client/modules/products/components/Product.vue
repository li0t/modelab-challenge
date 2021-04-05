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

      .buttons.edit-buttons(
        v-else
        )

        button.ui.icon.button(
          @click="updateQty(cartProductQty - 1)"
          )
          i.fas.fa-minus.icon


        .counter {{ cartProductQty }}

        button.ui.button(
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

      .push-product
        border-radius: 50px
        padding: .65em 3em
</style>