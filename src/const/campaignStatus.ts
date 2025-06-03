import { CampaignStatus } from "@/lib/prisma/generated";

export const campaignStatusValues = [
  CampaignStatus.DRAFT,
  CampaignStatus.RECRUITING,
  CampaignStatus.IN_PROGRESS,
  CampaignStatus.COMPLETED,
  CampaignStatus.CANCELLED,
] as const;

const campaignStatusLabels = {
  [CampaignStatus.DRAFT]: "下書き",
  [CampaignStatus.RECRUITING]: "募集中",
  [CampaignStatus.IN_PROGRESS]: "進行中",
  [CampaignStatus.COMPLETED]: "完了",
  [CampaignStatus.CANCELLED]: "キャンセル",
} satisfies Record<CampaignStatus, string>;

export const campaignStatuses = campaignStatusValues.map((value) => ({
  value,
  label: campaignStatusLabels[value],
}));
