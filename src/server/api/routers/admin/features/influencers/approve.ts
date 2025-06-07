import { env } from "@/env";
import { createSupabaseAdminClient } from "@/lib/supabase/serverClient";
import { adminProcedure } from "@/server/api/trpc";
import { approveInfluencerSchema } from "@/validations/admin/influencers";
import { TRPCError } from "@trpc/server";
import type { Route } from "next";

export const approve = adminProcedure
  .input(approveInfluencerSchema)
  .mutation(async ({ ctx, input }) => {
    // インフルエンサー情報取得・承認
    const influencer = await ctx.db.influencer.findUnique({
      where: { id: input.influencerId },
      include: {
        information: true,
        address: true,
        sns: true,
        work: {
          include: {
            prResults: true,
          },
        },
      },
    });

    if (!influencer) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "インフルエンサーが見つかりません。",
      });
    }

    if (!influencer.information) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "インフルエンサー情報がありません。",
      });
    }
    if (!influencer.address) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "インフルエンサー住所情報がありません。",
      });
    }
    if (!influencer.sns) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "インフルエンサーSNS情報がありません。",
      });
    }
    if (!influencer.work) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "インフルエンサー職務情報がありません。",
      });
    }

    // Supabaseユーザー招待
    const supabase = await createSupabaseAdminClient();
    const route: Route = "/set-session";
    const { error: authError } = await supabase.auth.admin.inviteUserByEmail(
      influencer.information.email,
      {
        redirectTo: `${env.NEXT_PUBLIC_APP_URL}${route}`,
        data: {
          role: "influencer",
          displayName: influencer.information.displayName,
        },
      },
    );

    if (authError) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "ユーザー招待に失敗しました。",
      });
    }

    // インフルエンサーを承認
    const updatedInfluencer = await ctx.db.influencer.update({
      where: { id: input.influencerId },
      data: { isApproved: true },
    });

    return updatedInfluencer;
  });
