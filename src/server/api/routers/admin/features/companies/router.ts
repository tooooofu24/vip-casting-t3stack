import { approve } from "@/server/api/routers/admin/features/companies/approve";
import { getUnapproved } from "@/server/api/routers/admin/features/companies/getUnapproved";
import { createTRPCRouter } from "@/server/api/trpc";

export const companiesRouter = createTRPCRouter({
  getUnapproved,
  approve,
});
