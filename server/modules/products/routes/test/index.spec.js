const mongoose = require('mongoose');
const path = require('path');

const utilsPath = path.join(process.cwd(), 'server', 'core', 'services', 'test', 'utils');

const { expect } = require('chai');

let req;

describe('PRODUCTS API', () => {
  before(async () => {
    req = await require(path.join(utilsPath, 'req'))();
  });

  describe('[GET /products]', () => {
    it('should count products', async () => {
      const res = await req.get('/api/products/count');

      expect(res.statusCode).to.equal(200);

      expect(res.body).be.a('number');
    });

    it('should fetch active products', async () => {
      const res = await req.get('/api/products');

      expect(res.statusCode).to.equal(200);
      expect(res.body.length).to.be.a('number');
      expect(res.body).to.be.an('array');

      for (const product of res.body) {
        expect(product).to.be.an('object');
      }
    });

    it('should find products by a text search', async () => {
      const product = await mongoose
        .model('product')
        .findOne()

        .lean();

      let description = product.description.split('');
      description.pop();

      const text = description.join('');

      const res = await req.get(`/api/products?text=${text}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array');

      console.log(text)

      const found = !!res.body.find(f => f.description === product.description);

      expect(found).to.be.true;
    });
  });
});
