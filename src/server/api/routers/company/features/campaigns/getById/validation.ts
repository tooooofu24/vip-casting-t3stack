import { z } from "@/lib/zod";

export const getCampaignByIdSchema = z.object({
  id: z.string().uuid(),
});
