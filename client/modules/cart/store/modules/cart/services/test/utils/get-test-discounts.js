import getNewDiscount from '../../get-new-discount';
import getNewProduct from '../../get-new-product';

import getTestProduct from './get-test-product';
import getTestDiscount from './get-test-discount';

/**
 * Builds an array of products and one of discounts
 * to test the "getBestDiscount" service.
 *
 * @returns {Object} The test object.
 */
export default function getTestDiscounts() {
  const products = [];
  const discounts = [];

  for (let i = 1; i <= 4; i++) {
    const testDiscount = getNewDiscount(getTestDiscount());

    testDiscount.threshold = i * 100; 
    testDiscount.discount = i * 10; 

    discounts.push(testDiscount);

    for (let i = 1; i <= 4; i++) {
      let testProduct = getTestProduct();

      testProduct.brand = testDiscount.brand;
      testProduct.price = testDiscount.threshold / 4;
      testProduct.subtotal = testDiscount.threshold / 4;

      testProduct = getNewProduct(testProduct);

      products.push(testProduct);
    }
  }

  discounts.sort((discount1, discount2) => (discount1.discount < discount2.discount ? 1 : -1));
  products.sort((product1, product2) => (product1.brand < product2.brand ? 1 : -1));

  return { products, discounts };
}
