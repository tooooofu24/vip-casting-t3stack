import { z } from "@/lib/zod";

export const createConversationSchema = z.object({
  companyId: z.uuid(),
  content: z.string().min(1).max(2000),
});

export type CreateConversationRequest = z.infer<
  typeof createConversationSchema
>;
