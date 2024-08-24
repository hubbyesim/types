import { DocumentReference } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";
import { Partner } from "./partner";
import { Country } from "./country";

export type Promo_Code = {
  id: string;
  code: string;
  discount: number;
  allowance_total: number;
  allowance_user: number
  partner: DocumentReference<Partner>;
  country: DocumentReference<Country>;
  valid_from: string | Date | Timestamp;
  valid_to: string | Date | Timestamp;
  created_at: string | Date | Timestamp;
  updated_at: string | Date | Timestamp;
  created_by: string;
  updated_by: string;
}