import { DocumentReference } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";
import { Partner } from "./partner";
import { Country } from "./country";
import { Booking } from "./booking";
import { HubbyModel } from "./hubby";
import { Package } from "./package";

export type HubbyPromoCode = {
  external_id: string;
  code: string;
  allowance_user: number;
  allowance_total: number;
  type: 'full-discount' | 'partial-discount' | 'booking' | 'traveler' | null | string;
  usage: string[],
  uuid_usage: string[],

  //Optional fields based on the type
  discount?: number;
  package_size?: string;
  package?: DocumentReference<Package>;
  partner?: DocumentReference<Partner>;
  country?: DocumentReference<Country>;
  valid_from?: string | Date | Timestamp;
  valid_to?: string | Date | Timestamp;
  booking?: DocumentReference<Booking> | null;
  countries?: string[];
  max_bytes?: number;
  starter_data?: number
}

export type PromoCode = HubbyPromoCode & HubbyModel;