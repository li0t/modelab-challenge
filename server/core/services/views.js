const walk = require('walkdir');
const path = require('path');
const ora = require('ora');

module.exports = app => {
  const spinner = ora();

  spinner.start('\nLoading views');

  const root = path.join(process.cwd(), 'server');

  const paths = walk.sync(root);

  const viewsConfigs = paths.filter(p => /configs\/views.js/.test(p));

  let views = [];

  for (const config of viewsConfigs) {
    views = views.concat(require(config));
  }

  for (const view of views) {
    spinner.succeed(view);
  }

  /* istanbul ignore next */
  app.get(views, (req, res) => {
    if (process.env.NODE_ENV === 'testing') {
      res.end();

      return;
    }

    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
  });
};
