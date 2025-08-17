import { influencerProcedure } from "@/server/api/trpc";
import { createConversationSchema } from "@/server/api/routers/influencer/features/messages/create/validation";
import { TRPCError } from "@trpc/server";

export const createConversation = influencerProcedure
  .input(createConversationSchema)
  .mutation(async ({ ctx, input }) => {
    // 1. 企業の存在確認
    const company = await ctx.db.company.findUnique({
      where: { id: input.companyId },
      include: {
        information: {
          select: {
            displayName: true,
          },
        },
      },
    });

    if (!company) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "企業が見つかりません",
      });
    }

    // 2. 既存会話の重複チェック
    const existingConversation = await ctx.db.conversation.findFirst({
      where: {
        companyId: input.companyId,
        influencerId: ctx.influencerId,
      },
    });

    if (existingConversation) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "この企業との会話は既に存在します",
      });
    }

    // 3. トランザクションで会話作成 + 初回メッセージ送信
    const result = await ctx.db.$transaction(async (tx) => {
      // 会話作成
      const conversation = await tx.conversation.create({
        data: {
          companyId: input.companyId,
          influencerId: ctx.influencerId,
        },
      });

      // 初回メッセージ作成
      const message = await tx.message.create({
        data: {
          conversationId: conversation.id,
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

      return { conversation, message };
    });

    // 4. レスポンス形式を整理
    return {
      conversationId: result.conversation.id,
      companyId: input.companyId,
      companyName: company.information?.displayName ?? "企業名不明",
      message: {
        id: result.message.id,
        content: result.message.content,
        senderType: result.message.senderType,
        senderName:
          result.message.conversation.influencer.information?.displayName ??
          "インフルエンサー名不明",
        readAt: result.message.readAt,
        createdAt: result.message.createdAt,
      },
    };
  });
