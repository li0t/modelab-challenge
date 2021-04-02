<i18n>
es:
  DELIVERY: Despacho
  PICKUP: Retiro
  ADD_TO_CART: Agregar

</i18n>

<template lang="pug">
.product.ui.card
  .image
    img(:src="`https://${product.image}`")

  .content
    .description 
      .span.brand {{ product.brand }}
      | {{ product.description }}
      
    .price {{ product.price }}

    .labels.delivery
      .blue.icon.label 
        i.fas.fa-truck.icon
        | {{ $t('DELIVERY')}}
      .orange.icon.label
        i.fas.fa-warehouse.icon
        | {{ $t('PICKUP')}}

    .actions
      button.push-product.button(
        v-if="cartProductQty === 0"
        @click="addProduct(product)"
        )
        | {{ $t('ADD_TO_CART')}}

      .buttons.edit-buttons(
        v-else
        )

        button.icon.button(
          @click="updateQty(cartProductQty - 1)"
          )
          i.fas.fa-minus.icon


        .counter {{ cartProductQty }}

        button.button(
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
