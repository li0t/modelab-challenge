/**
 * Store plugins module.
 *
 * @module store/plugins
 */

const plugins = [];

/* Import every module's `modules/store/plugins../.js` dynamically */
const req = require.context('../../', true, /\/store\/.+?\/plugins\/.+\.js$/);

for (let path of req.keys()) {
  const plugin = req(path);

  plugins.push(plugin.default);
}

export default plugins;
