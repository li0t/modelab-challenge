const options = require('../../../../shared/mixins/options');

module.exports = (Schema) => {
  const content = {
    id: {
      type: Number,
      required: true
    },

    brand: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true,
      index: true
    },

    image: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    }
  };

  const schema = new Schema(content, options);

  return schema;
};
