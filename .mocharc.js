'use strict';

module.exports = {
  exit: true,
  bail: true,
  diff: true,
  extension: ['js'],
  opts: false,
  package: './package.json',
  reporter: 'spec',
  slow: 75,
  timeout: 100000,
  ui: 'bdd',
  type: 'module',
  require: 'esm',
  ignore: ['client/semantic/*'],
  spec: ['server/**/*.spec.js', 'client/**/*.spec.js'],
  file: 'test'
};
