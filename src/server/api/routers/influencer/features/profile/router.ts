import { createTRPCRouter } from "@/server/api/trpc";
import { getProfile } from "./get/api";

export const profileRouter = createTRPCRouter({
  get: getProfile,
});