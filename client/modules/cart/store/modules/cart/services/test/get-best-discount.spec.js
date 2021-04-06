import getBestDiscount from '../get-best-discount';

import getTestDiscounts from './utils/get-test-discounts';

const { expect } = require('chai');

describe('Cart service', () => {
  describe('getBestDiscount', () => {
    it('should return the bestDiscount and the discountAlternative', async () => {
      const { products, discounts } = getTestDiscounts();

      const { discountAlternative, bestDiscount } = getBestDiscount(discounts, products);

      expect(bestDiscount.brand).to.be.equals(discounts[0].brand);
      expect(discountAlternative.brand).to.be.null;
    });
  });
});
