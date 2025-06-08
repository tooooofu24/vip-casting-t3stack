import { z } from "@/lib/zod";

export const getCompaniesSchema = z.object({
  isApproved: z.boolean().optional(),
});

export type GetCompaniesRequest = z.infer<typeof getCompaniesSchema>;
