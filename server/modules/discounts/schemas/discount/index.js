const options = require('../../../../shared/mixins/options');

module.exports = Schema => {
  const content = {
    brand: {
      type: String,
      required: true
    },

    threshold: {
      type: Number,
      required: true
    },

    discount: {
      type: Number,
      required: true
    }
  };

  const schema = new Schema(content, options);

  return schema;
};
