<i18n>
es:


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
        i.truck.icon
        | {{ $t('DELIVERY')}}
      .orange.icon.label
        i.warehouse.icon
        | {{ $t('PICKUP')}}

    .actions
      button.add-to-cart.button(
        v-if="qty === 0"
        @click="addToCart()"
        )

      .buttons.edit-buttons(
        v-else
        )

        button.remove-qty.button(
          @click="addProduct()"
        )

        .counter {{ qty }}

        button.add-qty.button(
          @click="removeProduct()"
        )
        
 
</template>

<script>
export default {
  name: 'Products',

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

  computed: {},

  methods: {
    addToCart() {
      this.qty = 1;
    },

    addProduct() {
      this.qty += 1;
    },

    removeProduct() {
      this.qty -= 1;
    }
  }
};
</script>
