import { authRouter } from "@/server/api/routers/influencer/features/auth";
import { campaignRouter } from "@/server/api/routers/influencer/features/campaigns";
import { register } from "@/server/api/routers/influencer/features/register";
import { createTRPCRouter } from "@/server/api/trpc";

export const influencerRouter = createTRPCRouter({
  auth: authRouter,
  campaigns: campaignRouter,
  register,
});
