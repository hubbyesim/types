import { DocumentReference } from "firebase-admin/firestore";
import { Country } from "./country";
import { HubbyModel } from "./hubby";
import { Partner } from "./partner";
export type Package = {
  external_id: string;
  provider: "telna" | "bondio" | string; // Example: "telna"
  coverage_label: null | string;
  label: string;
  bytes: number;
  country: DocumentReference<Country>;
  hidden: boolean;
  is_hidden: boolean;
  is_active: boolean;
  priority: number;
  country_data: Country | null;
  price: number;
  partner_price: number;
  days: number;
  partner: DocumentReference<Partner> | null;
  name: string;
  type: 'data-limited' | 'time-limited' | null;
  throttling?: number;
  provider_parameters: null | {
    imsi: number;
  }
} & HubbyModel
