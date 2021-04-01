/**
 * Store modules module.
 *
 * @module store/modules
 */

const modules = {};

/* Import every module's `modules/../index.js` dynamically */
const req = require.context('../../', true, /\/store\/modules\/.+?\/index.js/);

const paths = [];

for (const path of req.keys()) {
  // Only request the index file of the store module
  if (/actions|getters|mutations|plugins/.test(path)) {
    continue;
  }

  paths.push(path);
}

for (let path of paths) {
  const storeModule = req(path);

  const moduleName = storeModule.moduleName;

  // Only export modules with explicit module name and not flagged as submodule
  if (!moduleName || storeModule.submodule) {
    continue;
  }

  modules[moduleName] = storeModule.default;
}

export default modules;
