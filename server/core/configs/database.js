module.exports = {
  uri: process.env.DB_URI,
  options: {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    authSource: process.env.DB_AUTH,
    useNewUrlParser: true,
    autoIndex: false
  }
};
