import { Payment } from './schemas/payment';

// This file is kept for backwards compatibility
// The main Payment type is now defined in src/schemas/payment.ts
export { Payment };

// Legacy interface preserved for backward compatibility
export interface PaymentMap {
  [id: string]: Payment;
} 