/**
 * Store mutation types module.
 *
 * @module store/mutation-types
 */

const req = require.context('../../', true, /\/store\/.+?\/mutation-types.js/);

const mutations = {};

for (let path of req.keys()) {
  const muts = req(path);

  Object.assign(mutations, muts);
}

export default mutations;
