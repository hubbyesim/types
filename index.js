// Re-export all functions from the generated schemas
const {
  // Partner and PriceList functions
  partnerToFirestore, 
  partnerFromFirestore,
  priceListToFirestore,
  priceListFromFirestore,
  
  // Other types and functions
  // ...add other exports as needed
} = require('./lib/schemas/partner');

// Export everything
module.exports = {
  partnerToFirestore,
  partnerFromFirestore,
  priceListToFirestore,
  priceListFromFirestore,
  // Re-export all compiled schemas
  ...require('./lib/schemas')
};

// For backwards compatibility
module.exports.default = module.exports;
