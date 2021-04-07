const queryParser = require('../query-parser');

const { expect } = require('chai');

describe('SERVER SERVICES', () => {
  describe('QUERY PARSER', () => {
    it('should fill default values', async () => {
      const query = { limit: NaN, page: NaN };

      queryParser({ query }, null, () => {});

      expect(query.limit).to.be.equals(10);
      expect(query.skip).to.be.equals(0);
    });


    it('should keep given values', async () => {
      const query = { limit: 20, page: 3 };

      queryParser({ query }, null, () => {});

      expect(query.limit).to.be.equals(20);
      expect(query.skip).to.be.equals(40);
    });
  });
});
