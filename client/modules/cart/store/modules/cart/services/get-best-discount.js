/**
 * @module cart/store/modules/cart/services/get-best-discount
 */

import getProductsDiscounts from './get-products-discounts';
import getProductsSubtotal from './get-products-subtotal';
import getProductsOfBrand from './get-products-of-brand';
import getNewDiscount from './get-new-discount';

/**
 * Calculates the best discount and the best alternative discount
 * for a list of products.
 *
 * @param {Object[]} discountsList A list of discounts.
 * @param {Object[]} products A list products.
 * @returns {Object} The best discount and alternative discount.
 */
export default function getBestDiscount(discountsList, products) {
  const discountAlternative = getNewDiscount();
  const bestDiscount = getNewDiscount();

  const productsDiscounts = getProductsDiscounts(discountsList, products);

  for (const discount of productsDiscounts) {
    if (discount.amount <= bestDiscount.amount) {
      continue;
    }

    const brandProducts = getProductsOfBrand(products, discount.brand);
    const brandSubtotal = getProductsSubtotal(brandProducts);

    const meetsThreshold = brandSubtotal >= discount.threshold;

    if (meetsThreshold) {
      bestDiscount.brand = discount.brand;
      bestDiscount.amount = discount.amount;
      bestDiscount.threshold = discount.threshold;
    } else {
      discountAlternative.brand = discount.brand;
      discountAlternative.amount = discount.amount;
      discountAlternative.threshold = discount.threshold;
      discountAlternative.missing = discount.threshold - brandSubtotal;
    }
  }

  if (bestDiscount.amount > discountAlternative.amount) {
    discountAlternative.amount = 0;
    discountAlternative.brand = null;
  }

  return {
    discountAlternative,
    bestDiscount
  };
}
