import { influencerProcedure } from "@/server/api/trpc";
import { getMessagesSchema } from "@/server/api/routers/influencer/features/messages/messages/validation";
import { TRPCError } from "@trpc/server";

export const getMessages = influencerProcedure
  .input(getMessagesSchema)
  .query(async ({ ctx, input }) => {
    // 1. 会話の存在確認（権限チェック込み）
    const conversation = await ctx.db.conversation.findFirst({
      where: {
        id: input.conversationId,
        influencerId: ctx.influencerId, // 自分の会話のみアクセス可能
      },
    });

    if (!conversation) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "会話が見つかりません",
      });
    }

    // 2. メッセージ履歴取得
    const messages = await ctx.db.message.findMany({
      where: {
        conversationId: input.conversationId,
      },
      include: {
        conversation: {
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
            influencer: {
              include: {
                information: {
                  select: {
                    displayName: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc", // 古い順（チャット形式）
      },
    });

    // 3. 自動既読処理（企業からの未読メッセージのみ）
    await ctx.db.message.updateMany({
      where: {
        conversationId: input.conversationId,
        senderType: "COMPANY", // 企業からのメッセージのみ
        readAt: null, // 未読のみ
      },
      data: {
        readAt: new Date(),
      },
    });

    // 4. レスポンス形式を整理
    return {
      conversationId: input.conversationId,
      companyName:
        messages[0]?.conversation.company.information?.displayName ??
        "企業名不明",
      messages: messages.map((message) => ({
        id: message.id,
        content: message.content,
        senderType: message.senderType,
        senderName:
          message.senderType === "COMPANY"
            ? (message.conversation.company.information?.displayName ??
              "企業名不明")
            : (message.conversation.influencer.information?.displayName ??
              "インフルエンサー名不明"),
        readAt: message.readAt,
        createdAt: message.createdAt,
      })),
    };
  });
