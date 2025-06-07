import { createSupabaseAdminClient } from "@/lib/supabase/serverClient";
import { adminProcedure } from "@/server/api/trpc";
import { adminSignUpSchema } from "@/validations/admin/adminLogin";
import { TRPCError } from "@trpc/server";

export const signUp = adminProcedure
  .input(adminSignUpSchema)
  .mutation(async ({ input }) => {
    const supabase = await createSupabaseAdminClient();

    const { data, error } = await supabase.auth.admin.createUser({
      email: input.email,
      password: input.password,
      email_confirm: true,
      user_metadata: {
        role: "admin",
        displayName: input.displayName,
      },
    });

    if (error) {
      console.error("Admin user creation error:", error);
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "管理者ユーザーの作成に失敗しました。",
      });
    }

    return data.user;
  });
