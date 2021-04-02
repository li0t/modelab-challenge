import getNewDiscount from "./get-new-discount";


/**
 * Filters the brands discounts present in the products list.
 *
 * @param {Object[]} discountsList A list brands discounts.
 * @param {Object[]} products A list of products.
 * @returns {Object[]} The brands discounts.
 */
export default function getProductsDiscounts(discountsList, products) {
  const discounts = [];

  for (const discount of discountsList) {
    const exists = products.find(product => product.brand === discount.brand);

    if (exists) {
      const newDiscount = getNewDiscount(discount);

      discounts.push(newDiscount);
    }
  }

  return discounts;
}
