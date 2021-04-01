const path = require('path');

if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  module.exports = path.join('dist');
} else {
  module.exports = path.join('public');
}
