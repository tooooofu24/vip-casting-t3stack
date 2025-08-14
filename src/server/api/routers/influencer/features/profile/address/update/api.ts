import { influencerProcedure } from "@/server/api/trpc";
import { updateAddressSchema } from "@/server/api/routers/influencer/features/profile/address/update/validation";

export const updateAddress = influencerProcedure
  .input(updateAddressSchema)
  .mutation(async ({ ctx, input }) => {
    // 郵便番号のハイフン除去（データベースには統一形式で保存）
    const postalCode = input.postalCode.replace("-", "");

    // 既存の住所情報を更新または作成（upsert）
    await ctx.db.influencerAddress.upsert({
      where: { influencerId: ctx.influencerId },
      create: {
        influencerId: ctx.influencerId,
        postalCode,
        prefecture: input.prefecture,
        city: input.city,
        town: input.town,
        street: input.street,
        building: input.building ?? null,
      },
      update: {
        postalCode,
        prefecture: input.prefecture,
        city: input.city,
        town: input.town,
        street: input.street,
        building: input.building ?? null,
      },
    });

    return null;
  });
