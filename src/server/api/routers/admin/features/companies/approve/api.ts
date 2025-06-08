import { env } from "@/env";
import { createSupabaseAdminClient } from "@/lib/supabase/serverClient";
import { approveCompanySchema } from "@/server/api/routers/admin/features/companies/approve/validation";
import { adminProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import type { Route } from "next";

export const approve = adminProcedure
  .input(approveCompanySchema)
  .mutation(async ({ ctx, input }) => {
    // 会社情報取得・承認
    const company = await ctx.db.company.findUnique({
      where: { id: input.companyId },
      include: {
        information: true,
        address: true,
        business: true,
        payment: true,
      },
    });

    if (!company) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "会社が見つかりません。",
      });
    }

    if (!company.information) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "会社情報がありません。",
      });
    }
    if (!company.address) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "会社住所情報がありません。",
      });
    }
    if (!company.business) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "会社ビジネス情報がありません。",
      });
    }
    if (!company.payment) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "会社支払い情報がありません。",
      });
    }

    // Supabaseユーザー招待
    const supabase = await createSupabaseAdminClient();
    const route: Route = "/set-session";
    const { error: authError } = await supabase.auth.admin.inviteUserByEmail(
      company.business.email,
      {
        redirectTo: `${env.NEXT_PUBLIC_APP_URL}${route}`,
        data: {
          role: "company",
          displayName: company.information.companyName,
        },
      },
    );

    if (authError) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "ユーザー招待に失敗しました。",
      });
    }

    // 会社を承認
    const updatedCompany = await ctx.db.company.update({
      where: { id: input.companyId },
      data: { isApproved: true },
    });

    return updatedCompany;
  });
