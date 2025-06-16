import { getCampaigns } from "@/server/api/routers/influencer/features/campaigns/get/api";
import { getCampaignById } from "@/server/api/routers/influencer/features/campaigns/getById/api";
import { createTRPCRouter } from "@/server/api/trpc";

export const campaignRouter = createTRPCRouter({
  getCampaigns,
  getCampaignById,
});
