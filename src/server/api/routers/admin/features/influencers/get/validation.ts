import { z } from "@/lib/zod";

export const getInfluencersSchema = z.object({
  isApproved: z.boolean().optional(),
});

export type GetInfluencersRequest = z.infer<typeof getInfluencersSchema>;
