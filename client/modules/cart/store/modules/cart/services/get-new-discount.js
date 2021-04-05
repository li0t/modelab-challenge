/**
 * @module cart/store/modules/cart/services/get-new-discount
 */

/**
 * Builds a discount object to store in the cart
 * renaming the "discount" attribute to "amount".
 *
 * @param {Object} discount A discount object.
 * @returns {Object} A new cart discount.
 */
export default function getNewDiscount(discount = {}) {
  return {
    threshold: discount.threshold || 0,
    amount: discount.discount || 0,
    brand: discount.brand || '',
    missing: 0
  };
}
