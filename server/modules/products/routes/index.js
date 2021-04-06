const getQuerySort = require('../../../shared/services/get-query-sort');
const getBrandsQueries = require('../services/get-brands-queries');
const buildSearch = require('../services/search');
const SORT_PARAMS = ['name'];

module.exports = (router, mongoose) => {
  const Product = mongoose.model('product');

  router.get('/api/products/count', async (req, res, next) => {
    try {
      const query = Product.countDocuments().skip(req.query.skip);
      
      if (req.query.text) {
        const search = buildSearch(req.query.text);

        query.or(search);
      }

      if (req.query.brands) {
        const brandsQueries = getBrandsQueries(req.query.brands);

        query.or(brandsQueries);
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

      if (req.query.brands) {
        const brandsQueries = getBrandsQueries(req.query.brands);

        query.or(brandsQueries);
      }

      const products = await query;

      res.send(products);
    } catch (error) {
      next(error);
    }
  });
};
