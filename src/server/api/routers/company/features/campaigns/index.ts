import { createCampaign } from "@/server/api/routers/company/features/campaigns/create";
import { createTRPCRouter } from "@/server/api/trpc";

export const campaignsRouter = createTRPCRouter({
  create: createCampaign,
});
