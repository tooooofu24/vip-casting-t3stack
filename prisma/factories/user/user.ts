import type { Prisma } from "@/lib/prisma/generated";
import { faker } from "@faker-js/faker/locale/ja";

export function userFactory(
  companyId: string,
): Prisma.UserUncheckedCreateInput {
  return {
    id: faker.string.uuid(),
    companyId,
  };
}
