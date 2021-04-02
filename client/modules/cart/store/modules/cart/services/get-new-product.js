/**
 * @module cart/store/modules/cart/services/get-new-product
 */

/**
 * Builds a product to store in the cart
 * with the product attributes plus a qty
 * and a subtotal.
 *
 * @param {Object} product The product info.
 * @returns {Object} A new cart product.
 */
export default function getNewProduct(product) {
  return {
    description: product.description,
    subtotal: product.price,
    brand: product.brand,
    image: product.image,
    price: product.price,
    id: product.id,
    qty: 1
  };
}
