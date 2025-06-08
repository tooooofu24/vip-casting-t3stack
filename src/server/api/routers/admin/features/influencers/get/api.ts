import { getInfluencersSchema } from "@/server/api/routers/admin/features/influencers/get/validation";
import { adminProcedure } from "@/server/api/trpc";

export const get = adminProcedure
  .input(getInfluencersSchema)
  .query(async ({ ctx, input }) => {
    const influencers = await ctx.db.influencer.findMany({
      where:
        input.isApproved !== undefined
          ? { isApproved: input.isApproved }
          : undefined,
      include: {
        information: true,
        address: true,
        sns: true,
        work: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return influencers;
  });
