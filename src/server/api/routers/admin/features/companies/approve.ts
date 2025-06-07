import { env } from "@/env";
import { createSupabaseAdminClient } from "@/lib/supabase/serverClient";
import { adminProcedure } from "@/server/api/trpc";
import { approveCompanySchema } from "@/validations/admin/approveCompany";
import { TRPCError } from "@trpc/server";
import type { Route } from "next";

export const approve = adminProcedure
  .input(approveCompanySchema)
  .mutation(async ({ ctx, input }) => {
    // 会社情報取得
    const company = await ctx.db.company.update({
      where: { id: input.companyId },
      data: { isApproved: true },
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
    const route: Route = "/set-session";
    const { data: authData, error: authError } =
      await supabase.auth.admin.inviteUserByEmail(company.business.email, {
        redirectTo: `${env.NEXT_PUBLIC_APP_URL}${route}`,
        data: {
          role: "company",
          displayName: company.business.contactName,
        },
      });

    if (authError || !authData.user) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `ユーザー作成に失敗しました: ${authError?.message}`,
      });
    }

    // Prisma User レコードを作成
    await ctx.db.user.create({
      data: {
        supabaseId: authData.user.id,
        companyId: company.id,
      },
    });

    return company;
  });
