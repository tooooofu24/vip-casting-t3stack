import { z } from "@/lib/zod";

export const adminSignUpSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8),
  displayName: z.string().min(1),
});

export type AdminSignUpRequest = z.infer<typeof adminSignUpSchema>;
