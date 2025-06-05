import type { Prisma } from "@/lib/prisma/generated";
import { CampaignStatus, Platform, RewardType } from "@/lib/prisma/generated";
import { faker } from "@faker-js/faker/locale/ja";

const REQUIREMENTS = [
  "フォロワー1万人以上",
  "美容系ジャンル",
  "関東圏在住",
  "20代〜30代女性",
  "投稿頻度週3回以上",
  "企業コラボ経験あり",
  "ファッション系ジャンル",
  "グルメ系ジャンル",
  "ライフスタイル系ジャンル",
];

const TITLES = [
  "新作コスメのPRキャンペーン",
  "ファッションブランドコラボ",
  "グルメレビュー企画",
  "ライフスタイル商品紹介",
  "美容アイテム体験レポート",
  "ファッション着回し企画",
  "スイーツレビュー",
  "健康食品モニター",
];

export function campaignFactory(
  companyId: string,
): Prisma.CampaignUncheckedCreateInput {
  const rewardType = faker.helpers.enumValue(RewardType);

  return {
    title: faker.helpers.arrayElement(TITLES),
    description: faker.lorem.paragraph(),
    platform: faker.helpers.enumValue(Platform),
    recruitment: faker.number.int({ min: 1, max: 20 }),
    rewardType: faker.helpers.enumValue(RewardType),
    rewardAmount:
      rewardType === RewardType.FIXED
        ? faker.number.int({ min: 10000, max: 500000 })
        : faker.number.int({ min: 1, max: 10 }),
    status: faker.helpers.enumValue(CampaignStatus),
    requirements: faker.helpers.arrayElements(REQUIREMENTS, {
      min: 1,
      max: 4,
    }),
    note: faker.helpers.maybe(() => faker.lorem.sentence(), {
      probability: 0.7,
    }),
    applicationDue: faker.date.soon({ days: 30 }),
    postDue: faker.date.soon({ days: 30 }),
    companyId,
  };
}
