const path = require('path');

const testServices = path.join(process.cwd(), 'test', 'services');

const { expect } = require('chai');

let req;

describe('PRODUCTS API', () => {
  before(async () => {
    req = await require(path.join(testServices, 'req'))();
  });

  describe('[GET /discounts]', () => {
    it('should count discounts', async () => {
      const res = await req.get('/api/discounts/count');

      expect(res.statusCode).to.equal(200);

      expect(res.body).be.a('number');
    });

    it('should fetch active discounts', async () => {
      const res = await req.get('/api/discounts');

      expect(res.statusCode).to.equal(200);
      expect(res.body.length).to.be.a('number');
      expect(res.body).to.be.an('array');

      for (const discount of res.body) {
        expect(discount).to.be.an('object');
      }
    });
  });
});
