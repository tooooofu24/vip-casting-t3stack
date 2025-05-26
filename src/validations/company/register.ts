import { ageGroupValues } from "@/const/ageGroup";
import { genreValues } from "@/const/genre";
import { industryValues } from "@/const/industry";
import { objectiveValues } from "@/const/objective";
import { prefectureValues } from "@/const/prefecture";
import { regionValues } from "@/const/region";
import { z } from "@/lib/zod";
import { Prefecture } from "@prisma/client";

// 会社基本情報
export const companyInformationSchema = z.object({
  companyName: z.string().min(1).max(255),
  displayName: z.string().min(1).max(255),
  corporateNumber: z
    .string()
    .min(1)
    .max(13)
    .regex(/^[0-9]{13}$/, "13桁の数字で入力してください"),
  ceoName: z.string().min(1).max(100),
  establishedAt: z
    .string()
    .min(1)
    .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/),
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

// 会社基本情報のデフォルト値モック
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
  purpose: "",
  note: "",
};

// 所在地情報
export const companyAddressSchema = z.object({
  postalCode: z
    .string()
    .min(1)
    .max(7)
    .regex(/^\d{7}$/),
  prefecture: z.enum(prefectureValues),
  city: z.string().min(1).max(255),
  town: z.string().min(1).max(255),
  street: z.string().min(1).max(255),
  building: z.string().max(100).optional(),
});
export type CompanyAddressRequest = z.infer<typeof companyAddressSchema>;

// 所在地情報のデフォルト値
export const companyAddressDefaultValues: CompanyAddressRequest = {
  postalCode: "1000001",
  prefecture: Prefecture.TOKYO,
  city: "千代田区",
  town: "千代田",
  street: "1-1",
  building: "千代田ビル302",
};

// ビジネス情報
export const companyBusinessSchema = z.object({
  contactName: z.string().min(1).max(100),
  department: z.string().min(1).max(100),
  position: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().min(1).max(255),
  minBudget: z.string().min(1),
  maxBudget: z.string().min(1),
  ageGroups: z.array(z.enum(ageGroupValues)).min(1),
  gender: z.string().min(1).max(10),
  regions: z.array(z.enum(regionValues)).min(1),
  genres: z.array(z.enum(genreValues)).min(1),
  objectives: z.array(z.enum(objectiveValues)).min(1),
  pastExperience: z.string().optional(),
  productDescription: z.string().optional(),
});
export type CompanyBusinessRequest = z.infer<typeof companyBusinessSchema>;

// ビジネス情報のデフォルト値
export const companyBusinessDefaultValues: CompanyBusinessRequest = {
  contactName: "山田花子",
  department: "マーケティング部",
  position: "マネージャー",
  phone: "03-1234-5678",
  email: "hanako@example.com",
  minBudget: "30000",
  maxBudget: "100000",
  ageGroups: ["EARLY_20S"],
  gender: "female",
  regions: ["KANTO"],
  genres: ["BEAUTY"],
  objectives: ["AWARENESS"],
  pastExperience: "2023年にInstagramキャンペーンを実施",
  productDescription: "新商品コスメのPR",
};

// 支払い情報
export const companyPaymentSchema = z.object({
  bankName: z.string().min(1).max(100),
  branchName: z.string().min(1).max(100),
  accountType: z.string().min(1).max(20),
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

// 支払い情報のデフォルト値
export const companyPaymentDefaultValues: CompanyPaymentRequest = {
  bankName: "みずほ銀行",
  branchName: "新宿支店",
  accountType: "ordinary",
  accountNumber: "1234567",
  accountHolder: "ヤマダハナコ",
  billingPostalCode: "1000001",
  billingPrefecture: Prefecture.TOKYO,
  billingCity: "千代田区",
  billingAddress: "1-1",
  billingBuilding: "千代田ビル302",
  billingContactName: "山田花子",
};

// 全体スキーマ
export const companySchema = z.object({
  information: companyInformationSchema,
  address: companyAddressSchema,
  business: companyBusinessSchema,
  payment: companyPaymentSchema,
});

export type CompanyRequest = z.infer<typeof companySchema>;
