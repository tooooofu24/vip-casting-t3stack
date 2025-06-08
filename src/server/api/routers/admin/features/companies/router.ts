import { approve } from "@/server/api/routers/admin/features/companies/approve/api";
import { get } from "@/server/api/routers/admin/features/companies/get/api";
import { createTRPCRouter } from "@/server/api/trpc";

export const companiesRouter = createTRPCRouter({
  get,
  approve,
});
