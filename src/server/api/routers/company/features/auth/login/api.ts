import { createSupabaseServerClient } from "@/lib/supabase/serverClient";
import { companyLoginSchema } from "@/server/api/routers/company/features/auth/login/validation";
import { publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const login = publicProcedure
  .input(companyLoginSchema)
  .mutation(async ({ input }) => {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (error) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "ログインに失敗しました",
      });
    }

    // 企業権限を確認
    if (data.user?.user_metadata?.role !== "company") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "企業権限が必要です",
      });
    }

    return {
      user: data.user,
      session: data.session,
    };
  });
