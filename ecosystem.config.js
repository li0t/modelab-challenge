const envIndex = process.argv.indexOf('--env');
const pkg = require('./package.json');

let env = process.env.NODE_ENV || 'development';

if (envIndex > -1) {
  env = process.argv[envIndex + 1];
}

console.log(`- Environment is [${env}]`);

const DEVELOPMENT = 'development';

let instances, watch, force;

switch (env) {
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
      }
    }
  ]
};
