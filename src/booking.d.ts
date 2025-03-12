import { DocumentReference } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";
import { User } from "./user";
import { Partner } from "./partner";
import { PromoCode } from "./promoCode";
import { SentMessages } from "./message";
import { HubbyModel, SupportedLocales } from "./hubby";
import { PackageSpecifications } from "./api";

//Status explanation
//PENDING: Booking is pending and waiting for payment
//CONFIRMED: Booking is confirmed and payment is successful
//COMPLETED: Booking is completed and payment is successful
//CANCELLED: Booking is cancelled and payment is not successful
//EXPIRED: Booking is expired and payment is not successful
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'unpaid' | 'expired';

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
  locale: SupportedLocales;
  status: BookingStatus;
  data: {
    source: string;
    manual: boolean;
  };
  communication_options: CommunicationOptions;
  is_processed_for_esim_restoration: boolean; // flags true if the traveler is processed for esim restoration
  is_pseudonymized: boolean; // flags true if the traveler is pseudonymized
  import_id?: string | null,
  package_specifications?: PackageSpecifications,
};

export const enum CommunicationChannel {
  EMAIL = "EMAIL",
  WHATSAPP = "WHATSAPP",
  PUSH_NOTIFICATION = "PUSH_NOTIFICATION",
  SMS = "SMS",
}

export type CommunicationOptions = {
  should_send_message: boolean; // Indicates whether to send any message at all
  channels: CommunicationChannel[]; // List of channels to send the message across
};

export type Booking = HubbyBooking & HubbyModel;