/**
 * @module cart/store/modules/cart/services/get-products-of-brand
 */

/**
 * Filters all products of a given brand.
 * 
 * @param {Object[]} products A list of products. 
 * @param {String} brandName A brand name.
 * @returns {Object[]} The found products.
 */
export default function getProductsOfBrand(products, brandName) {
  return products.filter(product => product.brand === brandName);
}
