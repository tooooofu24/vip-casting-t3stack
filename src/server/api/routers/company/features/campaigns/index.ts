import { createCampaign } from "@/server/api/routers/company/features/campaigns/create";
import { getCampaigns } from "@/server/api/routers/company/features/campaigns/getCampaigns";
import { createTRPCRouter } from "@/server/api/trpc";

export const campaignsRouter = createTRPCRouter({
  create: createCampaign,
  get: getCampaigns,
});
