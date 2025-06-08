import { publicProcedure } from "@/server/api/trpc";
import { influencerRegisterSchema } from "@/server/api/routers/influencer/validations/register";

export const register = publicProcedure
  .input(influencerRegisterSchema)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.$transaction(async (prisma) => {
      // 1. Influencer作成（IDは Supabase auth.id で設定される予定）
      const influencer = await prisma.influencer.create({
        data: {
          id: crypto.randomUUID(), // 一時的にランダムUUIDを使用
        },
      });
      // 2. 各情報をinfluencerIdで紐付けて作成
      await prisma.influencerInformation.create({
        data: {
          ...input.information,
          birthday: new Date(input.information.birthdate),
          influencerId: influencer.id,
        },
      });
      await prisma.influencerAddress.create({
        data: { ...input.address, influencerId: influencer.id },
      });
      await prisma.influencerSns.createMany({
        data: input.sns.map(sns => ({ ...sns, influencerId: influencer.id })),
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
          data: prResults.map(pr => ({ 
            ...pr, 
            workId: work.id,
            completedAt: new Date(pr.completedAt)
          })),
        });
      }
      return null;
    });
  });
