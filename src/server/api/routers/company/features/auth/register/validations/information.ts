import { industryValues } from "@/const/industry";
import { z } from "@/lib/zod";

export const companyInformationSchema = z.object({
  companyName: z.string().min(1).max(255),
  displayName: z.string().min(1).max(255),
  corporateNumber: z
    .string()
    .min(1)
    .max(13)
    .regex(/^\d{13}$/, "13桁の数字で入力してください"),
  ceoName: z.string().min(1).max(100),
  establishedAt: z
    .string()
    .min(1)
    .regex(/^\d{4}-\d{2}-\d{2}$/),
  capital: z.number().min(1).int().positive(),
  numberOfEmployees: z.number().min(1).int().positive(),
  industry: z.enum(industryValues),
  websiteUrl: z.string().min(1).max(255).url(),
  purpose: z.string().optional(),
  note: z.string().optional(),
});

export type CompanyInformationRequest = z.infer<
  typeof companyInformationSchema
>;

export const companyInformationDefaultValues: CompanyInformationRequest = {
  companyName: "株式会社サンプル",
  displayName: "サンプルブランド",
  corporateNumber: "1234567890123",
  ceoName: "山田太郎",
  establishedAt: "2000-04-01",
  capital: 10000000,
  numberOfEmployees: 50,
  industry: "IT",
  websiteUrl: "https://www.example.com",
  purpose: undefined,
  note: undefined,
};
