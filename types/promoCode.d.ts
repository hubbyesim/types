import { DocumentReference } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";
import { Partner } from "./partner";
import { Country } from "./country";
import { Booking } from "./booking";
import { HubbyModel } from "./hubby";

export type HubbyPromoCode = {
  id: string;
  code: string;
  discount: number;
  allowance_total: number;
  allowance_user: number;
  package_size: string;
  partner: DocumentReference<Partner>;
  country: DocumentReference<Country>;
  valid_from: string | Date | Timestamp;
  valid_to: string | Date | Timestamp;
  booking: DocumentReference<Booking> | null;
  external_id: string;
}

export type PromoCode = HubbyPromoCode & HubbyModel;