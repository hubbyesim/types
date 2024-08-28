import { Timestamp } from "firebase-admin/firestore";

export type Message = {
    id: string;
    key: string;
    method: "sms" | "email" | "push";
    status: "pending" | "sent" | "failed" | "delivered";
    created_at: Timestamp
    updated_at: Timestamp
  };
  
  export type SentMessages = {
    [key: string]: Message;
  };
  