import { approve } from "@/server/api/routers/admin/features/influencers/approve/api";
import { get } from "@/server/api/routers/admin/features/influencers/get/api";
import { createTRPCRouter } from "@/server/api/trpc";

export const influencersRouter = createTRPCRouter({
  get,
  approve,
});
