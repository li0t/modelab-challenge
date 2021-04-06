const is = require('@fiquu/is');

/**
 * Builds a mongoose "or" query with a list of brands names.
 *
 * @param {String[]|String} brandsNames A list of brands names.
 * @returns {Object[]} The "or" query array.
 */
function getBrandsQueries(brandsNames) {
  let brands = brandsNames;
  const queries = [];

  if (brands) {
    if (!is.array(brands)) {
      brands = [brands];
    }

    for (const brandName of brands) {
      queries.push({
        brand: brandName
      });
    }
  }
  
  return queries;
}

module.exports = getBrandsQueries;
