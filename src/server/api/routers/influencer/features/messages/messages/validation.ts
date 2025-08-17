import { z } from "@/lib/zod";

export const getMessagesSchema = z.object({
  conversationId: z.uuid(),
});

export type GetMessagesRequest = z.infer<typeof getMessagesSchema>;
