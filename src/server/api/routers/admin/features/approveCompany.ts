import { env } from "@/env";
import { createSupabaseAdminClient } from "@/lib/supabase/serverClient";
import { publicProcedure } from "@/server/api/trpc";
import { approveCompanySchema } from "@/validations/admin/approveCompany";
import { TRPCError } from "@trpc/server";
import type { Route } from "next";

export const approveCompany = publicProcedure
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

    const email = company.business.email;

    // Supabaseユーザー発行
    const supabase = await createSupabaseAdminClient();
    const route: Route = `/public/company/forget-password?email=${email}`;
    await supabase.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${env.NEXT_PUBLIC_APP_URL}${route}`,
      data: {
        role: "company",
        displayName: company.business.contactName,
      },
    });

    return company;
  });
