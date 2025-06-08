import { z } from "@/lib/zod";
import { createCampaignSchema } from "@/validations/company/campaign/createCampaign";

export const updateCampaignSchema = createCampaignSchema.extend({
  id: z.string().uuid(),
});

export type UpdateCampaignRequest = z.infer<typeof updateCampaignSchema>;
