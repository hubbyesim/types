import { DocumentReference } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";
import { Partner } from "./partner";
import { Country } from "./country";
import { Booking } from "./booking";
import { HubbyModel } from "./hubby";
import { Package } from "./package";

export type HubbyPromoCode = {
  code: string;
  discount: number;
  allowance_total: number;
  allowance_user: number;
  package_size: string;
  package: DocumentReference<Package>;
  partner: DocumentReference<Partner>;
  country: DocumentReference<Country>;
  valid_from: string | Date | Timestamp;
  valid_to: string | Date | Timestamp;
  booking: DocumentReference<Booking> | null;
  external_id: string;
  type?: string;
  countries?: string[]; 
  max_bytes?: number; 
  usage?: string[], 
  uuid_usage?: string[], 
  starter_data?: number
}

export type PromoCode = HubbyPromoCode & HubbyModel;