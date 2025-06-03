import { RewardType } from "@/lib/prisma/generated";

export const rewardTypeValues = [
  RewardType.FIXED,
  RewardType.FOLLOWER,
] as const;

const rewardTypeLabels = {
  [RewardType.FIXED]: "固定報酬",
  [RewardType.FOLLOWER]: "フォロワー単価",
} satisfies Record<RewardType, string>;

export const rewardTypes = rewardTypeValues.map((value) => ({
  value,
  label: rewardTypeLabels[value],
}));
