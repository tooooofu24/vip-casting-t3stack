import { register } from "@/server/api/routers/influencer/features/register";
import { createTRPCRouter } from "@/server/api/trpc";

export const influencerRouter = createTRPCRouter({
  register,
});
