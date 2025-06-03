import { env } from "@/env";
import { createSupabaseAdminClient } from "@/lib/supabase/serverClient";
import { publicProcedure } from "@/server/api/trpc";
import { approveInfluencerSchema } from "@/validations/admin/approveInfluencer";
import { TRPCError } from "@trpc/server";
import type { Route } from "next";

export const approveInfluencer = publicProcedure
  .input(approveInfluencerSchema)
  .mutation(async ({ ctx, input }) => {
    // インフルエンサー情報取得・承認
    const influencer = await ctx.db.influencer.update({
      where: { id: input.influencerId },
      data: { isApproved: true },
      include: { information: true },
    });

    if (!influencer.information) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "インフルエンサー情報がありません。",
      });
    }

    // Supabaseユーザー招待
    const supabase = await createSupabaseAdminClient();
    const route: Route = "/set-session";
    await supabase.auth.admin.inviteUserByEmail(influencer.information.email, {
      redirectTo: `${env.NEXT_PUBLIC_APP_URL}${route}`,
      data: {
        role: "influencer",
        displayName: influencer.information.displayName,
      },
    });

    return influencer;
  });
