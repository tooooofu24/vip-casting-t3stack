import { adminProcedure } from "@/server/api/trpc";

export const getUnapprovedInfluencers = adminProcedure.query(
  async ({ ctx }) => {
    const influencers = await ctx.db.influencer.findMany({
      where: { isApproved: false },
      include: {
        information: true,
        address: true,
        sns: true,
        work: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return influencers;
  },
);
