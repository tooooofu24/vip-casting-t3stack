import { supabaseAdmin } from "./client";

export async function clearAllAuthUsers() {
  const { data: users } = await supabaseAdmin.auth.admin.listUsers({
    perPage: 1000,
  });

  // 各ユーザーを削除
  for (const user of users.users) {
    await supabaseAdmin.auth.admin.deleteUser(user.id);
  }
}
