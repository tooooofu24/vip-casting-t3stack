import { createConversationSchema } from "@/server/api/routers/influencer/features/messages/create/validation";
import { influencerProcedure } from "@/server/api/trpc";
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
      return {
        conversationId: existingConversation.id,
      };
    }

    // 3. 会話作成
    const conversation = await ctx.db.conversation.create({
      data: {
        companyId: input.companyId,
        influencerId: ctx.influencerId,
      },
    });

    // 4. レスポンス形式を整理
    return {
      conversationId: conversation.id,
    };
  });
