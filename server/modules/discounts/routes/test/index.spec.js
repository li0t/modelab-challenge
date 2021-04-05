const path = require('path');

const utilsPath = path.join(process.cwd(), 'server', 'core', 'services', 'test', 'utils');

const { expect } = require('chai');

let req;

describe('PRODUCTS API', () => {
  before(async () => {
    req = await require(path.join(utilsPath, 'req'))();
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
