const path = require('path');

if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  module.exports = path.join('dist', 'favicon.ico');
} else {
  module.exports = path.join('public', 'favicon.ico');
}
