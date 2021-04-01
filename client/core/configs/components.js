/**
 * Global components service.
 *
 * @module core/configs/components
 */

const globalComponents = {};

/* Import every module's `plugins/*.js` dynamically */
const req = require.context('../../', true, /\/global-components.js$/);

const paths = [];

for (const path of req.keys()) {
  if (/store/.test(path)) {
    continue;
  }

  paths.push(path);
}

for (let path of paths) {
  const components = req(path).default;

  Object.assign(globalComponents, {
    ...components
  });
}

export default globalComponents;
