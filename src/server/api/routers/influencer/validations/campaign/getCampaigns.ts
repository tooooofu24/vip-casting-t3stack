import { genreValues } from "@/const/genre";
import { platformValues } from "@/const/platform";
import { regionValues } from "@/const/region";
import { rewardTypeValues } from "@/const/rewardType";
import { z } from "@/lib/zod";

export const getCampaignsSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  offset: z.number().int().min(0).optional(),
  genre: z.enum(genreValues).optional(),
  rewardType: z.enum(rewardTypeValues).optional(),
  region: z.enum(regionValues).optional(),
  platform: z.enum(platformValues).optional(),
  sortBy: z.enum(["reward", "deadline", "createdAt"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type GetCampaignsRequest = z.infer<typeof getCampaignsSchema>;