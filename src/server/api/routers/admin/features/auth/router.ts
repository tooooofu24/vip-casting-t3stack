import { login } from "@/server/api/routers/admin/features/auth/login/api";
import { createTRPCRouter } from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
  login,
});
