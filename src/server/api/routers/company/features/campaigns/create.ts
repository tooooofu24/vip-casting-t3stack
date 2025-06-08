import { companyProcedure } from "@/server/api/trpc";
import { createCampaignSchema } from "@/server/api/routers/company/features/campaigns/validations/createCampaign";

export const createCampaign = companyProcedure
  .input(createCampaignSchema)
  .mutation(async ({ ctx, input }) => {
    const campaign = await ctx.db.campaign.create({
      data: {
        ...input,
        companyId: ctx.companyId,
        applicationDue: new Date(input.applicationDue),
        postDue: new Date(input.postDue),
      },
    });
    return campaign;
  });
