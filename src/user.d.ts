import { DocumentReference, Timestamp, FieldValue } from "firebase-admin/firestore";
import { HubbyModel } from "./hubby";

export type User = {
    stripe_id: string | null; // Provided by Stripe to perform purchases using Stripe SDK
    partner: DocumentReference | null; // Reference to a Partner document
    referral: string | null; // Generated characters used as a referral code
    fcm: string; // Push notification token from Firebase
    deeplink: string | null; // Link generated using the referral code


    name: string | null;
    email: string | null; // User's email address
    gender: string | null; // M | F
    company: string | null; // Constant value: "hubby"

    coordinates: string | null; // Latitude and longitude separated by a comma

    parameters: any | null;

    locale: string | null; // Current language of the user, e.g., "en", "de"
    phone_model: string | null; // Describes the model of the user's phone
    phone_os: string | null; // Values: "ios" or "android"
    phone_os_version: string | null; // Used to investigate or validate issues with eSIM activation
    
    balance: number | null | FieldValue; // Virtual money that can be used to purchase or top up an eSIM

    ios: boolean | null; // Flag to determine if the user uses an iPhone    
    has_card_saved: boolean | null; // Flag when a card has been saved to the Flutter Stripe SDK
    admin: boolean | null; // Flag to determine if the user is an admin
    api_keys: ApiKeys | null;
    review_requested: Timestamp | null; // Date the last app update review popup was presented
    last_seen: Date | null; // Updated when the user opens the app and is logged in
} & HubbyModel;

type ApiKeys = {
    allowed_keys: string[];
    keys: Record<string, ApiKey>;
}

type ApiKey = {
    expires_at: Timestamp;
    secret: string;
    is_active: boolean;
}