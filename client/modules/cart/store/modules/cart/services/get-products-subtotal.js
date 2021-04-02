/**
 * Sums each product subtotal.
 *
 * @param {Object[]} products A list of products.
 * @returns {Number} The accumulated products subtotal.
 */
export default function getProductsSubtotal(products) {
  return products.reduce((sum, product) => (sum += product.subtotal), 0);
}
