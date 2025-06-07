import { authRouter } from "@/server/api/routers/admin/features/auth";
import { companiesRouter } from "@/server/api/routers/admin/features/companies";
import { influencersRouter } from "@/server/api/routers/admin/features/influencers";
import { createTRPCRouter } from "@/server/api/trpc";

export const adminRouter = createTRPCRouter({
  auth: authRouter,
  companies: companiesRouter,
  influencers: influencersRouter,
});
