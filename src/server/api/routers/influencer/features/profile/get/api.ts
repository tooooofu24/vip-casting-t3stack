import { influencerProcedure } from "@/server/api/procedures";

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
          building: influencer.address.building,
        }
      : null,
    sns: influencer.sns
      ? {
          instagramName: influencer.sns.instagramName,
          instagramFollowers: influencer.sns.instagramFollowers,
          youtubeName: influencer.sns.youtubeName,
          youtubeFollowers: influencer.sns.youtubeFollowers,
          tiktokName: influencer.sns.tiktokName,
          tiktokFollowers: influencer.sns.tiktokFollowers,
          xName: influencer.sns.xName,
          xFollowers: influencer.sns.xFollowers,
        }
      : null,
    work: influencer.work
      ? {
          postFee: influencer.work.postFee,
          videoFee: influencer.work.videoFee,
          liveFee: influencer.work.liveFee,
          eventFee: influencer.work.eventFee,
          workTypes: influencer.work.workTypes,
          regions: influencer.work.regions,
          ngProducts: influencer.work.ngProducts,
          ngCompanies: influencer.work.ngCompanies,
          ngOther: influencer.work.ngOther,
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