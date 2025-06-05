import { PrismaClient } from "@/lib/prisma/generated";
import {
  // Main factories for complete entities
  companyFactory,
  influencerFactory,
  campaignFactory,
  // Sub-factories for individual tables (if needed)
  // companyInformationFactory,
  // influencerSnsFactory,
  // etc...
} from "./factories";
import { faker } from "@faker-js/faker/locale/ja";

const prisma = new PrismaClient();

async function main() {
  console.warn("🌱 Starting database seeding...");

  try {
    // 1. Create Companies
    console.warn("Creating companies...");
    const companies = [];
    for (let i = 0; i < 8; i++) {
      const company = await prisma.company.create({
        data: companyFactory(),
      });
      companies.push(company);
    }
    console.warn(`✅ Created ${companies.length} companies`);

    // 2. Create Influencers
    console.warn("Creating influencers...");
    const influencers = [];
    for (let i = 0; i < 25; i++) {
      const influencer = await prisma.influencer.create({
        data: influencerFactory(),
      });
      influencers.push(influencer);
    }
    console.warn(`✅ Created ${influencers.length} influencers`);

    // 3. Create Campaigns
    console.warn("Creating campaigns...");
    const campaigns = [];
    for (let i = 0; i < 20; i++) {
      const companyId = faker.helpers.arrayElement(companies).id;
      const campaign = await prisma.campaign.create({
        data: campaignFactory(companyId),
      });
      campaigns.push(campaign);
    }
    console.warn(`✅ Created ${campaigns.length} campaigns`);

    console.warn("🎉 Seed completed successfully!");
    console.warn("📊 Summary:");
    console.warn(`   - Companies: ${companies.length}`);
    console.warn(`   - Influencers: ${influencers.length}`);
    console.warn(`   - Campaigns: ${campaigns.length}`);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
