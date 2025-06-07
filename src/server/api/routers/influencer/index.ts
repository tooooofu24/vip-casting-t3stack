import { register } from "@/server/api/routers/influencer/features/register";
import { getCampaigns } from "@/server/api/routers/influencer/features/campaigns";
import { createTRPCRouter } from "@/server/api/trpc";

export const influencerRouter = createTRPCRouter({
  register,
  campaigns: createTRPCRouter({
    getCampaigns,
  }),
});
