import { z } from "@/lib/zod";

export const getCampaignsSchema = z
  .object({
    status: z
      .enum(["DRAFT", "RECRUITING", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
      .optional(),
    page: z.number().min(1).default(1),
    perPage: z.number().min(1).max(100).default(20),
  })
  .optional();
