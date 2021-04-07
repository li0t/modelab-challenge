import getBestDiscount from '../get-best-discount';

import getTestDiscounts from './utils/get-test-discounts';

const { expect } = require('chai');

describe('Cart service', () => {
  describe('getBestDiscount', () => {
    it('should choose the bestDiscount', async () => {
      const { products, discounts } = getTestDiscounts();

      const discountWithHighestAmout = discounts[0];

      const { discountAlternative, bestDiscount } = getBestDiscount(discounts, products);

      expect(bestDiscount.brand).to.be.equals(discountWithHighestAmout.brand);
      expect(discountAlternative.brand).to.be.null;
    });
  });
});
