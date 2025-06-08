import { genreValues } from "@/const/genre";
import { workTypeValues } from "@/const/workType";
import { z } from "@/lib/zod";

export const prResultSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  content: z.string().min(1).max(1000),
  company: z.string().min(1).max(100),
  url: z.string().url(),
  year: z.number().int().min(1900).max(2100),
  month: z.number().int().min(1).max(12),
  completedAt: z
    .string()
    .min(1)
    .regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type PrResultRequest = z.infer<typeof prResultSchema>;

export const influencerWorkSchema = z.object({
  workTypes: z.array(z.enum(workTypeValues)).min(1),
  genres: z.array(z.enum(genreValues)).min(1),
  prResults: z.array(prResultSchema).max(10).optional(),
  experience: z.string().max(1000).optional(),
});

export type InfluencerWorkRequest = z.infer<typeof influencerWorkSchema>;