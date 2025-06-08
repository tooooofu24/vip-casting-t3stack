import { accountTypeValues } from "@/const/accountType";
import { prefectureValues } from "@/const/prefecture";
import { AccountType, Prefecture } from "@/lib/prisma/generated";
import { z } from "@/lib/zod";

export const companyPaymentSchema = z.object({
  bankName: z.string().min(1).max(100),
  branchName: z.string().min(1).max(100),
  accountType: z.enum(accountTypeValues),
  accountNumber: z.string().min(1).max(20),
  accountHolder: z.string().min(1).max(100),
  billingPostalCode: z
    .string()
    .min(1)
    .max(7)
    .regex(/^[\d]{7}$/),
  billingPrefecture: z.enum(prefectureValues),
  billingCity: z.string().min(1).max(100),
  billingAddress: z.string().min(1).max(255),
  billingBuilding: z.string().max(100).optional(),
  billingContactName: z.string().min(1).max(100),
});

export type CompanyPaymentRequest = z.infer<typeof companyPaymentSchema>;

export const companyPaymentDefaultValues: CompanyPaymentRequest = {
  bankName: "みずほ銀行",
  branchName: "新宿支店",
  accountType: AccountType.NORMAL,
  accountNumber: "1234567",
  accountHolder: "ヤマダハナコ",
  billingPostalCode: "1000001",
  billingPrefecture: Prefecture.TOKYO,
  billingCity: "千代田区",
  billingAddress: "1-1",
  billingBuilding: "千代田ビル302",
  billingContactName: "山田花子",
};
