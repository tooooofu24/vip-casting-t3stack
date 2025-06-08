import { companyProcedure } from "@/server/api/trpc";
import { getCampaignByIdSchema } from "@/server/api/routers/company/features/campaigns/getById/validation";
import { TRPCError } from "@trpc/server";

export const getCampaignById = companyProcedure
  .input(getCampaignByIdSchema)
  .query(async ({ ctx, input }) => {
    const campaign = await ctx.db.campaign.findFirst({
      where: {
        id: input.id,
        companyId: ctx.companyId,
      },
    });

    if (!campaign) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "キャンペーンが見つかりません。",
      });
    }

    return campaign;
  });
