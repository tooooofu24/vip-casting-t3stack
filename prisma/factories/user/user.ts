import type { Prisma } from "@/lib/prisma/generated";

export function userFactory(
  companyId: string,
  supabaseId: string,
): Prisma.UserUncheckedCreateInput {
  return {
    supabaseId,
    companyId,
  };
}
