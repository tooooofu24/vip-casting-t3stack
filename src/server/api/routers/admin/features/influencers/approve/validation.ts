import { z } from "@/lib/zod";

export const approveInfluencerSchema = z.object({
  influencerId: z.string().min(1),
});

export type ApproveInfluencerRequest = z.infer<typeof approveInfluencerSchema>;
