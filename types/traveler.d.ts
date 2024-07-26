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
  dateOfBirth?: string;
  user: string; //Should be reference
  esims: Array<string>; //should be array of reference
  data: {
    source: string;
    manual: boolean;
  };
};