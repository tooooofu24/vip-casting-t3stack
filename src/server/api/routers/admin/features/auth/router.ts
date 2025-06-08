import { login } from "@/server/api/routers/admin/features/auth/login/api";
import { signUp } from "@/server/api/routers/admin/features/auth/signUp/api";
import { createTRPCRouter } from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
  login,
  signUp,
});
