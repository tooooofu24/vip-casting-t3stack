import { z } from "@/lib/zod";
export const approveInfluencerSchema = z.object({
  influencerId: z.string().min(1),
});
