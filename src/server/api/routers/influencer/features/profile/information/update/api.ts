import { updateInformationSchema } from "@/server/api/routers/influencer/features/profile/information/update/validation";
import { influencerProcedure } from "@/server/api/trpc";

export const updateInformation = influencerProcedure
  .input(updateInformationSchema)
  .mutation(async ({ ctx, input }) => {
    // 誕生日をDateオブジェクトに変換
    const birthday = new Date(input.birthday);

    // 既存の情報を更新または作成（upsert）
    await ctx.db.influencerInformation.upsert({
      where: { influencerId: ctx.influencerId },
      create: {
        influencerId: ctx.influencerId,
        displayName: input.displayName,
        email: input.email,
        lastName: input.lastName,
        firstName: input.firstName,
        lastNameKana: input.lastNameKana,
        firstNameKana: input.firstNameKana,
        birthday,
        gender: input.gender,
        phone: input.phone,
      },
      update: {
        displayName: input.displayName,
        email: input.email,
        lastName: input.lastName,
        firstName: input.firstName,
        lastNameKana: input.lastNameKana,
        firstNameKana: input.firstNameKana,
        birthday,
        gender: input.gender,
        phone: input.phone,
      },
    });

    return null;
  });
