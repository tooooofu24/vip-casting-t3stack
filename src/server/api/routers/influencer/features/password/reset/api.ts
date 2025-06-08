import { createSupabaseServerClient } from "@/lib/supabase/serverClient";
import { influencerResetPasswordSchema } from "@/server/api/routers/influencer/features/password/reset/validation";
import { publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const reset = publicProcedure
  .input(influencerResetPasswordSchema)
  .mutation(async ({ input }) => {
    const supabase = await createSupabaseServerClient();

    // 現在のユーザーセッションを確認
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "認証エラーが発生しました",
      });
    }

    // パスワードを更新
    const { error } = await supabase.auth.updateUser({
      password: input.newPassword,
    });

    if (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "パスワードの更新に失敗しました",
      });
    }

    return {
      message: "パスワードを更新しました",
    };
  });
