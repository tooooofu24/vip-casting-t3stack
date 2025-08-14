import {
  influencerInformationSchema,
  type InfluencerInformationRequest,
} from "@/server/api/routers/influencer/features/auth/register/validations/information";

export const updateInformationSchema = influencerInformationSchema;

export type UpdateInformationRequest = InfluencerInformationRequest;
