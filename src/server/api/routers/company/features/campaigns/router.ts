import { createCampaign } from "@/server/api/routers/company/features/campaigns/create/api";
import { getCampaigns } from "@/server/api/routers/company/features/campaigns/get/api";
import { getCampaignById } from "@/server/api/routers/company/features/campaigns/getById/api";
import { updateCampaign } from "@/server/api/routers/company/features/campaigns/update/api";
import { createTRPCRouter } from "@/server/api/trpc";

export const campaignsRouter = createTRPCRouter({
  create: createCampaign,
  get: getCampaigns,
  getById: getCampaignById,
  update: updateCampaign,
});
