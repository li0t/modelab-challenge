const mongoose = require('mongoose');
const walk = require('walkdir');
const path = require('path');
const ora = require('ora');

module.exports = app => {
  const spinner = ora();

  spinner.start('\nLoading routes');

  const root = path.join(process.cwd(), 'server');

  const paths = walk.sync(root);

  const routes = paths.filter(p => /routes\//g.test(p) && /\.js/g.test(p) && !/\.spec/g.test(p));

  for (let route of routes) {
    const routePath = route.split('/');
    
    const routeName = routePath[routePath.length - 1];
    
    const routeModel = routePath[routePath.length - 3];
    
    require(route)(app, mongoose);

    spinner.succeed(`${routeModel}/${routeName}`);
  }
};
