import { regionValues } from "@/const/region";
import { workTypeValues } from "@/const/workType";
import { Region, WorkType } from "@/lib/prisma/generated";
import { z } from "@/lib/zod";
import type { DefaultValues } from "react-hook-form";

export const prResultSchema = z.object({
  company: z.string().min(1).max(255),
  content: z.string().min(1).max(1000),
  year: z
    .string()
    .length(4)
    .regex(/^\d{4}$/),
  month: z
    .string()
    .length(2)
    .regex(/^(0[1-9]|1[0-2])$/),
});

export type PrResultRequest = z.infer<typeof prResultSchema>;

export const influencerWorkSchema = z.object({
  postFee: z.number().int().min(0).optional(),
  videoFee: z.number().int().min(0).optional(),
  liveFee: z.number().int().min(0).optional(),
  eventFee: z.number().int().min(0).optional(),
  workTypes: z.array(z.enum(workTypeValues)).min(1),
  regions: z.array(z.enum(regionValues)).min(1),
  ngProducts: z.array(z.string()).optional(),
  ngCompanies: z.array(z.string()).optional(),
  ngOther: z.string().max(1000).optional(),
  prResults: z.array(prResultSchema).max(10).optional(),
});

export type InfluencerWorkRequest = z.infer<typeof influencerWorkSchema>;

export const influencerWorkDefaultValues: DefaultValues<InfluencerWorkRequest> =
  {
    postFee: 30000,
    videoFee: 50000,
    liveFee: 100000,
    eventFee: 150000,
    workTypes: [WorkType.POST, WorkType.VIDEO],
    regions: [Region.KANTO, Region.KANSAI],
    ngProducts: ["タバコ", "ギャンブル"],
    ngCompanies: ["競合他社A"],
    ngOther: "深夜の撮影はNGです。",
    prResults: [
      {
        company: "資生堂",
        content:
          "新作スキンケア商品のPR投稿を担当。Instagramでのレビュー投稿で1万件以上のいいねを獲得。",
        year: "2023",
        month: "11",
      },
      {
        company: "ユニクロ",
        content: "YouTubeでコーディネート紹介動画を制作。再生回数5万回突破。",
        year: "2022",
        month: "09",
      },
    ],
  };
