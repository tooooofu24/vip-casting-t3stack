import { createSupabaseServerClient } from "@/lib/supabase/serverClient";
import { adminLoginSchema } from "@/server/api/routers/admin/features/auth/login/validation";
import { publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const login = publicProcedure
  .input(adminLoginSchema)
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

    // 管理者権限を確認
    if (data.user?.user_metadata?.role !== "admin") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "管理者権限が必要です",
      });
    }

    return {
      user: data.user,
      session: data.session,
    };
  });
