import { influencerProcedure } from "@/server/api/trpc";
import { updateWorkSchema } from "@/server/api/routers/influencer/features/profile/work/update/validation";

export const updateWork = influencerProcedure
  .input(updateWorkSchema)
  .mutation(async ({ ctx, input }) => {
    // トランザクション内で Work と PrResult を更新
    return await ctx.db.$transaction(async (db) => {
      // InfluencerWork のupsert
      const work = await db.influencerWork.upsert({
        where: {
          influencerId: ctx.influencerId,
        },
        update: {
          postFee: input.postFee,
          videoFee: input.videoFee,
          liveFee: input.liveFee,
          eventFee: input.eventFee,
          workTypes: input.workTypes,
          regions: input.regions,
          ngProducts: input.ngProducts ?? [],
          ngCompanies: input.ngCompanies ?? [],
          ngOther: input.ngOther,
        },
        create: {
          influencerId: ctx.influencerId,
          postFee: input.postFee,
          videoFee: input.videoFee,
          liveFee: input.liveFee,
          eventFee: input.eventFee,
          workTypes: input.workTypes,
          regions: input.regions,
          ngProducts: input.ngProducts ?? [],
          ngCompanies: input.ngCompanies ?? [],
          ngOther: input.ngOther,
        },
      });

      // 既存のPR実績を全削除
      await db.influencerPrResult.deleteMany({
        where: {
          influencerWorkId: work.id,
        },
      });

      // 新しいPR実績を作成
      if (input.prResults && input.prResults.length > 0) {
        await db.influencerPrResult.createMany({
          data: input.prResults.map((result) => ({
            influencerWorkId: work.id,
            company: result.company,
            content: result.content,
            year: result.year,
            month: result.month,
          })),
        });
      }

      return work;
    });
  });
