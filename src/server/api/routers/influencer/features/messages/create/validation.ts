import { z } from "@/lib/zod";

export const createConversationSchema = z.object({
  companyId: z.uuid(),
});

export type CreateConversationRequest = z.infer<
  typeof createConversationSchema
>;
