import { influencerProcedure } from "@/server/api/trpc";
import { updateSnsSchema } from "@/server/api/routers/influencer/features/profile/sns/update/validation";

export const updateSns = influencerProcedure
  .input(updateSnsSchema)
  .mutation(async ({ ctx, input }) => {
    await ctx.db.influencerSns.upsert({
      where: {
        influencerId: ctx.influencerId,
      },
      update: {
        instagramName: input.instagramName,
        instagramFollowers: input.instagramFollowers,
        youtubeName: input.youtubeName,
        youtubeFollowers: input.youtubeFollowers,
        tiktokName: input.tiktokName,
        tiktokFollowers: input.tiktokFollowers,
        xName: input.xName,
        xFollowers: input.xFollowers,
      },
      create: {
        influencerId: ctx.influencerId,
        instagramName: input.instagramName,
        instagramFollowers: input.instagramFollowers,
        youtubeName: input.youtubeName,
        youtubeFollowers: input.youtubeFollowers,
        tiktokName: input.tiktokName,
        tiktokFollowers: input.tiktokFollowers,
        xName: input.xName,
        xFollowers: input.xFollowers,
      },
    });
  });
