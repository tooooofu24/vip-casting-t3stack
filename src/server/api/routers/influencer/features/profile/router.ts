import { createTRPCRouter } from "@/server/api/trpc";
import { getProfile } from "@/server/api/routers/influencer/features/profile/get/api";
import { updateInformation } from "@/server/api/routers/influencer/features/profile/information/update/api";

export const profileRouter = createTRPCRouter({
  get: getProfile,
  updateInformation: updateInformation,
});
