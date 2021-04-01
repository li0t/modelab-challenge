const mongoose = require('mongoose');

const utilsPath = path.join(process.cwd(), 'server', 'core', 'services', 'test', 'utils');
const req = require(path.join(utilsPath, 'req'));

describe('PRODUCTS API', () => {
  describe('[GET /discounts]', () => {
    it('should count discounts', async () => {
      const res = await req.get('/api/discounts/count');

      expect(res.statusCode).to.equal(200);

      expect(res.body).be.a.number;
    });

    it('should fetch active discounts', async () => {
      const res = await req.get('/api/discounts');

      expect(res.statusCode).to.equal(200);
      expect(res.body.length).to.be.a.number;
      expect(res.body).to.be.an('array');

      for (const discount of res.body) {
        expect(discount).to.be.an('object');
      }
    });

    it('should find discounts by a text search', async () => {
      const discount = await mongoose
        .model('discount')
        .findOne()

        .where('disabledAt')
        .equals(null)

        .lean();

      let description = discount.description.split('');
      description.pop();

      const text = description.join('');

      const res = await req.get(`/api/discounts?text=${text}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array');

      const found = !!res.body.find(f => f.description === discount.description);

      expect(found).to.be.true;
    });
  });
});
