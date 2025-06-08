-- CreateEnum
CREATE TYPE "Industry" AS ENUM ('RETAIL', 'MANUFACTURING', 'SERVICE', 'IT', 'FINANCE', 'REAL_ESTATE', 'FOOD', 'ENTERTAINMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "Prefecture" AS ENUM ('HOKKAIDO', 'AOMORI', 'IWATE', 'MIYAGI', 'AKITA', 'YAMAGATA', 'FUKUSHIMA', 'IBARAKI', 'TOCHIGI', 'GUNMA', 'SAITAMA', 'CHIBA', 'TOKYO', 'KANAGAWA', 'NIIGATA', 'TOYAMA', 'ISHIKAWA', 'FUKUI', 'YAMANASHI', 'NAGANO', 'GIFU', 'SHIZUOKA', 'AICHI', 'MIE', 'SHIGA', 'KYOTO', 'OSAKA', 'HYOGO', 'NARA', 'WAKAYAMA', 'TOTTORI', 'SHIMANE', 'OKAYAMA', 'HIROSHIMA', 'YAMAGUCHI', 'TOKUSHIMA', 'KAGAWA', 'EHIME', 'KOCHI', 'FUKUOKA', 'SAGA', 'NAGASAKI', 'KUMAMOTO', 'OITA', 'MIYAZAKI', 'KAGOSHIMA', 'OKINAWA');

-- CreateEnum
CREATE TYPE "AgeGroup" AS ENUM ('TEENS', 'EARLY_20S', 'LATE_20S', 'EARLY_30S', 'LATE_30S', 'OVER_40S');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('ALL', 'KANTO', 'KANSAI', 'TOKAI', 'HOKKAIDO', 'TOHOKU', 'CHUGOKU', 'SHIKOKU', 'KYUSHU', 'ONLINE');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('BEAUTY', 'FASHION', 'FOOD', 'TECH', 'LIFESTYLE', 'TRAVEL', 'FITNESS', 'ENTERTAINMENT');

-- CreateEnum
CREATE TYPE "Objective" AS ENUM ('AWARENESS', 'SALES', 'BRAND', 'ENGAGEMENT', 'LEADS', 'SERVICE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "WorkType" AS ENUM ('POST', 'VIDEO', 'LIVE', 'EVENT', 'AMBASSADOR', 'MODEL', 'REVIEW');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('INSTAGRAM', 'TIKTOK', 'YOUTUBE', 'X', 'FACEBOOK', 'OTHER');

-- CreateEnum
CREATE TYPE "RewardType" AS ENUM ('FIXED', 'FOLLOWER');

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('DRAFT', 'RECRUITING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('NORMAL', 'CURRENT');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Admin" (
    "id" UUID NOT NULL,
    "supabaseId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "supabaseId" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyInformation" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "companyName" VARCHAR(255) NOT NULL,
    "displayName" VARCHAR(255) NOT NULL,
    "corporateNumber" VARCHAR(13) NOT NULL,
    "ceoName" VARCHAR(100) NOT NULL,
    "establishedAt" TIMESTAMP(3) NOT NULL,
    "capital" INTEGER NOT NULL,
    "numberOfEmployees" INTEGER NOT NULL,
    "industry" "Industry" NOT NULL,
    "websiteUrl" VARCHAR(255) NOT NULL,
    "purpose" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CompanyInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyAddress" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "postalCode" VARCHAR(7) NOT NULL,
    "prefecture" "Prefecture" NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "town" VARCHAR(255) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "building" VARCHAR(100),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CompanyAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyBusiness" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "contactName" VARCHAR(100) NOT NULL,
    "department" VARCHAR(100) NOT NULL,
    "position" VARCHAR(100),
    "phone" VARCHAR(20),
    "email" VARCHAR(255) NOT NULL,
    "minBudget" INTEGER NOT NULL,
    "maxBudget" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "pastExperience" TEXT,
    "productDescription" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CompanyBusiness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyBusinessAgeGroup" (
    "id" UUID NOT NULL,
    "companyBusinessId" UUID NOT NULL,
    "ageGroup" "AgeGroup" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CompanyBusinessAgeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyBusinessRegion" (
    "id" UUID NOT NULL,
    "companyBusinessId" UUID NOT NULL,
    "region" "Region" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CompanyBusinessRegion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyBusinessGenre" (
    "id" UUID NOT NULL,
    "companyBusinessId" UUID NOT NULL,
    "genre" "Genre" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CompanyBusinessGenre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyBusinessObjective" (
    "id" UUID NOT NULL,
    "companyBusinessId" UUID NOT NULL,
    "objective" "Objective" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CompanyBusinessObjective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyPayment" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "bankName" VARCHAR(100) NOT NULL,
    "branchName" VARCHAR(100) NOT NULL,
    "accountType" "AccountType" NOT NULL,
    "accountNumber" VARCHAR(20) NOT NULL,
    "accountHolder" VARCHAR(100) NOT NULL,
    "billingPostalCode" VARCHAR(7) NOT NULL,
    "billingPrefecture" "Prefecture" NOT NULL,
    "billingCity" VARCHAR(100) NOT NULL,
    "billingAddress" VARCHAR(255) NOT NULL,
    "billingBuilding" VARCHAR(100),
    "billingContactName" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CompanyPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Influencer" (
    "id" UUID NOT NULL,
    "supabaseId" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Influencer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfluencerInformation" (
    "id" UUID NOT NULL,
    "influencerId" UUID NOT NULL,
    "displayName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastNameKana" VARCHAR(100) NOT NULL,
    "firstNameKana" VARCHAR(100) NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "InfluencerInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfluencerAddress" (
    "id" UUID NOT NULL,
    "influencerId" UUID NOT NULL,
    "postalCode" VARCHAR(7) NOT NULL,
    "prefecture" "Prefecture" NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "town" VARCHAR(255) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "building" VARCHAR(100),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "InfluencerAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfluencerSns" (
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
CREATE TABLE "InfluencerWork" (
    "id" UUID NOT NULL,
    "influencerId" UUID NOT NULL,
    "postFee" INTEGER,
    "videoFee" INTEGER,
    "liveFee" INTEGER,
    "eventFee" INTEGER,
    "workTypes" "WorkType"[],
    "regions" "Region"[],
    "ngProducts" TEXT[],
    "ngCompanies" TEXT[],
    "ngOther" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "InfluencerWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfluencerPrResult" (
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
CREATE TABLE "Campaign" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "recruitment" INTEGER NOT NULL,
    "applicationDue" TIMESTAMP(3) NOT NULL,
    "postDue" TIMESTAMP(3) NOT NULL,
    "rewardType" "RewardType" NOT NULL,
    "rewardAmount" INTEGER NOT NULL,
    "status" "CampaignStatus" NOT NULL DEFAULT 'DRAFT',
    "note" TEXT,
    "requirements" TEXT[],
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" UUID NOT NULL,
    "campaignId" UUID NOT NULL,
    "influencerId" UUID NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
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
CREATE UNIQUE INDEX "Admin_supabaseId_key" ON "Admin"("supabaseId");

-- CreateIndex
CREATE UNIQUE INDEX "User_supabaseId_key" ON "User"("supabaseId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyInformation_companyId_key" ON "CompanyInformation"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyAddress_companyId_key" ON "CompanyAddress"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyBusiness_companyId_key" ON "CompanyBusiness"("companyId");

-- CreateIndex
CREATE INDEX "CompanyBusinessAgeGroup_companyBusinessId_idx" ON "CompanyBusinessAgeGroup"("companyBusinessId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyBusinessAgeGroup_companyBusinessId_ageGroup_key" ON "CompanyBusinessAgeGroup"("companyBusinessId", "ageGroup");

-- CreateIndex
CREATE INDEX "CompanyBusinessRegion_companyBusinessId_idx" ON "CompanyBusinessRegion"("companyBusinessId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyBusinessRegion_companyBusinessId_region_key" ON "CompanyBusinessRegion"("companyBusinessId", "region");

-- CreateIndex
CREATE INDEX "CompanyBusinessGenre_companyBusinessId_idx" ON "CompanyBusinessGenre"("companyBusinessId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyBusinessGenre_companyBusinessId_genre_key" ON "CompanyBusinessGenre"("companyBusinessId", "genre");

-- CreateIndex
CREATE INDEX "CompanyBusinessObjective_companyBusinessId_idx" ON "CompanyBusinessObjective"("companyBusinessId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyBusinessObjective_companyBusinessId_objective_key" ON "CompanyBusinessObjective"("companyBusinessId", "objective");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyPayment_companyId_key" ON "CompanyPayment"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Influencer_supabaseId_key" ON "Influencer"("supabaseId");

-- CreateIndex
CREATE UNIQUE INDEX "InfluencerInformation_influencerId_key" ON "InfluencerInformation"("influencerId");

-- CreateIndex
CREATE UNIQUE INDEX "InfluencerAddress_influencerId_key" ON "InfluencerAddress"("influencerId");

-- CreateIndex
CREATE UNIQUE INDEX "InfluencerSns_influencerId_key" ON "InfluencerSns"("influencerId");

-- CreateIndex
CREATE UNIQUE INDEX "InfluencerWork_influencerId_key" ON "InfluencerWork"("influencerId");

-- CreateIndex
CREATE INDEX "InfluencerPrResult_influencerWorkId_idx" ON "InfluencerPrResult"("influencerWorkId");

-- CreateIndex
CREATE INDEX "Campaign_companyId_idx" ON "Campaign"("companyId");

-- CreateIndex
CREATE INDEX "Application_campaignId_idx" ON "Application"("campaignId");

-- CreateIndex
CREATE INDEX "Application_influencerId_idx" ON "Application"("influencerId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_campaignId_influencerId_key" ON "Application"("campaignId", "influencerId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyInformation" ADD CONSTRAINT "CompanyInformation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAddress" ADD CONSTRAINT "CompanyAddress_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyBusiness" ADD CONSTRAINT "CompanyBusiness_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyBusinessAgeGroup" ADD CONSTRAINT "CompanyBusinessAgeGroup_companyBusinessId_fkey" FOREIGN KEY ("companyBusinessId") REFERENCES "CompanyBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyBusinessRegion" ADD CONSTRAINT "CompanyBusinessRegion_companyBusinessId_fkey" FOREIGN KEY ("companyBusinessId") REFERENCES "CompanyBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyBusinessGenre" ADD CONSTRAINT "CompanyBusinessGenre_companyBusinessId_fkey" FOREIGN KEY ("companyBusinessId") REFERENCES "CompanyBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyBusinessObjective" ADD CONSTRAINT "CompanyBusinessObjective_companyBusinessId_fkey" FOREIGN KEY ("companyBusinessId") REFERENCES "CompanyBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyPayment" ADD CONSTRAINT "CompanyPayment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfluencerInformation" ADD CONSTRAINT "InfluencerInformation_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfluencerAddress" ADD CONSTRAINT "InfluencerAddress_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfluencerSns" ADD CONSTRAINT "InfluencerSns_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfluencerWork" ADD CONSTRAINT "InfluencerWork_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfluencerPrResult" ADD CONSTRAINT "InfluencerPrResult_influencerWorkId_fkey" FOREIGN KEY ("influencerWorkId") REFERENCES "InfluencerWork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
