import { companyProcedure } from "@/server/api/trpc";
import { getCampaignsSchema } from "@/server/api/routers/company/features/campaigns/get/validation";

export const getCampaigns = companyProcedure
  .input(getCampaignsSchema)
  .query(async ({ ctx, input }) => {
    const { status, page = 1, perPage = 20 } = input ?? {};

    // Fetch campaigns with pagination
    const [campaigns, totalCount] = await Promise.all([
      ctx.db.campaign.findMany({
        where: {
          companyId: ctx.companyId,
          ...(status && { status }),
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * perPage,
        take: perPage,
        include: {
          company: {
            include: {
              information: {
                select: {
                  displayName: true,
                },
              },
            },
          },
        },
      }),
      ctx.db.campaign.count({
        where: {
          companyId: ctx.companyId,
          ...(status && { status }),
        },
      }),
    ]);

    return {
      campaigns,
      pagination: {
        page,
        perPage,
        totalCount,
        totalPages: Math.ceil(totalCount / perPage),
      },
    };
  });
