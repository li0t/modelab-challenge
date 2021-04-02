/**
 * Builds a discount object to store in the cart
 * renaming the "discount" attribute to "amount". 
 * 
 * @param {Object} discount A discount object.
 * @returns {Object} A new cart discount.
 */
export default function getNewDiscount(discount) {
  return {
    threshold: discount.threshold,
    brand: discount.brand,
    amount: discount.discount
  };
}
