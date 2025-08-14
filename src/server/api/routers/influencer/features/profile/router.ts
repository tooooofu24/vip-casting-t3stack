import { createTRPCRouter } from "@/server/api/trpc";
import { getProfile } from "@/server/api/routers/influencer/features/profile/get/api";
import { updateInformation } from "@/server/api/routers/influencer/features/profile/information/update/api";
import { updateAddress } from "@/server/api/routers/influencer/features/profile/address/update/api";
import { updateSns } from "@/server/api/routers/influencer/features/profile/sns/update/api";

export const profileRouter = createTRPCRouter({
  get: getProfile,
  updateInformation: updateInformation,
  updateAddress: updateAddress,
  updateSns: updateSns,
});
