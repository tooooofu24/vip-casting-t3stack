import { forget } from "@/server/api/routers/company/features/password/forget/api";
import { createTRPCRouter } from "@/server/api/trpc";

export const passwordRouter = createTRPCRouter({
  forget,
});
