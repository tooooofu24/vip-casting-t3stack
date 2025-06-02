import { regionValues } from "@/const/region";
import { workTypeValues } from "@/const/workType";
import { Region, WorkType } from "@/lib/prisma/generated";
import { z } from "@/lib/zod";

export const influencerWorkSchema = z.object({
  postFee: z.number().optional(),
  videoFee: z.number().optional(),
  liveFee: z.number().optional(),
  eventFee: z.number().optional(),
  workTypes: z.array(z.enum(workTypeValues)).optional(),
  regions: z.array(z.enum(regionValues)).optional(),
  ngProducts: z.array(z.string()).optional(),
  ngCompanies: z.array(z.string()).optional(),
  ngOther: z.string().optional(),
  prResults: z
    .array(
      z.object({
        company: z.string().min(1),
        content: z.string().min(1),
        year: z.string().min(1),
        month: z.string().min(1),
      }),
    )
    .optional(),
});

export type InfluencerWorkRequest = z.infer<typeof influencerWorkSchema>;

export const influencerWorkDefaultValues: InfluencerWorkRequest = {
  postFee: 30000,
  videoFee: 50000,
  liveFee: 100000,
  eventFee: 150000,
  workTypes: [WorkType.POST],
  regions: [Region.ALL],
  ngProducts: ["タバコ"],
  ngCompanies: ["〇〇株式会社"],
  ngOther: "マッチング成立前の名前開示NG",
  prResults: [
    {
      company: "サンプル株式会社",
      content: "SNS投稿によるPR",
      year: "2023",
      month: "10",
    },
  ],
};
