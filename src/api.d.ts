import { HubbyBooking } from "./booking";

export type PackageSpecifications = Array<PackageSpecification>;

export type PackageSpecification = {
  destination?: string;
  size?: string;
  package_id?: string;
};

type BookingApiResponse = Omit<
  HubbyBooking,
  | "return_date"
  | "partner"
  | "promo_codes"
  | "departure_date"
  | "user"
  | "esims"
  | "created_at"
  | "updated_at"
  | "package_specifications"
> & {
  return_date: string | null; // ISO string
  partner: string; // DocumentReference id
  promo_codes: PromoCodeResponse[]; // Array of DocumentReference ids
  departure_date: string; // ISO string
  users: Array<string>; // DocumentReference id or null
  esims: string[] | null; // Array of DocumentReference ids or null
  created_at: string; // ISO string
  updated_at: string; // ISO string
};

type PromoCodeApiResponse = {
  promo_code: string;
  package_id: string;
  package_size: string;
  destination: string;
};

export type BookingApiRequest = Omit<
  HubbyBooking,
  | "return_date"
  | "partner"
  | "promo_codes"
  | "departure_date"
  | "user"
  | "esims"
  | "created_at"
  | "updated_at"
> & {
  departure_date: Timestamp; // ISO 8601 date string
  email?: string | null; // Optional email
  phone?: string | null; // Optional phone number in E.164 format
  first_name?: string | null; // Optional first name
  last_name?: string | null; // Optional last name
  full_name?: string | null; // Optional full name
  title?: string | null; // Optional title, case-insensitive in validation
  pax?: number | null; // Optional number of passengers, must be an integer >= 1
  return_date: Timestamp | null; // ISO 8601 date string, must be after departure_date
  flight_number?: string | null; // Optional alphanumeric string for flight number
  gender?: "M" | "F" | "O"; // Optional gender
  date_of_birth?: Timestamp; // Optional ISO 8601 date string, must be before the current date
  locale?: string; // Optional locale string (2 to 5 characters)
  booking_id?: string | null; // Optional booking ID, minimum 3 characters
  communication_options: CommunicationOptions; // Required object for communication options
  package_specifications?: PackageSpecifications; // Array of package specifications, at least one entry is required
  created_by: string;
  updated_by: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};