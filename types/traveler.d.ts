export type Traveler = {
  id: string;
  firstName: string;
  lastName: string;
  pax: number;
  email?: string;
  bookingId?: string,
  returnDate?: string;
  package: string,
  arrivalDate: string;
  country: string;
  packageId: string;
  partnerId: string,
  title?: string;
  flightNumber?: string;
  gender?: string;
  packageStrategy?: string;
  dateOfBirth?: string;
  data: {
    source: string;
    manual: boolean;
  };
};