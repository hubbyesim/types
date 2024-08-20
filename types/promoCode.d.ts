export type PromoCode = {
  allowance_total: number | null; // Total users that can use the promo code
  allowance_user: number | null; // Total number of times a user can reuse the promo code
  country: string | null; // Reference to a Country document
  external_id: string | null; // External identifier for the promo codes, comes from the client side
  package: string | null; // Reference to a Package document
  partner: string | null; // Reference to a Partner document
  usage: string[] | null; // Array of user IDs that used the promo code
  valid_from: Date | null; // Date when the promo code becomes valid
  valid_to: Date | null; // Date when the promo code expires
  updated_at: Date | null; // Date when the promo code was last updated
};
