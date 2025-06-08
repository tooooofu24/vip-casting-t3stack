import { getCompaniesSchema } from "@/server/api/routers/admin/features/companies/get/validation";
import { adminProcedure } from "@/server/api/trpc";

export const get = adminProcedure
  .input(getCompaniesSchema)
  .query(async ({ ctx, input }) => {
    const companies = await ctx.db.company.findMany({
      where: input.isApproved !== undefined ? { isApproved: input.isApproved } : undefined,
      include: {
        information: true,
        address: true,
        business: true,
        payment: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return companies;
  });