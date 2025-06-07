import { createSupabaseAdminClient } from "@/lib/supabase/serverClient";
import { supabaseErrorCodeToTrpcCode } from "@/lib/trpc/supabaseErrorToTrpcError";
import { publicProcedure } from "@/server/api/trpc";
import type { ErrorCode as SupabaseErrorCode } from "@supabase/auth-js/src/lib/error-codes";
import { TRPCError } from "@trpc/server";

export const signUp = publicProcedure.mutation(async () => {
  const supabase = await createSupabaseAdminClient();
  const { error } = await supabase.auth.admin.createUser({
    email_confirm: true,
    email: "admin@example.com",
    password: "password",
    user_metadata: {
      role: "admin",
      displayName: "管理者",
    },
  });
  if (error) {
    throw new TRPCError({
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      code: supabaseErrorCodeToTrpcCode(error.code as SupabaseErrorCode),
      message: error.message,
      cause: error.cause,
    });
  }
  return null;
});
