const buildSearchRegEx = require('../../../shared/services/search-regex');

module.exports = function getTextSearch(text) {
  const regex = buildSearchRegEx(text);

  return { description: regex };
};
