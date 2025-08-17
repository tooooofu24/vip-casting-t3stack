import { createTRPCRouter } from "@/server/api/trpc";
import { getConversations } from "@/server/api/routers/influencer/features/messages/conversations/api";

export const messagesRouter = createTRPCRouter({
  conversations: getConversations,
});
