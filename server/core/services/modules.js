const schemas = require('./schemas');
const routes = require('./routes');
const views = require('./views');

module.exports = app => {
  console.log('Loading modules...');

  schemas();
  routes(app);
  views(app);
};
