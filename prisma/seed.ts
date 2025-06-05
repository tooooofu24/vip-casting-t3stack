import { PrismaClient } from "@/lib/prisma/generated";
import { createSupabaseUser } from "./factories/supabase/supabaseUser";
import {
  adminFactory,
  campaignFactory,
  companyFactory,
  influencerFactory,
  userFactory,
} from "./factories";

const prisma = new PrismaClient();

async function main() {
  const adminUser = await createSupabaseUser({ role: "admin" });

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
    // Supabase Authユーザーを作成
    const companyUser = await createSupabaseUser({ role: "company" });

    // PrismaのUserレコードを作成
    await prisma.user.create({
      data: userFactory(company.id, companyUser.id),
    });
  }

  // インフルエンサーを作成
  for (let i = 0; i < 25; i++) {
    // Supabase Authユーザーを作成
    const influencerUser = await createSupabaseUser({ role: "influencer" });

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
