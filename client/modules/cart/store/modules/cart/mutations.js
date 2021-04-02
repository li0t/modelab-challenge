/**
 * @module cart/store/modules/cart/mutations
 */

import MT from '@/store/mutation-types';
import getNewProduct from './services/get-new-product';

export default {
  [MT.ADD_PRODUCT](state, product) {
    const newProduct = getNewProduct(product);

    state.products.push(newProduct);
  },

  [MT.REMOVE_PRODUCT](state, productId) {
    const products = state.products;

    const productIndex = products.findIndex(prod => prod.id === productId);

    if (productIndex === -1) {
      throw new Error(`Product ${productId} was not found`);
    }

    products.splice(productIndex, 1);
  },

  [MT.UPDATE_PROD_QTY](state, { productId, qty }) {
    const products = state.products;

    const product = products.find(prod => prod.id === productId);

    if (!product) {
      throw new Error(`Product ${productId} was not found`);
    }

    product.qty = qty;
    product.subtotal = product.price * qty;
  },

  [MT.UPDATE_SUBTOTAL](state) {
    let subtotal = 0;

    for (const product of state.products) {
      subtotal += product.subtotal;
    }

    state.subtotal = subtotal;
  },

  [MT.UPDATE_DISCOUNT](state, discount ) {
    state.discount = discount;
  },

  [MT.UPDATE_DISCOUNT_ALTERNATIVE](state, discountAlternative ) {
    state.discountAlternative = discountAlternative;
  },

  [MT.UPDATE_TOTAL](state) {
    state.total = state.subtotal - state.discount.amount;
  }
};
