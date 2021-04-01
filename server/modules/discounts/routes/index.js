const getQuerySort = require('../../../shared/services/get-query-sort');
const buildSearch = require('../services/search');

const SORT_PARAMS = ['name'];

module.exports = (router, mongoose) => {
  const Discount = mongoose.model('discount');

  router.get('/api/discounts/count', async (req, res, next) => {
    try {
      const query = Discount.countDocuments();

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

  router.get('/api/discounts', async (req, res, next) => {
    const sort = getQuerySort(req, SORT_PARAMS);
    try {
      const query = Discount.find()
        .sort(sort)

        .skip(req.query.skip)

        .limit(req.query.limit);

      if (req.query.text) {
        const search = buildSearch(req.query.text);

        query.or(search);
      }

      const discounts = await query;

      res.send(discounts);
    } catch (error) {
      next(error);
    }
  });

};
