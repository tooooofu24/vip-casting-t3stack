import { z } from "@/lib/zod";
import { Genre, RewardType, Region, Platform } from "@/lib/prisma/generated";

export const getCampaignsSchema = z.object({
  limit: z.number().min(1).max(50).default(20),
  offset: z.number().min(0).default(0),
  genre: z.nativeEnum(Genre).optional(),
  rewardType: z.nativeEnum(RewardType).optional(),
  region: z.nativeEnum(Region).optional(),
  platform: z.nativeEnum(Platform).optional(),
  sortBy: z.enum(["createdAt", "reward", "deadline"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type GetCampaignsInput = z.infer<typeof getCampaignsSchema>;