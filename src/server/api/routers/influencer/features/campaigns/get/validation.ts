import { z } from "@/lib/zod";

export const getCampaignsSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).optional().default(0),
});

export type GetCampaignsRequest = z.infer<typeof getCampaignsSchema>;
