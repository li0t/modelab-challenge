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
  spec: 'server/**/*.spec.js',
  file: 'server/core/services/test'
};
