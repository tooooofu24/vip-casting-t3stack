import { forget } from "@/server/api/routers/influencer/features/password/forget/api";
import { createTRPCRouter } from "@/server/api/trpc";

export const passwordRouter = createTRPCRouter({
  forget,
});
