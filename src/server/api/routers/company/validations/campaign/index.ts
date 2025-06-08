import {
  type CreateCampaignRequest,
  type createCampaignSchema,
} from "@/server/api/routers/company/validations/campaign/createCampaign";
import {
  type UpdateCampaignRequest,
  type updateCampaignSchema,
} from "@/server/api/routers/company/validations/campaign/updateCampaign";

export type CampaignFormData = CreateCampaignRequest | UpdateCampaignRequest;
export type CampaignFormSchema =
  | typeof createCampaignSchema
  | typeof updateCampaignSchema;
