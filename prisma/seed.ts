import { PrismaClient } from "@/lib/prisma/generated";
import {
  campaignFactory,
  companyFactory,
  influencerFactory,
  userFactory,
} from "./factories";

const prisma = new PrismaClient();

async function main() {
  const companies = [];
  for (let i = 0; i < 8; i++) {
    const company = await prisma.company.create({
      data: companyFactory(),
    });
    companies.push(company);
  }

  for (const company of companies) {
    await prisma.user.create({
      data: userFactory(company.id),
    });
  }

  for (let i = 0; i < 25; i++) {
    await prisma.influencer.create({
      data: influencerFactory(),
    });
  }

  for (const company of companies) {
    for (let i = 0; i < 10; i++) {
      await prisma.campaign.create({
        data: campaignFactory(company.id),
      });
    }
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
