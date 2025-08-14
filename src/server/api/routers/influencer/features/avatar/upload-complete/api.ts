import { uploadCompleteSchema } from "@/server/api/routers/influencer/features/avatar/upload-complete/validation";
import { influencerProcedure } from "@/server/api/trpc";

export const uploadComplete = influencerProcedure
  .input(uploadCompleteSchema)
  .mutation(async ({ ctx, input }) => {
    // 既存のアバター情報を削除
    await ctx.db.influencerAvatar.deleteMany({
      where: { influencerId: ctx.influencerId },
    });

    // 新しいアバター情報を作成
    const avatar = await ctx.db.influencerAvatar.create({
      data: {
        influencerId: ctx.influencerId,
        fileName: input.fileName,
        filePath: input.filePath,
        mimeType: input.mimeType,
        fileSize: input.fileSize,
      },
    });

    return avatar;
  });
