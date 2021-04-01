const whitelist = [
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:49300'
];

module.exports = {
  origin: function checkOrigin(origin, callback) {
    if (origin && !whitelist.includes(origin)) {
      return callback(new Error(`${origin} Not allowed by CORS`));
    }
    callback(null, true);
  },

  credentials: true
};
