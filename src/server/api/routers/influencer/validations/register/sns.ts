import { platformValues } from "@/const/platform";
import { z } from "@/lib/zod";

export const influencerSnsSchema = z.object({
  platform: z.enum(platformValues),
  username: z.string().min(1).max(100),
  url: z.string().url(),
  followers: z.number().int().min(0),
});

export type InfluencerSnsRequest = z.infer<typeof influencerSnsSchema>;