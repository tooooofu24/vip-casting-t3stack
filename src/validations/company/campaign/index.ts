// 基本型の re-export
export type { CreateCampaignRequest } from "@/validations/company/campaign/createCampaign";
export type { UpdateCampaignRequest } from "@/validations/company/campaign/updateCampaign";

// スキーマの re-export
export {
  createCampaignSchema,
  createCampaignDefaultValues,
} from "@/validations/company/campaign/createCampaign";
export { updateCampaignSchema } from "@/validations/company/campaign/updateCampaign";

// CampaignFormで使用する共通型の定義
import type { CreateCampaignRequest } from "@/validations/company/campaign/createCampaign";
import type { UpdateCampaignRequest } from "@/validations/company/campaign/updateCampaign";
import { type createCampaignSchema } from "@/validations/company/campaign/createCampaign";
import { type updateCampaignSchema } from "@/validations/company/campaign/updateCampaign";

export type CampaignFormData = CreateCampaignRequest | UpdateCampaignRequest;
export type CampaignFormSchema =
  | typeof createCampaignSchema
  | typeof updateCampaignSchema;
