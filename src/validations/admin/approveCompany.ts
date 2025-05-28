import { z } from "@/lib/zod";

// 会社承認用バリデーションスキーマ
export const approveCompanySchema = z.object({
  companyId: z.string().min(1),
});

export type ApproveCompanyRequest = z.infer<typeof approveCompanySchema>;
