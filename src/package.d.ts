import { DocumentReference } from "firebase-admin/firestore";
import { Country } from "./country";
import { HubbyModel } from "./hubby";
import { PriceModificationsPerPartner } from "./priceModifications";

export type Package = {
  label: string;
  bytes: number;
  size_in_gb: number;
  country: DocumentReference<Country>; //Hrvatska
  hidden: boolean;
  purchase_price: number;
  // partner_price: number;
  provider: string;
  days: number;
  in_app_prices_per_partners: PriceModificationsPerPartner;
  contract_prices_per_partners: PriceModificationsPerPartner;
} & HubbyModel