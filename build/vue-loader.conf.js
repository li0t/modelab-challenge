'use strict';

const utils = require('./utils');
const configs = require('../configs');
const isProduction = process.env.NODE_ENV === 'production';
const sourceMapEnabled = isProduction ? configs.build.productionSourceMap : configs.dev.cssSourceMap;

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: configs.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
};
