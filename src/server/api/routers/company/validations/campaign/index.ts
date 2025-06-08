// 基本型の re-export
export type { CreateCampaignRequest } from "./createCampaign";
export type { UpdateCampaignRequest } from "./updateCampaign";

// スキーマの re-export
export {
  createCampaignSchema,
  createCampaignDefaultValues,
} from "./createCampaign";
export { updateCampaignSchema } from "./updateCampaign";

// CampaignFormで使用する共通型の定義
import type { CreateCampaignRequest } from "./createCampaign";
import type { UpdateCampaignRequest } from "./updateCampaign";
import { type createCampaignSchema } from "./createCampaign";
import { type updateCampaignSchema } from "./updateCampaign";

export type CampaignFormData = CreateCampaignRequest | UpdateCampaignRequest;
export type CampaignFormSchema =
  | typeof createCampaignSchema
  | typeof updateCampaignSchema;
