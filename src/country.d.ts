export type Country = {
    id: string | null,
    bokun_id: number | null,
    lte: boolean | null; // Indicates if LTE is enabled
    apn: string | null; // Access Point Name, e.g., "globaldata"
    click_count: number | null; // Number of times the network was clicked
    global_network: string | null; // Name of the global network, e.g., "SETAR GSM"
    global_price: number | null; // Global price associated with the network
    hubby: number | null; // An associated value, possibly a constant or identifier
    imsi: number | null; // International Mobile Subscriber Identity
    name: string | null; // Name of the country
    tier: number | null; // Indicates the tier level, e.g., 2
  };
  