import { DocumentReference } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";
import { User } from "./user";
import { Partner } from "./partner";
import { PromoCode } from "./promoCode";
import { SentMessages } from "./message";
import { HubbyModel } from "./hubby";

type HubbyBooking = {
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
  promo_codes: Array<DocumentReference<PromoCode>>;
  departure_date: Timestamp;
  flight_number?: string;
  gender?: "M" | "F" | "O";
  package_size?: string; //only used for manual api calls to determine package size
  sent_messages?: SentMessages;
  users: Array<DocumentReference<User>> | null; //Should be reference
  esims: Array<DocumentReference> | null; //should be array of reference
  locale: string;
  data: {
    source: string;
    manual: boolean;
  };
  communication_options: CommunicationOptions;
};

export enum CommunicationChannel {
  EMAIL = "email",
  WHATSAPP = "whatsapp",
  PUSH_NOTIFICATION = "push_notification",
  SMS = "sms",
}

type CommunicationOptions = {
  should_send_message: boolean; // Indicates whether to send any message at all
  channels: CommunicationChannel[]; // List of channels to send the message across
};

export type Booking = HubbyBooking & HubbyModel;
