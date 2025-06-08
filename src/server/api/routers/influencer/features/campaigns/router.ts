import { getCampaigns } from "@/server/api/routers/influencer/features/campaigns/getCampaigns";
import { createTRPCRouter } from "@/server/api/trpc";

export const campaignRouter = createTRPCRouter({
  getCampaigns,
});
