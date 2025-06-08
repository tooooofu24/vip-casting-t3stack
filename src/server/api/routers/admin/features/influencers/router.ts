import { approve } from "@/server/api/routers/admin/features/influencers/approve";
import { getUnapproved } from "@/server/api/routers/admin/features/influencers/getUnapproved";
import { createTRPCRouter } from "@/server/api/trpc";

export const influencersRouter = createTRPCRouter({
  getUnapproved,
  approve,
});
