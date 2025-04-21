import { FirebaseFirestore } from '@firebase/firestore-types';
import { HubbyModel } from './hubby';
import { ESIM } from './schemas/esim';

// This file is kept for backwards compatibility
// The main ESIM type is now defined in src/schemas/esim.ts
export { ESIM };

// Legacy type definition preserved for backward compatibility
export interface ESIMMap {
  [id: string]: ESIM;
}

// Legacy interfaces preserved for backward compatibility  
export interface GetESIMsOptions {
  userId?: string;
  countryId?: string;
  partnerId?: string;
  limit?: number;
}

export interface GetESIMsByUserIdOptions {
  limit?: number;
}

export interface GetESIMsByCountryIdOptions {
  limit?: number;
}

export interface ESIMSortOptions {
  by: string;
  direction: FirebaseFirestore.OrderByDirection;
}
