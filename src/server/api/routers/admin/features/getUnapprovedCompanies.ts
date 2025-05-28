import { publicProcedure } from "@/server/api/trpc";

export const getUnapprovedCompanies = publicProcedure.query(async ({ ctx }) => {
  const companies = await ctx.db.company.findMany({
    where: { isApproved: false },
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
