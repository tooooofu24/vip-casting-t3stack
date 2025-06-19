import { CampaignStatus } from "@/lib/prisma/generated";
import type { ColorPalette } from "@chakra-ui/react";

export const campaignStatusValues = [
  CampaignStatus.PRIVATE,
  CampaignStatus.RECRUITING,
  CampaignStatus.CLOSED,
] as const;

export const campaignStatusLabels = {
  [CampaignStatus.PRIVATE]: "非公開",
  [CampaignStatus.RECRUITING]: "募集中",
  [CampaignStatus.CLOSED]: "募集完了",
} satisfies Record<CampaignStatus, string>;

export const campaignStatusColors = {
  [CampaignStatus.PRIVATE]: "gray",
  [CampaignStatus.RECRUITING]: "green",
  [CampaignStatus.CLOSED]: "blue",
} satisfies Record<CampaignStatus, ColorPalette>;

export const campaignStatuses = campaignStatusValues.map((value) => ({
  value,
  label: campaignStatusLabels[value],
  color: campaignStatusColors[value],
}));
