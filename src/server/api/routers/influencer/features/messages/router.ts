import { createTRPCRouter } from "@/server/api/trpc";
import { getConversations } from "@/server/api/routers/influencer/features/messages/conversations/api";
import { getMessages } from "@/server/api/routers/influencer/features/messages/messages/api";
import { sendMessage } from "@/server/api/routers/influencer/features/messages/send/api";
import { createConversation } from "@/server/api/routers/influencer/features/messages/create/api";

export const messagesRouter = createTRPCRouter({
  conversations: getConversations,
  messages: getMessages,
  send: sendMessage,
  create: createConversation,
});
