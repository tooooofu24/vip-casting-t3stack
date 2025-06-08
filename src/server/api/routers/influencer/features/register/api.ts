import type { Prisma } from "@/lib/prisma/generated";
import { influencerRegisterSchema } from "@/server/api/routers/influencer/features/register/validations";
import { publicProcedure } from "@/server/api/trpc";
import type { StrictPropertyCheck } from "@/util/StrictPropertyCheck";

export const register = publicProcedure
  .input(influencerRegisterSchema)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.$transaction(async (prisma) => {
      // 1. Influencer作成
      const influencer = await prisma.influencer.create({
        data: {},
      });
      // 2. 基本情報を作成
      const infoData: StrictPropertyCheck<
        typeof input.information,
        Prisma.InfluencerInformationCreateInput
      > = input.information;

      await prisma.influencerInformation.create({
        data: {
          ...infoData,
          birthday: new Date(infoData.birthday),
          influencerId: influencer.id,
        },
      });

      // 3. 住所を作成
      const addressData: StrictPropertyCheck<
        typeof input.address,
        Prisma.InfluencerAddressCreateInput
      > = input.address;
      await prisma.influencerAddress.create({
        data: {
          ...addressData,
          influencerId: influencer.id,
        },
      });

      // 4. SNSを作成
      const snsData: StrictPropertyCheck<
        typeof input.sns,
        Prisma.InfluencerSnsCreateInput
      > = input.sns;
      await prisma.influencerSns.create({
        data: {
          ...snsData,
          influencerId: influencer.id,
        },
      });

      // 5. 案件情報を作成
      const { prResults, ...workRest } = input.work;
      const workData: StrictPropertyCheck<
        typeof workRest,
        Prisma.InfluencerWorkCreateInput
      > = workRest;
      const work = await prisma.influencerWork.create({
        data: {
          ...workData,
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
