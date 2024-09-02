import { DocumentReference } from "firebase-admin/firestore";
import { User } from './user';
import { Country } from './country';
import { Partner } from './partner';
import { Timestamp } from 'firebase-admin/firestore';
import { Payment } from './payment';
import { HubbyModel } from "./hubby";

export type Esim = {
    country: DocumentReference<Country> | null; // Default: null
    imsi: number;
    qr: string;
    user: DocumentReference<User> | null; // Default: null, should be a DocumentReference to user
    provider: string; // Example: "telna"
  
    // Loosely Defined Properties
    total_data?: number; // Total data of the package purchased/given
    data_left?: number; // Data left based on the package purchased/given
    data_used?: boolean; // eSIM Data consumption
    time_assigned?: Timestamp; // Added when a package is loaded and distributed to a user
    last_updated?: Timestamp; // Updated every time user opens the app if the eSIM is primary/active in the app’s dashboard
    status: string | null; // Updated every time user opens the app and the eSIM is active/primary in the app’s dashboard
    name: string; // Based on country name and count example: “TUR eSIM #1”
    android_auto: boolean; // Flag for Android auto install
    partner?: DocumentReference<Partner>; // Partner Reference based on user
    partner_price?: number; // Partner price of the partner used to distribute eSIM
    promo?: string; // Promo code used
    type: 'api' | 'promo' | 'balance' | 'code' | 'external' | 'payment'; // Describes where the user got their eSIM
    payment: DocumentReference<Payment>; // Payment ID from Stripe or ApplePay
    is_auto_install: boolean; // Flag on eSIM which should be prioritized on Android devices
    is_archived: boolean; // Flag that eSIM should not be shown in dashboard
    apn?: string; // Describes global data of an eSIM
  } & HubbyModel;
  
