import { createSupabaseAdminClient } from "@/lib/supabase/serverClient";
import { createUploadSignedUrlSchema } from "@/server/api/routers/influencer/features/avatar/create-upload-url/validation";
import { influencerProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { v4 as uuidv4 } from "uuid";

export const createUploadSignedUrl = influencerProcedure
  .input(createUploadSignedUrlSchema)
  .mutation(async ({ ctx, input }) => {
    const supabase = await createSupabaseAdminClient();

    // 一意なファイルパスを生成
    const fileExtension = input.fileName.split(".").pop();
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `/influencer/avatars/${ctx.influencerId}/${uniqueFileName}`;

    // Supabaseストレージから署名付きアップロードURLを取得
    const { data, error } = await supabase.storage
      .from("images")
      .createSignedUploadUrl(filePath, {
        upsert: true,
      });

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `アップロードURL の作成に失敗しました: ${error.message}`,
      });
    }

    return {
      signedUrl: data.signedUrl,
      filePath: filePath,
      token: data.token,
    };
  });
