import { DocumentReference } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";
import { User } from "./user";
import { Package } from "./package";
import { Partner } from "./partner";
import { Country } from "./country";
import { Promo_Code } from "./promo_code";
import { SentMessages } from "./message";
import { HubbyModel } from "./hubby";

type HubbyBooking = {
  id: string;
  title: string | null;
  first_name: string;
  last_name: string;
  full_name: string;
  pax: number;
  email: string | null;
  phone: string | null;
  booking_id: string | null;
  return_date: Timestamp | null;
  partner: DocumentReference<Partner>;
  promo_codes: Array<DocumentReference<Promo_Code>>;
  departure_date: Timestamp;
  flight_number?: string;
  gender?: 'M' | 'F' | 'O';
  package_size?: string; //only used for manual api calls to determine package size
  sent_messages?: SentMessages;
  user:  DocumentReference<User> | null; //Should be reference
  esims: Array<DocumentReference> | null; //should be array of reference
  locale: string;
  data: {
    source: string;
    manual: boolean;
  };
  // communication_options: CommunicationOptions;
};


//Left it out of booking as unsure if it is needed
type CommunicationOptions = {
  should_message: boolean;
  should_email: boolean;
  should_whatsapp: boolean;
  should_push: boolean;
  should_sms: boolean;
};

export type Booking = HubbyBooking & HubbyModel;