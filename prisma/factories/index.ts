// ===== Main Factories =====
// These are the primary factories for creating complete entities
export { adminFactory } from "./admin";
export { campaignFactory } from "./campaign";
export { companyFactory } from "./company";
export { influencerFactory } from "./influencer";
export { userFactory } from "./user";

// ===== Supabase Factories =====
// Factories for Supabase Auth users
export { clearAllAuthUsers, createSupabaseUser } from "./supabase";

// ===== Company Sub-Factories =====
// Fine-grained factories for individual company-related tables
export {
  companyAddressFactory,
  companyBusinessFactory,
  companyInformationFactory,
  companyPaymentFactory,
} from "./company";

// ===== Influencer Sub-Factories =====
// Fine-grained factories for individual influencer-related tables
export {
  influencerAddressFactory,
  influencerInformationFactory,
  influencerSnsFactory,
  influencerWorkFactory,
} from "./influencer";

// ===== Convenience Re-exports =====
// Re-export all from sub-modules for maximum flexibility
export * from "./admin";
export * from "./campaign";
export * from "./company";
export * from "./influencer";
export * from "./user";
