import { publicProcedure } from "@/server/api/trpc";
import { influencerRegisterSchema } from "@/validations/influencer/register";

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
      await prisma.influencerWork.create({
        data: {
          ...workRest,
          influencerId: influencer.id,
          prResults: prResults ? { create: prResults } : undefined,
        },
      });
      return null;
    });
  });
