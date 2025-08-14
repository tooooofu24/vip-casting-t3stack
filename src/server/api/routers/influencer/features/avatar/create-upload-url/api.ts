import { influencerProcedure } from "@/server/api/trpc";
import { createUploadSignedUrlSchema } from "@/server/api/routers/influencer/features/avatar/create-upload-url/validation";
import { createSupabaseAdminClient } from "@/lib/supabase/serverClient";
import { v4 as uuidv4 } from "uuid";

export const createUploadSignedUrl = influencerProcedure
  .input(createUploadSignedUrlSchema)
  .mutation(async ({ ctx, input }) => {
    const supabase = await createSupabaseAdminClient();

    // 一意なファイルパスを生成
    const fileExtension = input.fileName.split(".").pop();
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `avatars/${ctx.influencerId}/${uniqueFileName}`;

    // Supabaseストレージから署名付きアップロードURLを取得
    const { data, error } = await supabase.storage
      .from("images")
      .createSignedUploadUrl(filePath, {
        upsert: true,
      });

    if (error) {
      throw new Error(`アップロードURL の作成に失敗しました: ${error.message}`);
    }

    return {
      signedUrl: data.signedUrl,
      filePath: filePath,
      token: data.token,
    };
  });
