const path = require('path');
const os = require('os');

const envIndex = process.argv.indexOf('--env');
const pkg = require('./package.json');

let env = process.env.NODE_ENV || 'development';

if (envIndex > -1) {
  env = process.argv[envIndex + 1];
}

console.log(`- Environment is [${env}]`);

const POST_DEPLOY = `npm i --production && node setup/env --profile ${env} && pm2 startOrGracefulReload ecosystem.config.js`;
const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
const STAGING = 'staging';
const TESTING = 'testing';

let instances, watch, force;

switch (env) {
  case TESTING:
    instances = 2;
    break;

  case DEVELOPMENT:
    watch = ['package.json', 'server'];
    instances = 2;
    break;

  default:
    instances = 0;
}

module.exports = {
  /**
   * Application configuration section.
   *
   * @see https://pm2.io/doc/en/runtime/guide/ecosystem-file/
   */
  apps: [
    {
      name: pkg.name,
      script: pkg.main,
      exec_mode: 'cluster_mode',
      log_date_format: '', // Use default ISO format
      listen_timeout: 30000,
      wait_ready: true,
      instances,
      env: {},
      force,
      watch,
      env_development: {
        NODE_ENV: DEVELOPMENT,
        DEBUG_HIDE_DATE: true,
        DEBUG: 'app:*'
      },
      env_staging: {
        NODE_ENV: STAGING,
        DEBUG_HIDE_DATE: true,
        DEBUG: 'app:*'
      },
      env_production: {
        NODE_ENV: PRODUCTION,
        DEBUG: ''
      },
      env_testing: {
        NODE_ENV: TESTING,
        DEBUG: ''
      }
    }
  ],

  /**
   * Deployment section.
   *
   * @see https://pm2.io/doc/en/runtime/guide/easy-deploy-with-ssh/
   */
  deploy: {
    staging: {
      key: path.resolve(path.join(os.homedir(), 'Environments', pkg.group.title, 'Staging', 'credentials.pem')),
      host: pkg.deploy.staging.host,
      ref: pkg.deploy.staging.ref, // Should be stable but we has no testing.
      repo: pkg.repository.url,
      path: path.resolve(path.join(path.sep, 'home', pkg.deploy.staging.user, pkg.name)),
      user: pkg.deploy.staging.user,
      env: {
        NODE_ENV: STAGING,
        DEBUG: 'app:*'
      },

      'post-deploy': `${POST_DEPLOY} --env ${STAGING}`
    },
    production: {
      key: path.resolve(path.join(os.homedir(), 'Environments', pkg.group.title, 'Production', 'credentials.pem')),
      host: pkg.deploy.production.host,
      ref: pkg.deploy.production.ref,
      repo: pkg.repository.url,
      path: path.resolve(path.join(path.sep, 'home', pkg.deploy.production.user, pkg.name)),
      user: pkg.deploy.production.user,
      env: {
        NODE_ENV: PRODUCTION,
        DEBUG: ''
      },

      'post-deploy': `${POST_DEPLOY} --env ${PRODUCTION}`
    }
  }
};
