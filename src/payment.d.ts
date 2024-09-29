export type Payment = {
    amount: number; // Example: 550
    customer: string; // Example: "cus_Nfqam9ayR0IN6b"
    date: Date; // Example: June 15, 2023 at 3:31:22 PM UTC+2
    iccid: string; // Example: "8910300000006131853"
    package: string; // Example: "409835"
    promo: string; // Example: "" (can be an empty string)
    topup: boolean; // Example: true
  };
  