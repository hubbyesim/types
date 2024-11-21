import { HubbyModel } from "./hubby";

export type Currency = {
  base_code: string,
  coversion_rates: CoversionRate
} & HubbyModel;
  
type CoversionRate = {
  currency: number
}