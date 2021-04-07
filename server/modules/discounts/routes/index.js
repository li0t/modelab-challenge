module.exports = (router, mongoose) => {
  const Discount = mongoose.model('discount');

  router.get('/api/discounts/count', async (req, res, next) => {
    try {
      const query = Discount.countDocuments();

      const counted = await query;

      res.json(counted);
    } catch (error)  /* istanbul ignore next */{
      next(error);
    }
  });

  router.get('/api/discounts', async (req, res, next) => {
    try {
      const query = Discount.find()

        .skip(req.query.skip)

        .limit(req.query.limit);

      const discounts = await query;

      res.send(discounts);
    } catch (error)  /* istanbul ignore next */{
      next(error);
    }
  });
};
