import { DocumentReference } from "firebase-admin/firestore";
import { Country } from "./country";
import { HubbyModel } from "./hubby";
import { Partner } from "./partner";

export type Package = {
  label: string;
  bytes: number;
  size_in_gb: number;
  country: DocumentReference<Country>; //Hrvatska
  hidden: boolean;
  price: number;
  partner_price: number;
  days: number;
  price_modifications: PriceModifications;
} & HubbyModel

type PriceModifications = [PriceModification]

type PriceModification = {
  partner: DocumentReference<Partner>; //Hubby
  fixed_price: number | null;
  fixed_percentage: number | null;
  price_type: 'fixed' | 'percentage';
}