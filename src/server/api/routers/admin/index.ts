import { approveCompany } from "@/server/api/routers/admin/features/approveCompany";
import { approveInfluencer } from "@/server/api/routers/admin/features/approveInfluencer";
import { getUnapprovedCompanies } from "@/server/api/routers/admin/features/getUnapprovedCompanies";
import { getUnapprovedInfluencers } from "@/server/api/routers/admin/features/getUnapprovedInfluencers";
import { signUp } from "@/server/api/routers/admin/features/signUp";
import { createTRPCRouter } from "@/server/api/trpc";

export const adminRouter = createTRPCRouter({
  signUp,
  getUnapprovedCompanies,
  approveCompany,
  getUnapprovedInfluencers,
  approveInfluencer,
});
