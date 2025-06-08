import { publicProcedure } from "@/server/api/trpc";
import { companyRegisterSchema } from "@/server/api/routers/company/validations/register";

export const register = publicProcedure
  .input(companyRegisterSchema)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.$transaction(async (prisma) => {
      const company = await prisma.company.create({
        data: {},
      });
      // 2. 各情報をcompanyIdで紐付けて作成
      await prisma.companyInformation.create({
        data: {
          ...input.information,
          establishedAt: new Date(input.information.establishedAt),
          companyId: company.id,
        },
      });
      await prisma.companyAddress.create({
        data: { ...input.address, companyId: company.id },
      });
      // 3. CompanyBusiness本体をageGroups等を除いて作成
      const {
        ageGroups,
        regions,
        genres,
        objectives,
        minBudget,
        maxBudget,
        ...businessRest
      } = input.business;
      const business = await prisma.companyBusiness.create({
        data: {
          ...businessRest,
          minBudget: Number(minBudget),
          maxBudget: Number(maxBudget),
          companyId: company.id,
        },
      });
      // 4. 中間テーブルにbulk insert
      await prisma.companyBusinessAgeGroup.createMany({
        data: ageGroups.map((ageGroup) => ({
          companyBusinessId: business.id,
          ageGroup,
        })),
      });
      await prisma.companyBusinessRegion.createMany({
        data: regions.map((region) => ({
          companyBusinessId: business.id,
          region,
        })),
      });
      await prisma.companyBusinessGenre.createMany({
        data: genres.map((genre) => ({
          companyBusinessId: business.id,
          genre,
        })),
      });
      await prisma.companyBusinessObjective.createMany({
        data: objectives.map((objective) => ({
          companyBusinessId: business.id,
          objective,
        })),
      });
      await prisma.companyPayment.create({
        data: { ...input.payment, companyId: company.id },
      });
      return null;
    });
  });
