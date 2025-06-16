import { z } from "@/lib/zod";

export const applyCampaignSchema = z.object({
  campaignId: z.string().min(1).uuid(),
  message: z.string().optional(),
});

export type ApplyCampaignRequest = z.infer<typeof applyCampaignSchema>;
