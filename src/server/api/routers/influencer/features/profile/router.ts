import { createTRPCRouter } from "@/server/api/trpc";
import { getProfile } from "@/server/api/routers/influencer/features/profile/get/api";

export const profileRouter = createTRPCRouter({
  get: getProfile,
});
