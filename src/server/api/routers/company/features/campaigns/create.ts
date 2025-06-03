import { companyProcedure } from "@/server/api/trpc";
import { companyCampaignSchema } from "@/validations/company/campaign";

export const createCampaign = companyProcedure
  .input(companyCampaignSchema)
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
