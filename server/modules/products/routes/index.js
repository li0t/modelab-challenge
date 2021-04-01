const getQuerySort = require('../../../shared/services/get-query-sort');
const buildSearch = require('../services/search');

const SORT_PARAMS = ['name'];

module.exports = (router, mongoose) => {
  const Product = mongoose.model('product');

  router.get('/api/products/count', async (req, res, next) => {
    try {
      const query = Product.countDocuments();

      if (req.query.text) {
        const search = buildSearch(req.query.text);

        query.or(search);
      }

      const counted = await query;

      res.json(counted);
    } catch (error) {
      next(error);
    }
  });

  router.get('/api/products', async (req, res, next) => {
    const sort = getQuerySort(req, SORT_PARAMS);
    try {
      const query = Product.find()
        .sort(sort)

        .skip(req.query.skip)

        .limit(req.query.limit);

      if (req.query.text) {
        const search = buildSearch(req.query.text);

        query.or(search);
      }

      const products = await query;

      res.send(products);
    } catch (error) {
      next(error);
    }
  });

};
