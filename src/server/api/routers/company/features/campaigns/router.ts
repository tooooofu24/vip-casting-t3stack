import { createCampaign } from "@/server/api/routers/company/features/campaigns/create";
import { getCampaigns } from "@/server/api/routers/company/features/campaigns/get";
import { getCampaignById } from "@/server/api/routers/company/features/campaigns/getById";
import { updateCampaign } from "@/server/api/routers/company/features/campaigns/update";
import { createTRPCRouter } from "@/server/api/trpc";

export const campaignsRouter = createTRPCRouter({
  create: createCampaign,
  get: getCampaigns,
  getById: getCampaignById,
  update: updateCampaign,
});
