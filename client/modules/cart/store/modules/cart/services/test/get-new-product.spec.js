import getNewProduct from '../get-new-product';
import getTestProduct from './utils/get-test-product';

const { expect } = require('chai');

describe('Cart service', () => {
  describe('getNewProduct', () => {
    const testProduct = getTestProduct();
    const newProduct = getNewProduct(testProduct);

    it('should keep the values unchanged', async () => {
      for (const attrName of Object.keys(testProduct)) {
        expect(testProduct[attrName]).to.be.equals(newProduct[attrName]);
      }
    });

    it('should add the qty attribute to a new product', async () => {
      expect(newProduct.qty).to.be.equals(1);
    });

    it('should add the subtotal attribute to a new product', async () => {
      expect(newProduct.subtotal).to.be.equals(testProduct.price);
    });
  });
});
