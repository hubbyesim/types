import { Country } from "./country";

export type Package = {
  id: string;
  label: string;
  bytes: number;
  country: string | Country | undefined | null;
  hidden: boolean;
  price: number;
  partner_price: number;
  days: number;
};