import { CampaignStatus } from "@/lib/prisma/generated";
import { getCampaignsSchema } from "@/server/api/routers/influencer/features/campaigns/get/validation";
import { publicProcedure } from "@/server/api/trpc";

export const getCampaigns = publicProcedure
  .input(getCampaignsSchema)
  .query(async ({ ctx, input }) => {
    const { limit, offset } = input;

    // Simple where clause - only show recruiting and in-progress campaigns
    const where = {
      status: {
        in: [CampaignStatus.RECRUITING, CampaignStatus.IN_PROGRESS], // Show recruiting and in-progress campaigns to influencers
      },
    };

    // Default order by creation date (newest first)
    const orderBy = { createdAt: "desc" as const };

    // Fetch campaigns with pagination
    const [campaigns, totalCount] = await Promise.all([
      ctx.db.campaign.findMany({
        where,
        orderBy,
        skip: offset,
        take: limit,
        include: {
          company: {
            include: {
              information: {
                select: {
                  displayName: true,
                  corporateNumber: true,
                },
              },
              business: {
                include: {
                  genres: true,
                  regions: true,
                },
              },
            },
          },
        },
      }),
      ctx.db.campaign.count({ where }),
    ]);

    return {
      campaigns,
      totalCount,
      hasMore: offset + limit < totalCount,
    };
  });
