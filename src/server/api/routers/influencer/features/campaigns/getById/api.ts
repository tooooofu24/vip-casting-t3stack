import { getCampaignByIdSchema } from "@/server/api/routers/influencer/features/campaigns/getById/validation";
import { publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const getCampaignById = publicProcedure
  .input(getCampaignByIdSchema)
  .query(async ({ ctx, input }) => {
    const campaign = await ctx.db.campaign.findUnique({
      where: {
        id: input.id,
      },
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
                genres: {
                  select: {
                    genre: true,
                  },
                },
                regions: {
                  select: {
                    region: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!campaign) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Campaign not found",
      });
    }

    return {
      campaign,
    };
  });
