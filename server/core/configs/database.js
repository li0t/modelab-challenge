module.exports = {
  uri: process.env.DB_URI,
  options: {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    useNewUrlParser: true,
    autoIndex: false
  }
};
