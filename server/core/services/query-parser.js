/**
 * Set max and min values for query params.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
module.exports = (req, res, next) => {
  const limit = parseInt(req.query.limit, 10);
  const page = parseInt(req.query.page, 10);

  req.query.limit = !isNaN(limit) ? limit : 10;
  req.query.skip = !isNaN(page) ? Math.max(page - 1, 0) * req.query.limit : 0;

  next();
};
