import { DocumentReference } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";
import { User } from "./user";
import { Package } from "./package";
import { Partner } from "./partner";

export type Message = {
  id: string;
  key: string;
  method: 'sms' | 'email' | 'push';
  status: 'pending' | 'sent' | 'failed' | 'delivered';
}

export type SentMessages = {
  [key: string]: Message;
}

export type Traveler = {
  id: string;
  firstName: string;
  lastName: string;
  pax: number;
  email?: string;
  bookingId?: string,
  returnDate?: string | Date | Timestamp;
  package?: DocumentReference<Package>;
  partner?: DocumentReference<Partner>;
  departureDate?: string | Date | Timestamp;
  country: string | DocumentReference;
  packageId: string;
  partnerId: string,
  title?: string;
  flightNumber?: string;
  gender?: string;
  promo?: string;
  packageStrategy?: string; // Deprecated?
  packageSize?: string; //only used for manual api calls to determine package size
  sentMessages?: SentMessages;
  dateOfBirth?: string;
  user: string | undefined | User | DocumentReference<User>; //Should be reference
  esims: Array<DocumentReference> | undefined; //should be array of reference
  data: {
    source: string;
    manual: boolean;
  };
  language?: string;
  arrivalDate: string | Date | Timestamp; //Whoops typo should deprecate
  sendMessages?: SentMessages;  //Whoops typo should deprecate
  is_rocessed_for_esim_restoration: boolean; // flags true if the traveler is processed for esim restoration
};