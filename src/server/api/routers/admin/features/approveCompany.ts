import { createSupabaseAdminClient } from "@/lib/supabase/serverClient";
import { publicProcedure } from "@/server/api/trpc";
import { approveCompanySchema } from "@/validations/admin/approveCompany";
import { TRPCError } from "@trpc/server";

export const approveCompany = publicProcedure
  .input(approveCompanySchema)
  .mutation(async ({ ctx, input }) => {
    // 会社情報取得
    const company = await ctx.db.company.update({
      where: { id: input.companyId },
      data: { isApproved: false },
      include: { business: true },
    });

    // businessがなければエラー
    if (!company.business) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "ビジネス情報がありません。",
      });
    }

    // Supabaseユーザー発行
    const supabase = await createSupabaseAdminClient();
    await supabase.auth.admin.inviteUserByEmail("test@test.com", {
      data: {
        role: "company",
        displayName: company.business.contactName,
      },
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    });

    return company;
  });
