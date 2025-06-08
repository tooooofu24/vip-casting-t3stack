import { influencerRegisterSchema } from "@/server/api/routers/influencer/validations/register";
import { publicProcedure } from "@/server/api/trpc";

export const register = publicProcedure
  .input(influencerRegisterSchema)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.$transaction(async (prisma) => {
      // 1. Influencer作成
      const influencer = await prisma.influencer.create({
        data: {},
      });
      // 2. 各情報をinfluencerIdで紐付けて作成
      await prisma.influencerInformation.create({
        data: {
          ...input.information,
          birthday: new Date(input.information.birthday),
          influencerId: influencer.id,
        },
      });
      await prisma.influencerAddress.create({
        data: { ...input.address, influencerId: influencer.id },
      });
      await prisma.influencerSns.create({
        data: { ...input.sns, influencerId: influencer.id },
      });
      const { prResults, ...workRest } = input.work;
      const work = await prisma.influencerWork.create({
        data: {
          ...workRest,
          influencerId: influencer.id,
        },
      });
      if (prResults && prResults.length > 0) {
        await prisma.influencerPrResult.createMany({
          data: prResults.map((pr) => ({
            ...pr,
            influencerWorkId: work.id,
          })),
        });
      }
      return null;
    });
  });
