import { platformValues } from "@/const/platform";
import { rewardTypeValues } from "@/const/rewardType";
import { z } from "@/lib/zod";

export const companyCampaignSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(2000),
  platform: z.enum(platformValues),
  recruitment: z.number().int().min(1).max(1000000),
  applicationDue: z
    .string()
    .min(1)
    .regex(/^\d{4}-\d{2}-\d{2}$/),
  postDue: z
    .string()
    .min(1)
    .regex(/^\d{4}-\d{2}-\d{2}$/),
  rewardType: z.enum(rewardTypeValues),
  rewardAmount: z.number().int().positive().max(1000000).optional(),
  requirements: z.array(z.string().max(100)).max(10).optional(),
  note: z.string().max(1000).optional(),
});

export type CompanyCampaignRequest = z.infer<typeof companyCampaignSchema>;

export const companyCampaignDefaultValues: CompanyCampaignRequest = {
  title: "新商品PRキャンペーン",
  description:
    "新発売のコスメをPRしていただく案件です。InstagramやTikTokでの投稿をお願いします。",
  platform: platformValues[0],
  recruitment: 10,
  applicationDue: "2024-07-31",
  postDue: "2024-08-15",
  rewardType: rewardTypeValues[0],
  rewardAmount: 20000,
  requirements: ["フォロワー1万人以上", "美容系アカウント歓迎"],
  note: "交通費は別途支給します。",
};
