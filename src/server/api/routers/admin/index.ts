import { createSupabaseAdminClient } from "@/lib/supabase/serverClient";
import { supabaseErrorCodeToTrpcCode } from "@/lib/trpc/supabaseErrorToTrpcError";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import type { ErrorCode as SupabaseErrorCode } from "@supabase/auth-js/src/lib/error-codes";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const adminRouter = createTRPCRouter({
  signUp: publicProcedure.mutation(async () => {
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
        code: supabaseErrorCodeToTrpcCode(error.code as SupabaseErrorCode),
        message: error.message,
        cause: error.cause,
      });
    }
    return null;
  }),
  getUnapprovedCompanies: publicProcedure.query(async ({ ctx }) => {
    const companies = await ctx.db.company.findMany({
      where: {
        isApproved: false,
      },
      include: {
        information: true,
        address: true,
        business: true,
        payment: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return companies;
  }),
  approveCompany: publicProcedure
    .input(z.object({ companyId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const company = await ctx.db.company.update({
        where: { id: input.companyId },
        data: { isApproved: true },
      });
      return company;
    }),
});
