import {
  influencerWorkSchema,
  type InfluencerWorkRequest,
} from "@/server/api/routers/influencer/features/auth/register/validations/work";

export const updateWorkSchema = influencerWorkSchema;

export type UpdateWorkRequest = InfluencerWorkRequest;
