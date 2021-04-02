import getProductsDiscounts from './get-products-discounts';
import getProductsOfBrand from './get-products-of-brand';
import getProductsSubtotal from './get-products-subtotal';

/**
 * Calculates the best discount and the best alternative discount
 * for a list of products.
 *
 * @param {Object[]} discountsList A list of discounts.
 * @param {Object[]} products A list products.
 * @returns {Object} The best discount and alternative discount.
 */
export default function getBestDiscount(discountsList, products) {
  const discountAlternative = {
    brand: null,
    discount: 0
  };

  const bestDiscount = {
    brand: null,
    discount: 0
  };

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
    } else {
      discountAlternative.brand = discount.brand;
      discountAlternative.amount = discount.amount;
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
