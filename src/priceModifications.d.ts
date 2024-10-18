import { DocumentReference } from "firebase-admin/firestore";
import { Partner } from "./partner";


export type PriceModificationsPerPartner = [PriceModificationPerPartner]

export type PriceModificationPerPartner = {
  partner: DocumentReference<Partner>; //Hubby
  fixed_price: number | null;
  percentage: number | null;
  price_type: 'fixed' | 'percentage' | 'addition';
}

export type PriceModificationsPerBundle = [PriceModificationPerBundle]

export type PriceModificationPerBundle = {
  bundle: "1GB" | "2GB" | "3GB"
  fixed_price: number | null;
  percentage: number | null;
  price_type: 'fixed' | 'percentage' | 'addition';
}