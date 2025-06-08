import { forget } from "@/server/api/routers/influencer/features/password/forget/api";
import { reset } from "@/server/api/routers/influencer/features/password/reset/api";
import { createTRPCRouter } from "@/server/api/trpc";

export const passwordRouter = createTRPCRouter({
  forget,
  reset,
});
