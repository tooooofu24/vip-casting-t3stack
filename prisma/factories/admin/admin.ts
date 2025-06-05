import type { Prisma } from "@/lib/prisma/generated";

export function adminFactory(
  supabaseId: string,
): Prisma.AdminUncheckedCreateInput {
  return {
    supabaseId,
  };
}
