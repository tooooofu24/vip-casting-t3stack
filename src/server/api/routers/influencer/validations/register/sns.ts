import { z } from "@/lib/zod";
import type { DefaultValues } from "react-hook-form";

export const influencerSnsSchema = z.object({
  instagramName: z.string().max(255).optional().nullable(),
  instagramFollowers: z.number().int().min(0).optional().nullable(),
  youtubeName: z.string().max(255).optional().nullable(),
  youtubeFollowers: z.number().int().min(0).optional().nullable(),
  tiktokName: z.string().max(255).optional().nullable(),
  tiktokFollowers: z.number().int().min(0).optional().nullable(),
  xName: z.string().max(255).optional().nullable(),
  xFollowers: z.number().int().min(0).optional().nullable(),
});

export type InfluencerSnsRequest = z.infer<typeof influencerSnsSchema>;

export const influencerSnsDefaultValues: DefaultValues<InfluencerSnsRequest> = {
  instagramName: "beauty_japan_official",
  instagramFollowers: 128000,
  youtubeName: "ビューティーチャンネル",
  youtubeFollowers: 54000,
  tiktokName: "@beauty_japan",
  tiktokFollowers: 210000,
  xName: "@beauty_japan_x",
  xFollowers: 35000,
};
