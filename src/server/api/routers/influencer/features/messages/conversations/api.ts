import { influencerProcedure } from "@/server/api/trpc";
import { getConversationsSchema } from "@/server/api/routers/influencer/features/messages/conversations/validation";

export const getConversations = influencerProcedure
  .input(getConversationsSchema)
  .query(async ({ ctx }) => {
    const conversations = await ctx.db.conversation.findMany({
      where: {
        influencerId: ctx.influencerId,
      },
      include: {
        company: {
          include: {
            information: {
              select: {
                displayName: true,
              },
            },
          },
        },
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1, // 最新メッセージのみ
          select: {
            content: true,
            createdAt: true,
            readAt: true,
            senderType: true,
          },
        },
        _count: {
          select: {
            messages: {
              where: {
                senderType: "COMPANY", // 企業からのメッセージ
                readAt: null, // 未読
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: "desc", // 最新の会話順
      },
    });

    // レスポンス形式を整理
    return conversations.map((conversation) => ({
      id: conversation.id,
      companyId: conversation.companyId,
      companyName:
        conversation.company.information?.displayName ?? "企業名不明",
      lastMessage: conversation.messages[0]?.content ?? "",
      lastMessageTime: conversation.messages[0]?.createdAt,
      unreadCount: conversation._count.messages,
      updatedAt: conversation.updatedAt,
    }));
  });
