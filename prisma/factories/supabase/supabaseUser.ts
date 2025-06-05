import { faker } from "@faker-js/faker/locale/ja";
import { type AdminUserAttributes, type User } from "@supabase/supabase-js";
import { supabaseAdmin } from "./client";

type Props = {
  email?: string;
  role: "admin" | "company" | "influencer";
};

function supabaseUserFactory(options: Props): AdminUserAttributes {
  return {
    email: options.email ?? faker.internet.email(),
    password: "password",
    email_confirm: true,
    user_metadata: {
      role: options.role,
      displayName: faker.person.fullName(),
    },
  };
}

export const createSupabaseUser = async (options: Props): Promise<User> => {
  const authData = supabaseUserFactory(options);
  const { data, error } = await supabaseAdmin.auth.admin.createUser(authData);
  if (error) {
    console.error("Supabaseユーザー作成エラー:", error);
  }
  if (data?.user === null) {
    console.error("Supabaseユーザー作成エラー:", error);
  }
  if (!data?.user) {
    throw new Error("Supabaseユーザー作成エラー");
  }
  return data.user;
};
