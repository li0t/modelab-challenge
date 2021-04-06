const getTextSearch = require('./get-text-search');
const getBrandsQueries = require('./get-brands-queries');

/**
 * Builds an "and" query for the product schema.
 *
 * @param {String} searchText A text to use as filter.
 * @param {String[]} brands A brands list to use as filter.
 * @returns {Object} The "and" query
 */
function getProductsQuery(searchText, brands) {
  const $and = [];
  if (searchText || brands) {
    if (searchText) {
      const textQuery = getTextSearch(searchText);

      $and.push(textQuery);
    }

    if (brands) {
      const brandsQueries = getBrandsQueries(brands);

      $and.push({ $or: brandsQueries });
    }
  }

  if ($and.length === 0) {
    return null;
  }

  return { $and };
}

module.exports = getProductsQuery;
