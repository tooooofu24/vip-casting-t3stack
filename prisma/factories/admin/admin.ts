import type { Prisma } from "@/lib/prisma/generated";
import { faker } from "@faker-js/faker/locale/ja";

export function adminFactory(): Prisma.AdminUncheckedCreateInput {
  return {
    supabaseId: faker.string.uuid(),
  };
}
