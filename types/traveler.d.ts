import { User } from "./user";

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
  returnDate?: string;
  package: string,
  departureDate?: Date;
  arrivalDate: string;
  country: string;
  packageId: string;
  partnerId: string,
  title?: string;
  flightNumber?: string;
  gender?: string;
  packageStrategy?: string;
  sendMessages?: SentMessages;  //Whoops typo
  sentMessages?: SentMessages;
  dateOfBirth?: string;
  user: string | undefined | User; //Should be reference
  esims: Array<string> | undefined; //should be array of reference
  data: {
    source: string;
    manual: boolean;
  };
};