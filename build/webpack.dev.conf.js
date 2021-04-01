'use strict';

const utils = require('./utils');
const webpack = require('webpack');
const configs = require('../configs');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const serverPort = require('../server/configs/server').port;
const APP_VERSION = require('../package.json').version;
const APP_NAME = require('../package.json').name;

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: configs.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: configs.dev.devtool,

  // these devServer options should be customized in /configs/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(configs.dev.assetsPublicPath, 'index.html')
        }
      ]
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || configs.dev.host,
    port: PORT || configs.dev.port,
    open: configs.dev.autoOpenBrowser,
    overlay: configs.dev.errorOverlay
      ? {
          warnings: false,
          errors: true
        }
      : false,
    publicPath: configs.dev.assetsPublicPath,
    proxy: configs.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: configs.dev.poll
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../configs/dev.env'),
      SERVER_PORT: JSON.stringify(serverPort),
      APP_VERSION: JSON.stringify(APP_VERSION),
      APP_NAME: JSON.stringify(APP_NAME)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: configs.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || configs.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer configs
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
          },
          onErrors: configs.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
        })
      );

      resolve(devWebpackConfig);
    }
  });
});
