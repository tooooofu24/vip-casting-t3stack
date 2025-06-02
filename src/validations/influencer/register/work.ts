import { z } from "@/lib/zod";

export const workTypeOptions = [
  "投稿作成",
  "動画制作",
  "ライブ配信",
  "イベント出演",
  "アンバサダー",
  "モデル撮影",
  "レビュー記事",
] as const;

export const areaOptions = [
  "全国対応可",
  "関東エリア",
  "関西エリア",
  "東海エリア",
  "北海道",
  "東北",
  "中国",
  "四国",
  "九州",
  "オンラインのみ",
] as const;

export const influencerWorkSchema = z.object({
  postFee: z.number().optional(),
  videoFee: z.number().optional(),
  liveFee: z.number().optional(),
  eventFee: z.number().optional(),
  workTypes: z.array(z.enum(workTypeOptions)).optional(),
  areas: z.array(z.enum(areaOptions)).optional(),
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
  workTypes: [workTypeOptions[0]],
  areas: [areaOptions[0]],
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
