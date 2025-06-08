import { z } from "@/lib/zod";

export const companyLoginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export type CompanyLoginRequest = z.infer<typeof companyLoginSchema>;
