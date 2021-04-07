const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const errors = require('tl-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const http = require('http');
const path = require('path');
const is = require('@fiquu/is');

/* istanbul ignore next */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const TESTING = process.env.NODE_ENV === 'testing';

mongoose.set('useFindAndModify', false);

console.log(`Loading .env.${process.env.NODE_ENV}`);

const dotenv = path.join(process.cwd(), `.env.${process.env.NODE_ENV}`);

/* Load environment vars */
require('dotenv').config({
  path: dotenv
});

// Leave these imports after loading dotenv
const queryParser = require('./core/services/query-parser');
const database = require('./core/services/database');
const modules = require('./core/services/modules');

const configs = {
  favicon: require('./core/configs/favicon'),
  statics: require('./core/configs/statics'),
  logger: require('./core/configs/logger'),
  server: require('./core/configs/server'),
  errors: require('./core/configs/errors'),
  cors: require('./core/configs/cors')
};

module.exports = (async function() {
  const app = express();

  // Configure the module
  errors.config(configs.errors);

  app.use(favicon(configs.favicon));

  /* istanbul ignore if */
  if (!TESTING) {
    app.use(logger(configs.logger)); // Logger shouldn't have to log favicon calls
  }
  
  app.use(express.static(configs.statics));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(
    bodyParser.urlencoded({
      extended: false,
      limit: '10mb'
    })
  );

  app.use(queryParser);

  app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
    next();
  });

  /** Configure cors middleware to filter requests */
  app.use(cors(configs.cors));

  /** Configure modules */
  modules(app);

  /** Configure errors middleware at the end */
  app.use(errors.notFoundMiddleware);
  app.use(errors.handler);

  app.set('trust proxy', 1);

  await database();

  /* Start server */
  const server = http.createServer(app).listen(configs.server.http);

  console.log(`[${process.env.NODE_ENV}] API listening on port ${configs.server.http}`);

  /* istanbul ignore if */
  if (is.func(process.send)) {
    process.send('ready');
  }

  return server;
})();
