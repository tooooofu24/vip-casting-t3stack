import { influencerProcedure } from "@/server/api/trpc";
import { sendMessageSchema } from "@/server/api/routers/influencer/features/messages/send/validation";
import { TRPCError } from "@trpc/server";

export const sendMessage = influencerProcedure
  .input(sendMessageSchema)
  .mutation(async ({ ctx, input }) => {
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

    // 2. トランザクションでメッセージ作成 + 会話更新
    const result = await ctx.db.$transaction(async (tx) => {
      // メッセージ作成
      const message = await tx.message.create({
        data: {
          conversationId: input.conversationId,
          senderId: ctx.influencerId,
          senderType: "INFLUENCER",
          content: input.content,
        },
        include: {
          conversation: {
            include: {
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
      });

      // 会話の更新日時を更新
      await tx.conversation.update({
        where: { id: input.conversationId },
        data: { updatedAt: new Date() },
      });

      return message;
    });

    // 3. レスポンス形式を整理
    return {
      id: result.id,
      conversationId: result.conversationId,
      content: result.content,
      senderType: result.senderType,
      senderName:
        result.conversation.influencer.information?.displayName ??
        "インフルエンサー名不明",
      readAt: result.readAt,
      createdAt: result.createdAt,
    };
  });
