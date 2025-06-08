import { authRouter } from "@/server/api/routers/admin/features/auth/router";
import { companiesRouter } from "@/server/api/routers/admin/features/companies/router";
import { influencersRouter } from "@/server/api/routers/admin/features/influencers/router";
import { createTRPCRouter } from "@/server/api/trpc";

export const adminRouter = createTRPCRouter({
  auth: authRouter,
  companies: companiesRouter,
  influencers: influencersRouter,
});
