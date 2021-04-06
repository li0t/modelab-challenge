const getProductsQuery = require('../services/get-products-query');

module.exports = (router, mongoose) => {
  const Product = mongoose.model('product');

  router.get('/api/products/count', async (req, res, next) => {
    try {
      const query = Product.countDocuments().skip(req.query.skip);

      const productsQuery = getProductsQuery(req.query.text, req.query.brands);

      if (productsQuery) {
        query.where(productsQuery);
      }

      const counted = await query;

      res.json(counted);
    } catch (error) {
      next(error);
    }
  });

  router.get('/api/products', async (req, res, next) => {
    try {
      const query = Product.find()

        .skip(req.query.skip)

        .limit(req.query.limit);

      const productsQuery = getProductsQuery(req.query.text, req.query.brands);

      if (productsQuery) {
        query.where(productsQuery);
      }

      const products = await query;

      res.send(products);
    } catch (error) {
      next(error);
    }
  });
};
