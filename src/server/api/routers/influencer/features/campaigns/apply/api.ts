import { applyCampaignSchema } from "@/server/api/routers/influencer/features/campaigns/apply/validation";
import { influencerProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const applyCampaign = influencerProcedure
  .input(applyCampaignSchema)
  .mutation(async ({ ctx, input }) => {
    // キャンペーンが存在し、募集中かチェック
    const campaign = await ctx.db.campaign.findUnique({
      where: {
        id: input.campaignId,
      },
    });

    if (!campaign) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "キャンペーンが見つかりません",
      });
    }

    if (campaign.status !== "RECRUITING") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "このキャンペーンは現在募集していません",
      });
    }

    // 応募締切をチェック
    if (campaign.applicationDue && new Date() > campaign.applicationDue) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "応募締切を過ぎています",
      });
    }

    // 既に応募済みかチェック
    const existingApplication = await ctx.db.application.findUnique({
      where: {
        campaignId_influencerId: {
          campaignId: input.campaignId,
          influencerId: ctx.influencerId,
        },
      },
    });

    if (existingApplication) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "既にこのキャンペーンに応募済みです",
      });
    }

    // 応募を作成
    const application = await ctx.db.application.create({
      data: {
        campaignId: input.campaignId,
        influencerId: ctx.influencerId,
        message: input.message,
        status: "PENDING",
      },
      include: {
        campaign: {
          select: {
            title: true,
          },
        },
      },
    });

    return {
      success: true,
      application: {
        id: application.id,
        campaignTitle: application.campaign.title,
        status: application.status,
        createdAt: application.createdAt,
      },
    };
  });
