import getNewDiscount from '../get-new-discount';
import getTestDiscount from './utils/get-test-discount';

const { expect } = require('chai');

describe('Cart service', () => {
  describe('getNewDiscount', () => {
    const testDiscount = getTestDiscount();
    const newDiscount = getNewDiscount(testDiscount);

    it('should keep the threshold unchanged', async () => {
      expect(newDiscount.threshold).to.be.equals(testDiscount.threshold);
    });

    it('should keep the brand unchanged', async () => {
      expect(newDiscount.brand).to.be.equals(testDiscount.brand);
    });

    it('should keep the rename "discount" to "amount"', async () => {
      expect(newDiscount.amount).to.be.equals(testDiscount.discount);
    });

    it('should add missing attribute', async () => {
      expect(newDiscount.missing).to.be.equals(0);
    });

    it('should add threshold attribute', async () => {
      const testDiscount = getTestDiscount();
      delete testDiscount.threshold;

      const newDiscount = getNewDiscount(testDiscount);

      expect(newDiscount.threshold).to.be.a('number');
    });

    it('should add amount attribute', async () => {
      const testDiscount = getTestDiscount();
      delete testDiscount.discount;

      const newDiscount = getNewDiscount(testDiscount);

      expect(newDiscount.amount).to.be.a('number');
    });

    it('should add brand attribute', async () => {
      const testDiscount = getTestDiscount();
      delete testDiscount.brand;

      const newDiscount = getNewDiscount(testDiscount);

      expect(newDiscount.brand).to.be.a('string');
    });
  });
});
