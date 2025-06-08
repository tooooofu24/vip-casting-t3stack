import { CampaignStatus } from "@/lib/prisma/generated";
import { publicProcedure } from "@/server/api/trpc";
import { getCampaignsSchema } from "@/server/api/routers/influencer/features/campaigns/get/validation";

export const getCampaigns = publicProcedure
  .input(getCampaignsSchema)
  .query(async ({ ctx, input }) => {
    const {
      limit,
      offset,
      genre,
      rewardType,
      region,
      platform,
      sortBy,
      sortOrder,
    } = input;

    // Build where clause for filtering
    const where = {
      status: CampaignStatus.RECRUITING, // Only show recruiting campaigns to influencers
      ...(platform && { platform }),
      ...(rewardType && { rewardType }),
      // For genre and region filtering, we need to join with company business data
      ...(genre && {
        company: {
          business: {
            genres: {
              some: {
                genre,
              },
            },
          },
        },
      }),
      ...(region && {
        company: {
          business: {
            regions: {
              some: {
                region,
              },
            },
          },
        },
      }),
    };

    // Build orderBy clause
    const orderBy = (() => {
      switch (sortBy) {
        case "reward":
          return { rewardAmount: sortOrder };
        case "deadline":
          return { applicationDue: sortOrder };
        case "createdAt":
        default:
          return { createdAt: sortOrder };
      }
    })();

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

    // Transform the response to include only public information
    const publicCampaigns = campaigns.map((campaign) => ({
      id: campaign.id,
      title: campaign.title,
      description: campaign.description,
      platform: campaign.platform,
      recruitment: campaign.recruitment,
      applicationDue: campaign.applicationDue,
      postDue: campaign.postDue,
      rewardType: campaign.rewardType,
      rewardAmount: campaign.rewardAmount,
      requirements: campaign.requirements,
      createdAt: campaign.createdAt,
      company: {
        displayName: campaign.company?.information?.displayName ?? "",
        corporateNumber: campaign.company?.information?.corporateNumber ?? "",
        genres: campaign.company?.business?.genres?.map((g) => g.genre) ?? [],
        regions:
          campaign.company?.business?.regions?.map((r) => r.region) ?? [],
      },
    }));

    return {
      campaigns: publicCampaigns,
      totalCount,
      hasMore: offset + limit < totalCount,
    };
  });
