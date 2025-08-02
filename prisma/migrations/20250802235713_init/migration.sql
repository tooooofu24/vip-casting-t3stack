-- CreateEnum
CREATE TYPE "public"."Industry" AS ENUM ('RETAIL', 'MANUFACTURING', 'SERVICE', 'IT', 'FINANCE', 'REAL_ESTATE', 'FOOD', 'ENTERTAINMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."Prefecture" AS ENUM ('HOKKAIDO', 'AOMORI', 'IWATE', 'MIYAGI', 'AKITA', 'YAMAGATA', 'FUKUSHIMA', 'IBARAKI', 'TOCHIGI', 'GUNMA', 'SAITAMA', 'CHIBA', 'TOKYO', 'KANAGAWA', 'NIIGATA', 'TOYAMA', 'ISHIKAWA', 'FUKUI', 'YAMANASHI', 'NAGANO', 'GIFU', 'SHIZUOKA', 'AICHI', 'MIE', 'SHIGA', 'KYOTO', 'OSAKA', 'HYOGO', 'NARA', 'WAKAYAMA', 'TOTTORI', 'SHIMANE', 'OKAYAMA', 'HIROSHIMA', 'YAMAGUCHI', 'TOKUSHIMA', 'KAGAWA', 'EHIME', 'KOCHI', 'FUKUOKA', 'SAGA', 'NAGASAKI', 'KUMAMOTO', 'OITA', 'MIYAZAKI', 'KAGOSHIMA', 'OKINAWA');

-- CreateEnum
CREATE TYPE "public"."AgeGroup" AS ENUM ('TEENS', 'EARLY_20S', 'LATE_20S', 'EARLY_30S', 'LATE_30S', 'OVER_40S');

-- CreateEnum
CREATE TYPE "public"."Region" AS ENUM ('ALL', 'KANTO', 'KANSAI', 'TOKAI', 'HOKKAIDO', 'TOHOKU', 'CHUGOKU', 'SHIKOKU', 'KYUSHU', 'ONLINE');

-- CreateEnum
CREATE TYPE "public"."Genre" AS ENUM ('BEAUTY', 'FASHION', 'FOOD', 'TECH', 'LIFESTYLE', 'TRAVEL', 'FITNESS', 'ENTERTAINMENT');

-- CreateEnum
CREATE TYPE "public"."Objective" AS ENUM ('AWARENESS', 'SALES', 'BRAND', 'ENGAGEMENT', 'LEADS', 'SERVICE');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."WorkType" AS ENUM ('POST', 'VIDEO', 'LIVE', 'EVENT', 'AMBASSADOR', 'MODEL', 'REVIEW');

-- CreateEnum
CREATE TYPE "public"."Platform" AS ENUM ('INSTAGRAM', 'TIKTOK', 'YOUTUBE', 'X', 'FACEBOOK', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."RewardType" AS ENUM ('FIXED', 'FOLLOWER');

-- CreateEnum
CREATE TYPE "public"."CampaignStatus" AS ENUM ('PRIVATE', 'RECRUITING', 'CLOSED');

-- CreateEnum
CREATE TYPE "public"."AccountType" AS ENUM ('NORMAL', 'CURRENT');

-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" UUID NOT NULL,
    "supabaseId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" UUID NOT NULL,
    "supabaseId" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyInformation" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "companyName" VARCHAR(255) NOT NULL,
    "displayName" VARCHAR(255) NOT NULL,
    "corporateNumber" VARCHAR(13) NOT NULL,
    "ceoName" VARCHAR(100) NOT NULL,
    "establishedAt" TIMESTAMP(3) NOT NULL,
    "capital" INTEGER NOT NULL,
    "numberOfEmployees" INTEGER NOT NULL,
    "industry" "public"."Industry" NOT NULL,
    "websiteUrl" VARCHAR(255) NOT NULL,
    "purpose" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CompanyInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyAddress" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "postalCode" VARCHAR(7) NOT NULL,
    "prefecture" "public"."Prefecture" NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "town" VARCHAR(255) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "building" VARCHAR(100),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CompanyAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyBusiness" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "contactName" VARCHAR(100) NOT NULL,
    "department" VARCHAR(100) NOT NULL,
    "position" VARCHAR(100),
    "phone" VARCHAR(20),
    "email" VARCHAR(255) NOT NULL,
    "minBudget" INTEGER NOT NULL,
    "maxBudget" INTEGER NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "pastExperience" TEXT,
    "productDescription" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CompanyBusiness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyBusinessAgeGroup" (
    "id" UUID NOT NULL,
    "companyBusinessId" UUID NOT NULL,
    "ageGroup" "public"."AgeGroup" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CompanyBusinessAgeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyBusinessRegion" (
    "id" UUID NOT NULL,
    "companyBusinessId" UUID NOT NULL,
    "region" "public"."Region" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CompanyBusinessRegion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyBusinessGenre" (
    "id" UUID NOT NULL,
    "companyBusinessId" UUID NOT NULL,
    "genre" "public"."Genre" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CompanyBusinessGenre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyBusinessObjective" (
    "id" UUID NOT NULL,
    "companyBusinessId" UUID NOT NULL,
    "objective" "public"."Objective" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CompanyBusinessObjective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyPayment" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "bankName" VARCHAR(100) NOT NULL,
    "branchName" VARCHAR(100) NOT NULL,
    "accountType" "public"."AccountType" NOT NULL,
    "accountNumber" VARCHAR(20) NOT NULL,
    "accountHolder" VARCHAR(100) NOT NULL,
    "billingPostalCode" VARCHAR(7) NOT NULL,
    "billingPrefecture" "public"."Prefecture" NOT NULL,
    "billingCity" VARCHAR(100) NOT NULL,
    "billingAddress" VARCHAR(255) NOT NULL,
    "billingBuilding" VARCHAR(100),
    "billingContactName" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CompanyPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Influencer" (
    "id" UUID NOT NULL,
    "supabaseId" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Influencer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InfluencerInformation" (
    "id" UUID NOT NULL,
    "influencerId" UUID NOT NULL,
    "displayName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastNameKana" VARCHAR(100) NOT NULL,
    "firstNameKana" VARCHAR(100) NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "avatarUrl" VARCHAR(500),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "InfluencerInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InfluencerAddress" (
    "id" UUID NOT NULL,
    "influencerId" UUID NOT NULL,
    "postalCode" VARCHAR(7) NOT NULL,
    "prefecture" "public"."Prefecture" NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "town" VARCHAR(255) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "building" VARCHAR(100),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "InfluencerAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InfluencerSns" (
    "id" UUID NOT NULL,
    "influencerId" UUID NOT NULL,
    "instagramName" VARCHAR(255),
    "instagramFollowers" INTEGER,
    "youtubeName" VARCHAR(255),
    "youtubeFollowers" INTEGER,
    "tiktokName" VARCHAR(255),
    "tiktokFollowers" INTEGER,
    "xName" VARCHAR(255),
    "xFollowers" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "InfluencerSns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InfluencerWork" (
    "id" UUID NOT NULL,
    "influencerId" UUID NOT NULL,
    "postFee" INTEGER,
    "videoFee" INTEGER,
    "liveFee" INTEGER,
    "eventFee" INTEGER,
    "workTypes" "public"."WorkType"[],
    "regions" "public"."Region"[],
    "ngProducts" TEXT[],
    "ngCompanies" TEXT[],
    "ngOther" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "InfluencerWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InfluencerPrResult" (
    "id" UUID NOT NULL,
    "influencerWorkId" UUID NOT NULL,
    "company" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "year" VARCHAR(4) NOT NULL,
    "month" VARCHAR(2) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "InfluencerPrResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Campaign" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "platform" "public"."Platform" NOT NULL,
    "recruitment" INTEGER NOT NULL,
    "applicationDue" TIMESTAMP(3) NOT NULL,
    "postDue" TIMESTAMP(3) NOT NULL,
    "rewardType" "public"."RewardType" NOT NULL,
    "rewardAmount" INTEGER NOT NULL,
    "status" "public"."CampaignStatus" NOT NULL DEFAULT 'PRIVATE',
    "note" TEXT,
    "requirements" TEXT[],
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Application" (
    "id" UUID NOT NULL,
    "campaignId" UUID NOT NULL,
    "influencerId" UUID NOT NULL,
    "status" "public"."ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "message" TEXT,
    "rejectedAt" TIMESTAMPTZ(6),
    "approvedAt" TIMESTAMPTZ(6),
    "completedAt" TIMESTAMPTZ(6),
    "cancelledAt" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_supabaseId_key" ON "public"."Admin"("supabaseId");

-- CreateIndex
CREATE UNIQUE INDEX "User_supabaseId_key" ON "public"."User"("supabaseId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyInformation_companyId_key" ON "public"."CompanyInformation"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyAddress_companyId_key" ON "public"."CompanyAddress"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyBusiness_companyId_key" ON "public"."CompanyBusiness"("companyId");

-- CreateIndex
CREATE INDEX "CompanyBusinessAgeGroup_companyBusinessId_idx" ON "public"."CompanyBusinessAgeGroup"("companyBusinessId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyBusinessAgeGroup_companyBusinessId_ageGroup_key" ON "public"."CompanyBusinessAgeGroup"("companyBusinessId", "ageGroup");

-- CreateIndex
CREATE INDEX "CompanyBusinessRegion_companyBusinessId_idx" ON "public"."CompanyBusinessRegion"("companyBusinessId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyBusinessRegion_companyBusinessId_region_key" ON "public"."CompanyBusinessRegion"("companyBusinessId", "region");

-- CreateIndex
CREATE INDEX "CompanyBusinessGenre_companyBusinessId_idx" ON "public"."CompanyBusinessGenre"("companyBusinessId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyBusinessGenre_companyBusinessId_genre_key" ON "public"."CompanyBusinessGenre"("companyBusinessId", "genre");

-- CreateIndex
CREATE INDEX "CompanyBusinessObjective_companyBusinessId_idx" ON "public"."CompanyBusinessObjective"("companyBusinessId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyBusinessObjective_companyBusinessId_objective_key" ON "public"."CompanyBusinessObjective"("companyBusinessId", "objective");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyPayment_companyId_key" ON "public"."CompanyPayment"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Influencer_supabaseId_key" ON "public"."Influencer"("supabaseId");

-- CreateIndex
CREATE UNIQUE INDEX "InfluencerInformation_influencerId_key" ON "public"."InfluencerInformation"("influencerId");

-- CreateIndex
CREATE UNIQUE INDEX "InfluencerAddress_influencerId_key" ON "public"."InfluencerAddress"("influencerId");

-- CreateIndex
CREATE UNIQUE INDEX "InfluencerSns_influencerId_key" ON "public"."InfluencerSns"("influencerId");

-- CreateIndex
CREATE UNIQUE INDEX "InfluencerWork_influencerId_key" ON "public"."InfluencerWork"("influencerId");

-- CreateIndex
CREATE INDEX "InfluencerPrResult_influencerWorkId_idx" ON "public"."InfluencerPrResult"("influencerWorkId");

-- CreateIndex
CREATE INDEX "Campaign_companyId_idx" ON "public"."Campaign"("companyId");

-- CreateIndex
CREATE INDEX "Application_campaignId_idx" ON "public"."Application"("campaignId");

-- CreateIndex
CREATE INDEX "Application_influencerId_idx" ON "public"."Application"("influencerId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_campaignId_influencerId_key" ON "public"."Application"("campaignId", "influencerId");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyInformation" ADD CONSTRAINT "CompanyInformation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyAddress" ADD CONSTRAINT "CompanyAddress_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyBusiness" ADD CONSTRAINT "CompanyBusiness_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyBusinessAgeGroup" ADD CONSTRAINT "CompanyBusinessAgeGroup_companyBusinessId_fkey" FOREIGN KEY ("companyBusinessId") REFERENCES "public"."CompanyBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyBusinessRegion" ADD CONSTRAINT "CompanyBusinessRegion_companyBusinessId_fkey" FOREIGN KEY ("companyBusinessId") REFERENCES "public"."CompanyBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyBusinessGenre" ADD CONSTRAINT "CompanyBusinessGenre_companyBusinessId_fkey" FOREIGN KEY ("companyBusinessId") REFERENCES "public"."CompanyBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyBusinessObjective" ADD CONSTRAINT "CompanyBusinessObjective_companyBusinessId_fkey" FOREIGN KEY ("companyBusinessId") REFERENCES "public"."CompanyBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyPayment" ADD CONSTRAINT "CompanyPayment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InfluencerInformation" ADD CONSTRAINT "InfluencerInformation_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "public"."Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InfluencerAddress" ADD CONSTRAINT "InfluencerAddress_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "public"."Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InfluencerSns" ADD CONSTRAINT "InfluencerSns_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "public"."Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InfluencerWork" ADD CONSTRAINT "InfluencerWork_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "public"."Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InfluencerPrResult" ADD CONSTRAINT "InfluencerPrResult_influencerWorkId_fkey" FOREIGN KEY ("influencerWorkId") REFERENCES "public"."InfluencerWork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Campaign" ADD CONSTRAINT "Campaign_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "public"."Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "public"."Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
