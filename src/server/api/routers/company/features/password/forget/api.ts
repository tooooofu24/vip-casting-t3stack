import { createSupabaseAdminClient } from "@/lib/supabase/serverClient";
import { companyForgetPasswordSchema } from "@/server/api/routers/company/features/password/forget/validation";
import { publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const forget = publicProcedure
  .input(companyForgetPasswordSchema)
  .mutation(async ({ input }) => {
    const supabase = await createSupabaseAdminClient();

    const { error } = await supabase.auth.resetPasswordForEmail(input.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    });

    if (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "パスワードリセットメールの送信に失敗しました",
      });
    }

    return {
      message: "パスワードリセットメールを送信しました",
    };
  });
