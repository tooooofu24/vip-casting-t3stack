import { createSupabaseServerClient } from "@/lib/supabase/serverClient";
import { influencerLoginSchema } from "@/server/api/routers/influencer/features/auth/login/validation";
import { publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const login = publicProcedure
  .input(influencerLoginSchema)
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

    // インフルエンサー権限を確認
    if (data.user?.user_metadata?.role !== "influencer") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "インフルエンサー権限が必要です",
      });
    }

    return {
      user: data.user,
      session: data.session,
    };
  });
