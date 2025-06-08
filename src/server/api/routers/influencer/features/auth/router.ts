import { login } from "@/server/api/routers/influencer/features/auth/login/api";
import { register } from "@/server/api/routers/influencer/features/auth/register/api";
import { createTRPCRouter } from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
  login,
  register,
});
