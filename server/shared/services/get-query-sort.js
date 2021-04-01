const SORT_PARAMS = ['createdAt', 'updatedAt'];
const is = require('@fiquu/is');

/**
 * Creates a sorting object based on query params.
 *
 * @param {Object} req
 * @param {Object} sort
 */
function getQuerySort(req, params) {
  const sort = {};

  const sortParams = SORT_PARAMS.concat(params);

  for (const param of sortParams) {
    const value = parseInt(req.query[param]);

    if (value === 1 || value === -1) {
      sort[param] = value;
    }
  }

  if (is.empty(sort)) {
    sort.createdAt = -1;
  }

  return sort;
}

module.exports = getQuerySort;
