import { z } from "@/lib/zod";

export const applyCampaignSchema = z.object({
  campaignId: z.uuid(),
  message: z.string().optional(),
});

export type ApplyCampaignRequest = z.infer<typeof applyCampaignSchema>;
