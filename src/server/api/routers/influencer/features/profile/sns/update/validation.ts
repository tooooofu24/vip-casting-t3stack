import {
  influencerSnsSchema,
  type InfluencerSnsRequest,
} from "@/server/api/routers/influencer/features/auth/register/validations/sns";

export const updateSnsSchema = influencerSnsSchema;

export type UpdateSnsRequest = InfluencerSnsRequest;
