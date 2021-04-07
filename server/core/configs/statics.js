const path = require('path');

/* istanbul ignore if */
if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  module.exports = path.join('dist');
} else {
  module.exports = path.join('public');
}
