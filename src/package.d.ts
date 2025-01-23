import { DocumentReference } from "firebase-admin/firestore";
import { Country } from "./country";
import { HubbyModel } from "./hubby";
import { Partner } from "./partner";
export type Package = {
  external_id: string;
  provider: "telna" | "bondio" | string; // Example: "telna"
  label: string;
  bytes: number;
  country: DocumentReference<Country>;
  hidden: boolean;
  active: boolean;
  priority: number;
  country_data: Country | null;
  price: number;
  partner_price: number;
  days: number;
  partner: DocumentReference<Partner> | null;
  name: string;
  type: 'data-limited' | 'time-limited' | null;
} & HubbyModel
