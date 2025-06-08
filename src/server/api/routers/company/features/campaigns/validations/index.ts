import {
  type CreateCampaignRequest,
  type createCampaignSchema,
} from "@/server/api/routers/company/features/campaigns/validations/createCampaign";
import {
  type UpdateCampaignRequest,
  type updateCampaignSchema,
} from "@/server/api/routers/company/features/campaigns/validations/updateCampaign";

export type CampaignFormData = CreateCampaignRequest | UpdateCampaignRequest;
export type CampaignFormSchema =
  | typeof createCampaignSchema
  | typeof updateCampaignSchema;
