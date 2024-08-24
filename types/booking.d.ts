import { DocumentReference } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";
import { User } from "./user";
import { Package } from "./package";
import { Partner } from "./partner";
import { Country } from "./country";
import { Promo_Code } from "./promo_code";
import { SentMessages } from "./message";

export type Booking = {
  id: string;
  title?: string;
  first_name: string;
  last_name: string;
  pax: number;
  email?: string;
  booking_id?: string;
  return_date?: Timestamp;
  package?: Array<DocumentReference<Package>>;
  partner?: DocumentReference<Partner>;
  promo_code?: Array<DocumentReference<Promo_Code>>;
  departure_date?: Timestamp;
  country: DocumentReference<Country>;
  flight_number?: string;
  gender?: 'M' | 'F' | 'O';
  package_size?: string; //only used for manual api calls to determine package size
  sent_messages?: SentMessages;
  user?:  DocumentReference<User>; //Should be reference
  esims: Array<DocumentReference> | undefined; //should be array of reference
  data: {
    source: string;
    manual: boolean;
  };
  locale: string;
};
