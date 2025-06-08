import { companyProcedure } from "@/server/api/trpc";
import { updateCampaignSchema } from "@/server/api/routers/company/features/campaigns/validations/updateCampaign";
import { TRPCError } from "@trpc/server";

export const updateCampaign = companyProcedure
  .input(updateCampaignSchema)
  .mutation(async ({ ctx, input }) => {
    const {
      id,
      title,
      description,
      platform,
      recruitment,
      applicationDue,
      postDue,
      rewardType,
      rewardAmount,
      requirements,
      note,
    } = input;

    // キャンペーンが存在し、かつ自社のものであることを確認
    const existingCampaign = await ctx.db.campaign.findFirst({
      where: {
        id,
        companyId: ctx.companyId,
      },
    });

    if (!existingCampaign) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "キャンペーンが見つかりません。",
      });
    }

    // キャンペーンを更新
    const updatedCampaign = await ctx.db.campaign.update({
      where: { id },
      data: {
        title,
        description,
        platform,
        recruitment,
        rewardType,
        rewardAmount,
        requirements,
        note,
        applicationDue: new Date(applicationDue),
        postDue: new Date(postDue),
      },
    });

    return updatedCampaign;
  });
