import { authRouter } from "@/server/api/routers/influencer/features/auth/router";
import { campaignRouter } from "@/server/api/routers/influencer/features/campaigns/router";
import { passwordRouter } from "@/server/api/routers/influencer/features/password/router";
import { profileRouter } from "@/server/api/routers/influencer/features/profile/router";
import { avatarRouter } from "@/server/api/routers/influencer/features/avatar/router";
import { messagesRouter } from "@/server/api/routers/influencer/features/messages/router";
import { createTRPCRouter } from "@/server/api/trpc";

export const influencerRouter = createTRPCRouter({
  auth: authRouter,
  password: passwordRouter,
  campaigns: campaignRouter,
  profile: profileRouter,
  avatar: avatarRouter,
  messages: messagesRouter,
});
