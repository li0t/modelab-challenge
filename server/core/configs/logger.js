if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  module.exports = ':date[iso] :method :url :status';
} else {
  module.exports = ':date[iso] :method :url :status - :response-time ms';
}
