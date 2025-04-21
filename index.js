// Re-export all schemas and helpers
const schemas = require('./lib/schemas');

// Include all the regular types as well
const types = {
  ...require('./lib/package'),
  ...require('./lib/partner'),
  ...require('./lib/user'),
  ...require('./lib/country'),
  ...require('./lib/booking'),
  ...require('./lib/promoCode'),
  ...require('./lib/hubby'),
  ...require('./lib/esim'),
  ...require('./lib/api'),
  ...require('./lib/payment'),
  ...require('./lib/apiLogs'),
  ...require('./lib/constants')
};

// Export everything
module.exports = {
  ...types,
  ...schemas
};

// For backwards compatibility
module.exports.default = module.exports;
