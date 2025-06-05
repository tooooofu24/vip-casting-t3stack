import type { Prisma } from "@/lib/prisma/generated";
import { faker } from "@faker-js/faker/locale/ja";

interface SnsData {
  instagramName?: string;
  instagramFollowers?: number;
  youtubeName?: string;
  youtubeFollowers?: number;
  tiktokName?: string;
  tiktokFollowers?: number;
  xName?: string;
  xFollowers?: number;
}

function createSnsData(): SnsData {
  const platforms = ["instagram", "youtube", "tiktok", "x"] as const;
  const activePlatforms = faker.helpers.arrayElements(platforms, {
    min: 1,
    max: 3,
  });

  const snsData: SnsData = {};

  activePlatforms.forEach((platform) => {
    switch (platform) {
      case "instagram":
        snsData.instagramName = `@${faker.internet.username()}`;
        snsData.instagramFollowers = faker.number.int({
          min: 1000,
          max: 500000,
        });
        break;
      case "youtube":
        snsData.youtubeName = faker.internet.username() + "チャンネル";
        snsData.youtubeFollowers = faker.number.int({ min: 500, max: 200000 });
        break;
      case "tiktok":
        snsData.tiktokName = `@${faker.internet.username()}`;
        snsData.tiktokFollowers = faker.number.int({ min: 2000, max: 1000000 });
        break;
      case "x":
        snsData.xName = `@${faker.internet.username()}`;
        snsData.xFollowers = faker.number.int({ min: 500, max: 100000 });
        break;
    }
  });

  return snsData;
}

export function influencerSnsFactory(): Prisma.InfluencerSnsCreateWithoutInfluencerInput {
  const snsData = createSnsData();

  return {
    instagramName: snsData.instagramName ?? null,
    instagramFollowers: snsData.instagramFollowers ?? null,
    youtubeName: snsData.youtubeName ?? null,
    youtubeFollowers: snsData.youtubeFollowers ?? null,
    tiktokName: snsData.tiktokName ?? null,
    tiktokFollowers: snsData.tiktokFollowers ?? null,
    xName: snsData.xName ?? null,
    xFollowers: snsData.xFollowers ?? null,
  };
}
