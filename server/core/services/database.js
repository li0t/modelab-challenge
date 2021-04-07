const mongoose = require('mongoose');

const config = require('../configs/database');

module.exports = async () => {
  try {
    await mongoose.connect(config.uri, config.options);

    console.log('Database successfully connected!');
  } catch (err) /* istanbul ignore next */ {
    console.log("Couldn't connect to database!");
    console.error(err);
  }
};
