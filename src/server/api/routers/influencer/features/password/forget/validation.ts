import { z } from "@/lib/zod";

export const influencerForgetPasswordSchema = z.object({
  email: z.string().min(1).email(),
});

export type InfluencerForgetPasswordRequest = z.infer<
  typeof influencerForgetPasswordSchema
>;
