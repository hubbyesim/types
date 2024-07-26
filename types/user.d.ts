import { Timestamp } from "firebase-admin/firestore";
import { Partner } from "./partner";

export type User = {
    name: string;
    fcm: string;
    gender: string; // M | F
    locale: string; // en | fr | es | pt
    referral: string;
    stripe_id: string;
    ios: boolean;
    has_card_saved: boolean;
    deeplink: string;
    company: string;
    balance: number;
    admin: boolean;
    parnter: string | Partner | undefined;
    email: string;
    parameters: any;
    review_requested: Timestamp
}   