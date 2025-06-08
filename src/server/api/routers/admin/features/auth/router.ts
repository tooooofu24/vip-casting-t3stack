import { signUp } from "@/server/api/routers/admin/features/auth";
import { createTRPCRouter } from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
  signUp,
});
