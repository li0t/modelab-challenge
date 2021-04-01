/**
 * Plugins service.
 *
 * @module core/configs/plugins
 */

const plugins = [];

/* Import every module's `plugins/*.js` dynamically */
const req = require.context('../../', true, /\/plugins\/.+\.js$/);

const paths = [];

for (const path of req.keys()) {
  if (/store/.test(path)) {
    continue;
  }

  paths.push(path);
}

for (let path of paths) {
  plugins.push(req(path).default);
}

export default plugins;
