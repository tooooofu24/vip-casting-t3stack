import { approveCompany } from "@/server/api/routers/admin/features/approveCompany";
import { getUnapprovedCompanies } from "@/server/api/routers/admin/features/getUnapprovedCompanies";
import { signUp } from "@/server/api/routers/admin/features/signUp";
import { createTRPCRouter } from "@/server/api/trpc";

export const adminRouter = createTRPCRouter({
  signUp,
  getUnapprovedCompanies,
  approveCompany,
});
