import { DocumentReference } from "firebase-admin/firestore";
import { Country } from "./country";
import { HubbyModel } from "./hubby";

export type Package = {
  id: string;
  label: string;
  bytes: number;
  country: DocumentReference<Country>;
  hidden: boolean;
  price: number;
  partner_price: number;
  days: number;
} & HubbyModel
