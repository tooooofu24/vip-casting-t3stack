import { z } from "@/lib/zod";
import { companyProcedure } from "@/server/api/trpc";

export const getCampaigns = companyProcedure
  .input(
    z
      .object({
        status: z
          .enum([
            "DRAFT",
            "RECRUITING",
            "IN_PROGRESS",
            "COMPLETED",
            "CANCELLED",
          ])
          .optional(),
        page: z.number().min(1).default(1),
        perPage: z.number().min(1).max(100).default(20),
      })
      .optional(),
  )
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
