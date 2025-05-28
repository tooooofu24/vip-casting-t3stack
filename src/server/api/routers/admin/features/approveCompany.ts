import { publicProcedure } from "@/server/api/trpc";
import { approveCompanySchema } from "@/validations/admin/approveCompany";

export const approveCompany = publicProcedure
  .input(approveCompanySchema)
  .mutation(async ({ ctx, input }) => {
    const company = await ctx.db.company.update({
      where: { id: input.companyId },
      data: { isApproved: true },
    });
    return company;
  });
