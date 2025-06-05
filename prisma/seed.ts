import { PrismaClient } from "@/lib/prisma/generated";
import {
  adminFactory,
  campaignFactory,
  clearAllAuthUsers,
  companyFactory,
  createSupabaseUser,
  influencerFactory,
  userFactory,
} from "./factories";

const prisma = new PrismaClient();

async function main() {
  await clearAllAuthUsers();

  const adminUser = await createSupabaseUser({
    role: "admin",
    email: "admin@example.com",
  });

  // Prisma管理者レコードを作成
  await prisma.admin.create({
    data: adminFactory(adminUser.id),
  });

  // 企業とユーザーを作成
  const companies = [];
  for (let i = 0; i < 8; i++) {
    const company = await prisma.company.create({
      data: companyFactory(),
    });
    companies.push(company);
  }

  for (const company of companies) {
    let email = undefined;
    if (company.id === companies[0]?.id) {
      email = "company@example.com";
    }

    // Supabase Authユーザーを作成
    const companyUser = await createSupabaseUser({ role: "company", email });

    // PrismaのUserレコードを作成
    await prisma.user.create({
      data: userFactory(company.id, companyUser.id),
    });
  }

  // インフルエンサーを作成
  for (let i = 0; i < 25; i++) {
    let email = undefined;
    if (i === 0) {
      email = "influencer@example.com";
    }

    // Supabase Authユーザーを作成
    const influencerUser = await createSupabaseUser({
      role: "influencer",
      email,
    });

    // Prismaのインフルエンサーレコードを作成
    await prisma.influencer.create({
      data: influencerFactory(influencerUser.id),
    });
  }

  // キャンペーンを作成
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
