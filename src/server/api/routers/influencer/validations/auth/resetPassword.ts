import { z } from "@/lib/zod";

export const influencerResetPasswordSchema = z.object({
  newPassword: z.string().min(8),
});

export type InfluencerResetPasswordRequest = z.infer<
  typeof influencerResetPasswordSchema
>;
