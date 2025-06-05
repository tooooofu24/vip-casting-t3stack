import { z } from "@/lib/zod";
import { companyProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const getCampaignById = companyProcedure
  .input(z.object({ id: z.string().uuid() }))
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
