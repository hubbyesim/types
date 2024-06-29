export type Traveler = {
    package: string,
    arrivalDate: string;
    country: string;
    packageId: string;
    firstName: string;
    lastName: string;
    partnerId: string,
    title?: string;
    pax: number;
    email: string;
    bookingId: string,
    returnDate: string;
    flightNumber?: string;
    gender?: string;
    dateOfBirth?: string;
    data: {
      source: string;
      manual: boolean;
    };
  };