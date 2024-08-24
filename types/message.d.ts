export type Message = {
    id: string;
    key: string;
    method: "sms" | "email" | "push";
    status: "pending" | "sent" | "failed" | "delivered";
  };
  
  export type SentMessages = {
    [key: string]: Message;
  };
  