import { campaignsRouter } from "@/server/api/routers/company/features/campaigns/router";
import { register } from "@/server/api/routers/company/features/register";
import { createTRPCRouter } from "@/server/api/trpc";

export const companyRouter = createTRPCRouter({
  register,
  campaigns: campaignsRouter,
});
