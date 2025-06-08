import { z } from "@/lib/zod";
import { createCampaignSchema } from "@/server/api/routers/company/validations/campaign/createCampaign";

export const updateCampaignSchema = createCampaignSchema.extend({
  id: z.string().uuid(),
});

export type UpdateCampaignRequest = z.infer<typeof updateCampaignSchema>;
