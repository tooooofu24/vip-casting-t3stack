import { signUp } from "@/server/api/routers/admin/features/auth/signUp/api";
import { createTRPCRouter } from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
  signUp,
});
