import { approve } from "@/server/api/routers/admin/features/companies/approve/api";
import { getUnapproved } from "@/server/api/routers/admin/features/companies/getUnapproved/api";
import { createTRPCRouter } from "@/server/api/trpc";

export const companiesRouter = createTRPCRouter({
  getUnapproved,
  approve,
});
