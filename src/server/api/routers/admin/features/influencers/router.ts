import { approve } from "@/server/api/routers/admin/features/influencers/approve/api";
import { getUnapproved } from "@/server/api/routers/admin/features/influencers/getUnapproved/api";
import { createTRPCRouter } from "@/server/api/trpc";

export const influencersRouter = createTRPCRouter({
  getUnapproved,
  approve,
});
