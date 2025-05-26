import { PREFECTURES } from "@/const/prefectures";
import { z } from "@/lib/zod";

// 会社基本情報
export const companyRegisterInformationSchema = z.object({
  companyName: z.string().min(1),
  clientName: z.string().min(1),
  corporateNumber: z
    .string()
    .min(1)
    .regex(/^\d{13}$/, "13桁の数字で入力してください"),
  ceoName: z.string().min(1),
  establishedAt: z
    .string()
    .min(1)
    .regex(/^\d{4}-\d{2}-\d{2}$/),
  capital: z.number().min(1).int().positive(),
  numberOfEmployees: z.number().min(1).int().positive(),
  industry: z.string().min(1),
  websiteUrl: z.string().min(1).url(),
});
export type CompanyRegisterInformationInput = z.infer<
  typeof companyRegisterInformationSchema
>;

// 会社基本情報のデフォルト値モック
export const companyRegisterInformationDefaultValues: CompanyRegisterInformationInput =
  {
    companyName: "株式会社サンプル",
    clientName: "サンプルブランド",
    corporateNumber: "1234567890123",
    ceoName: "山田太郎",
    establishedAt: "2000-04-01",
    capital: 10000000,
    numberOfEmployees: 50,
    industry: "it",
    websiteUrl: "https://www.example.com",
  };

// 所在地情報
export const companyRegisterAddressSchema = z.object({
  postalCode: z
    .string()
    .min(1)
    .regex(/^\d{3}-?\d{4}$/),
  prefecture: z.enum(PREFECTURES),
  city: z.string().min(1),
  town: z.string().min(1),
  street: z.string().min(1),
  building: z.string().optional(),
});
export type CompanyRegisterAddressInput = z.infer<
  typeof companyRegisterAddressSchema
>;

// 所在地情報のデフォルト値
export const companyRegisterAddressDefaultValues: CompanyRegisterAddressInput =
  {
    postalCode: "100-0001",
    prefecture: "東京都",
    city: "千代田区",
    town: "千代田",
    street: "1-1",
    building: "千代田ビル302",
  };

// ビジネス情報
export const companyRegisterBusinessSchema = z.object({
  contactName: z.string().min(1),
  department: z.string().min(1),
  position: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().min(1),
  minBudget: z.string().min(1),
  maxBudget: z.string().min(1),
  ageGroups: z.array(z.string()).min(1),
  gender: z.string().min(1),
  regions: z.array(z.string()).min(1),
  genres: z.array(z.string()).min(1),
  objectives: z.array(z.string()).min(1),
  pastExperience: z.string().optional(),
  productDescription: z.string().optional(),
});
export type CompanyRegisterBusinessInput = z.infer<
  typeof companyRegisterBusinessSchema
>;

// ビジネス情報のデフォルト値
export const companyRegisterBusinessDefaultValues: CompanyRegisterBusinessInput =
  {
    contactName: "山田花子",
    department: "マーケティング部",
    position: "マネージャー",
    phone: "03-1234-5678",
    email: "hanako@example.com",
    minBudget: "30000",
    maxBudget: "100000",
    ageGroups: ["20s"],
    gender: "female",
    regions: ["kanto"],
    genres: ["beauty"],
    objectives: ["awareness"],
    pastExperience: "2023年にInstagramキャンペーンを実施",
    productDescription: "新商品コスメのPR",
  };

// 支払い情報
export const companyRegisterPaymentSchema = z.object({
  bankName: z.string().min(1),
  branchName: z.string().min(1),
  accountType: z.string().min(1),
  accountNumber: z.string().min(1),
  accountHolder: z.string().min(1),
  billingPostalCode: z.string().min(1),
  billingPrefecture: z.string().min(1),
  billingCity: z.string().min(1),
  billingAddress: z.string().min(1),
  billingBuilding: z.string().optional(),
  billingContactName: z.string().min(1),
  purpose: z.string().optional(),
  note: z.string().optional(),
});
export type CompanyRegisterPaymentInput = z.infer<
  typeof companyRegisterPaymentSchema
>;

// 支払い情報のデフォルト値
export const companyRegisterPaymentDefaultValues: CompanyRegisterPaymentInput =
  {
    bankName: "みずほ銀行",
    branchName: "新宿支店",
    accountType: "ordinary",
    accountNumber: "1234567",
    accountHolder: "ヤマダハナコ",
    billingPostalCode: "100-0001",
    billingPrefecture: "東京都",
    billingCity: "千代田区",
    billingAddress: "1-1",
    billingBuilding: "千代田ビル302",
    billingContactName: "山田花子",
    purpose: "",
    note: "",
  };

// 全体スキーマ
export const companyRegisterSchema = companyRegisterInformationSchema
  .merge(companyRegisterAddressSchema)
  .merge(companyRegisterBusinessSchema)
  .merge(companyRegisterPaymentSchema);
export type CompanyRegisterInput = z.infer<typeof companyRegisterSchema>;
