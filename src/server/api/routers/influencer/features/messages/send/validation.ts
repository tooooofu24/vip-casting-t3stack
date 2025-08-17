import { z } from "@/lib/zod";

export const sendMessageSchema = z.object({
  conversationId: z.uuid(),
  content: z.string().min(1).max(2000),
});

export type SendMessageRequest = z.infer<typeof sendMessageSchema>;
