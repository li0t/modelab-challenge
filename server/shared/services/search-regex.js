const removeDiacritics = require('diacritics').remove;

const DEFAULT_FLAGS = 'si';

/**
 * Builds a regex from a string.
 *
 * @param {String} searchText The string to query.
 * @returns {String} A regex string.
 */
function _buildSearchRegEx(searchText) {
  if (!searchText) {
    return '';
  }

  const cleanText = removeDiacritics(searchText);
  const searchWords = cleanText.split(' ');
  let builtRegEx = `.*${searchWords[0]}.*`;

  if (searchWords.length > 1) {
    for (let i = 1; i < searchWords.length; i++) {
      const searchWord = searchWords[i];

      if (searchWord.length > 0) {
        builtRegEx += `|.*${searchWord}.*`;
      }
    }
  }

  return builtRegEx;
}

/**
 * Builds a mongo query with a regex string.
 *
 * @param {String} searchText The string to query.
 * @param {String} [options] Optional regex flags.
 * @returns {Object} A valid mongo regex query object.
 */
function buildSearchRegEx(searchText, options) {
  return {
    $regex: _buildSearchRegEx(searchText),
    $options: options || DEFAULT_FLAGS
  };
}

module.exports = buildSearchRegEx;
