import { influencerProcedure } from "@/server/api/trpc";

export const getProfile = influencerProcedure.query(async ({ ctx }) => {
  const influencer = await ctx.db.influencer.findUnique({
    where: { id: ctx.influencerId },
    include: {
      information: true,
      address: true,
      sns: true,
      work: {
        include: {
          prResults: true,
        },
      },
    },
  });

  if (!influencer) {
    throw new Error("インフルエンサーが見つかりません");
  }

  return {
    information: influencer.information
      ? {
          firstName: influencer.information.firstName,
          lastName: influencer.information.lastName,
          firstNameKana: influencer.information.firstNameKana,
          lastNameKana: influencer.information.lastNameKana,
          displayName: influencer.information.displayName,
          birthday: influencer.information.birthday.toISOString().split("T")[0],
          gender: influencer.information.gender,
          email: influencer.information.email,
          phone: influencer.information.phone,
        }
      : null,
    address: influencer.address
      ? {
          postalCode: influencer.address.postalCode,
          prefecture: influencer.address.prefecture,
          city: influencer.address.city,
          town: influencer.address.town,
          street: influencer.address.street,
          building: influencer.address.building ?? undefined,
        }
      : null,
    sns: influencer.sns
      ? {
          instagramName: influencer.sns.instagramName,
          instagramFollowers: influencer.sns.instagramFollowers ?? undefined,
          youtubeName: influencer.sns.youtubeName,
          youtubeFollowers: influencer.sns.youtubeFollowers ?? undefined,
          tiktokName: influencer.sns.tiktokName,
          tiktokFollowers: influencer.sns.tiktokFollowers ?? undefined,
          xName: influencer.sns.xName,
          xFollowers: influencer.sns.xFollowers ?? undefined,
        }
      : null,
    work: influencer.work
      ? {
          postFee: influencer.work.postFee ?? undefined,
          videoFee: influencer.work.videoFee ?? undefined,
          liveFee: influencer.work.liveFee ?? undefined,
          eventFee: influencer.work.eventFee ?? undefined,
          workTypes: influencer.work.workTypes,
          regions: influencer.work.regions,
          ngProducts: influencer.work.ngProducts,
          ngCompanies: influencer.work.ngCompanies,
          ngOther: influencer.work.ngOther ?? undefined,
          prResults: influencer.work.prResults.map((result) => ({
            company: result.company,
            content: result.content,
            year: result.year,
            month: result.month,
          })),
        }
      : null,
  };
});
