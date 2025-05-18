import { createSupabaseServerClient } from "@/lib/supabase/serverClient";
import { supabaseErrorCodeToTrpcCode } from "@/lib/trpc/supabaseErrorToTrpcError";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { adminLoginSchema } from "@/validations/admin/adminLogin";
import type { ErrorCode as SupabaseErrorCode } from "@supabase/auth-js/src/lib/error-codes";
import { TRPCError } from "@trpc/server";

export const adminRouter = createTRPCRouter({
  login: publicProcedure
    .input(adminLoginSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw new TRPCError({
          code: supabaseErrorCodeToTrpcCode(error.code as SupabaseErrorCode),
          message: error.message,
          cause: error.cause,
        });
      }
      if (data.user.user_metadata.role !== "admin") {
        await supabase.auth.signOut();
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "管理者権限がありません。",
        });
      }
      return null;
    }),
});
