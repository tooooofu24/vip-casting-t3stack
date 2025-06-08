import { authRouter } from "@/server/api/routers/company/features/auth/router";
import { campaignsRouter } from "@/server/api/routers/company/features/campaigns/router";
import { passwordRouter } from "@/server/api/routers/company/features/password/router";
import { createTRPCRouter } from "@/server/api/trpc";

export const companyRouter = createTRPCRouter({
  auth: authRouter,
  campaigns: campaignsRouter,
  password: passwordRouter,
});
