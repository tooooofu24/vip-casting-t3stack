// ===== Main Factories =====
// These are the primary factories for creating complete entities
export { companyFactory } from "./company";
export { influencerFactory } from "./influencer";
export { campaignFactory } from "./campaign";
export { userFactory } from "./user";

// ===== Company Sub-Factories =====
// Fine-grained factories for individual company-related tables
export {
  companyInformationFactory,
  companyAddressFactory,
  companyBusinessFactory,
  companyPaymentFactory,
} from "./company";

// ===== Influencer Sub-Factories =====
// Fine-grained factories for individual influencer-related tables
export {
  influencerInformationFactory,
  influencerAddressFactory,
  influencerSnsFactory,
  influencerWorkFactory,
} from "./influencer";

// ===== Convenience Re-exports =====
// Re-export all from sub-modules for maximum flexibility
export * from "./company";
export * from "./influencer";
export * from "./campaign";
export * from "./user";
