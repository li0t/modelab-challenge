const buildSearchRegEx = require('../../../shared/services/search-regex');

module.exports = function buildSearch(text) {
  const regex = buildSearchRegEx(text);

  return [{ name: regex }];
};
