const mongoose = require('mongoose');
const walk = require('walkdir');
const path = require('path');
const ora = require('ora');
const is = require('@fiquu/is');

function isSchemaPath(path) {
  return /schemas\//g.test(path) && /index\.js/g.test(path) && !/middlewares\//g.test(path)&& !/statics\//g.test(path);
}

module.exports = () => {
  const spinner = ora();

  spinner.start('\nLoading schemas');

  const root = path.join(process.cwd(), 'server');

  const paths = walk.sync(root);

  const schemas = paths.filter(p => isSchemaPath(p));

  for (const filename of schemas) {
    const dirs = filename.split('/');

    const schemaName = dirs[dirs.length - 2];

    const schema = require(filename);

    /* istanbul ignore next */
    if (is.func(schema)) {
      const schemaDefinition = schema(mongoose.Schema);

      mongoose.model(schemaName, schemaDefinition);

      spinner.succeed(schemaName);
    }
  }
};
