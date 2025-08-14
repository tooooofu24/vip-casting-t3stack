import {
  influencerAddressSchema,
  type InfluencerAddressRequest,
} from "@/server/api/routers/influencer/features/auth/register/validations/address";

export { influencerAddressSchema };
export type { InfluencerAddressRequest };

export const updateAddressSchema = influencerAddressSchema;

export type UpdateAddressRequest = InfluencerAddressRequest;
