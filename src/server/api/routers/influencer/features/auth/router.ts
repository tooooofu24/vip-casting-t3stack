import { register } from "@/server/api/routers/influencer/features/auth/register/api";
import { createTRPCRouter } from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
  register,
});
