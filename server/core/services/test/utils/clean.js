/**
 * Clean utility module.
 *
 * @module core/services/test/utils/clean
 */

const mongoose = require('mongoose');
const chai = require('chai');

const models = [
  'products',
  'discounts'
];

async function clean(modelName) {
  if (modelName) {
    await mongoose.model(modelName).deleteMany({});

    const count = await mongoose.model(modelName).countDocuments();

    chai.expect(count).to.equal(0);
    return;
  }

  for (const model of models) {
    await mongoose.model(model).deleteMany({});

    const count = await mongoose.model(model).countDocuments();

    chai.expect(count).to.equal(0);
  }
}

module.exports = clean;
