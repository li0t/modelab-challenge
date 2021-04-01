const path = require('path');

const { outputDir, devServer, sourceDir, pwa } = require('./configs/index');

module.exports = {
  productionSourceMap: false,
  runtimeCompiler: true,
  lintOnSave: true,
  integrity: true,
  outputDir,
  pwa,

  configureWebpack: {
    devtool: false,
    devServer,

    entry: {
      app: path.join(sourceDir, 'main.js')
    },

    resolve: {
      alias: {
        '@': sourceDir
      }
    }
  },

  chainWebpack: config => {
    // Configure `docs` loader
    config.module
      .rule('docs')
      .resourceQuery(/blockType=docs/)

      .use('docs')
      .loader('raw-loader')
      .end();

    // Configure `i18n` loader
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')

      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()

      .use('yaml')
      .loader('yaml-loader')
      .end();

    // Load `index.pug` instead of `index.html`
    config.plugin('html').tap(args => {
      args[0].template = `!!pug-loader!${path.join(sourceDir, 'index.pug')}`;
      args[0].package = require('./package.json');

      return args;
    });
  }
};
sourceDir;
