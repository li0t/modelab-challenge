/**
 * Test service module.
 *
 * @module core/services/test
 */

const $utils = require('./utils');

describe('MODELAB-CHALLENGE', () => {
  before(async () => {
    await require('./utils/req')();
  });
});

after(async () => {
  await $utils.clean();
});
