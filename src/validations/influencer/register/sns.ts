import { z } from "@/lib/zod";

export const influencerSnsSchema = z.object({
  instagramName: z.string().max(255).optional(),
  instagramFollowers: z
    .number()
    .min(0)
    .max(1000 * 1000 * 1000)
    .optional(),
  youtubeName: z.string().max(255).optional(),
  youtubeFollowers: z
    .number()
    .min(0)
    .max(1000 * 1000 * 1000)
    .optional(),
  tiktokName: z.string().max(255).optional(),
  tiktokFollowers: z
    .number()
    .min(0)
    .max(1000 * 1000 * 1000)
    .optional(),
  xName: z.string().max(255).optional(),
  xFollowers: z
    .number()
    .min(0)
    .max(1000 * 1000 * 1000)
    .optional(),
});

export type InfluencerSnsRequest = z.infer<typeof influencerSnsSchema>;

export const influencerSnsDefaultValues: InfluencerSnsRequest = {
  instagramName: "vip_caster_instagram",
  instagramFollowers: 12345,
  youtubeName: "VIP Caster Channel",
  youtubeFollowers: 6789,
  tiktokName: "vip_caster_tiktok",
  tiktokFollowers: 1000,
  xName: "vip_caster_x",
  xFollowers: 1000,
};
