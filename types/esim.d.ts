import { Partner } from "./partner";


export type ESIM = {
  id: string | null; // ICCID from telna
  country: string | null; // DocumentReference<Country>, Default: null
  imsi: number | null; // Optional IMSI
  qr: string | null; 
  user: string | null; // Should be a Document reference to user, Default: null
  provider: string | null; // Tracks where the eSIM comes from, e.g., 'telna'
  total_data: number | null; // Total data of the package purchased/given
  data_left: number | null; // Data left based on the package purchased/given
  data_used: boolean | null; // eSIM Data consumption
  time_assigned: Date | null; // DateTime? when the package is loaded and distributed
  last_updated: Date | null; // DateTime? updated when the eSIM is primary/active
  status: string | null; // Updated when the eSIM is active/primary
  name: string | null; // Based on country name and count, e.g., "TUR eSIM #1"
//  auto: string | null; // Contains the package id if auto top-up is enabled, Deprecated
  android_auto: boolean | null; // Flag for auto install on Android
  partner: string | Partner | null; // DocumentReference<Partner>, based on user
  partner_price: number | null; // Partner price used to distribute eSIM
  promo: string | null; // Promo code used when distributing the eSIM
  type: string | null; // Describes where the user got their eSIM
  payment: string | null; // DocumentReference to payment collection, Payment ID from Stripe or ApplePay
  is_auto_install: boolean | null; // Flag for auto-install priority on Android
  is_archived: boolean | null; // Flag that eSIM should not be shown in the dashboard
  apn: string | null; // Describes global data of an eSIM, Value: "globaldata"
};
