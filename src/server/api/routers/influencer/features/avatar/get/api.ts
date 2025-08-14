import { influencerProcedure } from "@/server/api/trpc";
import { createSupabaseAdminClient } from "@/lib/supabase/serverClient";

export const getAvatar = influencerProcedure.query(async ({ ctx }) => {
  const avatar = await ctx.db.influencerAvatar.findUnique({
    where: { influencerId: ctx.influencerId },
  });

  if (!avatar) {
    return null;
  }

  const supabase = await createSupabaseAdminClient();

  // 署名付きURL（ダウンロード用）を生成
  const { data, error } = await supabase.storage
    .from("images")
    .createSignedUrl(avatar.filePath, 60 * 60); // 1時間有効

  if (error) {
    throw new Error(`画像の取得に失敗しました: ${error.message}`);
  }

  return {
    id: avatar.id,
    fileName: avatar.fileName,
    fileSize: avatar.fileSize,
    mimeType: avatar.mimeType,
    signedUrl: data.signedUrl,
    createdAt: avatar.createdAt,
    updatedAt: avatar.updatedAt,
  };
});
