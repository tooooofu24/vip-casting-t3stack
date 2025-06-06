import { z } from "@/lib/zod";
import type { Genre, RewardType, Region, Platform } from "@/lib/prisma/generated";

export const getCampaignsSchema = z.object({
  limit: z.number().min(1).max(50).default(20),
  offset: z.number().min(0).default(0),
  genre: z.nativeEnum({
    BEAUTY: "BEAUTY",
    FASHION: "FASHION",
    FOOD: "FOOD",
    TECH: "TECH",
    LIFESTYLE: "LIFESTYLE",
    TRAVEL: "TRAVEL",
    FITNESS: "FITNESS",
    ENTERTAINMENT: "ENTERTAINMENT",
  } as const).optional(),
  rewardType: z.nativeEnum({
    FIXED: "FIXED",
    FOLLOWER: "FOLLOWER",
  } as const).optional(),
  region: z.nativeEnum({
    ALL: "ALL",
    KANTO: "KANTO",
    KANSAI: "KANSAI",
    TOKAI: "TOKAI",
    HOKKAIDO: "HOKKAIDO",
    TOHOKU: "TOHOKU",
    CHUGOKU: "CHUGOKU",
    SHIKOKU: "SHIKOKU",
    KYUSHU: "KYUSHU",
    ONLINE: "ONLINE",
  } as const).optional(),
  platform: z.nativeEnum({
    INSTAGRAM: "INSTAGRAM",
    YOUTUBE: "YOUTUBE",
    TIKTOK: "TIKTOK",
    X: "X",
    FACEBOOK: "FACEBOOK",
    OTHER: "OTHER",
  } as const).optional(),
  sortBy: z.enum(["createdAt", "reward", "deadline"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type GetCampaignsInput = z.infer<typeof getCampaignsSchema>;