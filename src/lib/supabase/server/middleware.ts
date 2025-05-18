import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // createServerClient と supabase.auth.getUser() の間にはコードを挟まないでください。
  // ここにコードを追加すると、ユーザーがランダムにログアウトするなど、デバッグが非常に困難な問題が発生する可能性があります。

  // 重要: auth.getUser() を削除しないでください。

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  // TODO: ログインしていない場合はログインページへリダイレクト
  //   if (
  //     !user &&
  //     !request.nextUrl.pathname.startsWith("/login") &&
  //     !request.nextUrl.pathname.startsWith("/auth")
  //   ) {
  //     // ユーザーが存在しない場合、ログインページへリダイレクトするなどの対応を行います。
  //     const url = request.nextUrl.clone();
  //     url.pathname = "/login";
  //     return NextResponse.redirect(url);
  //   }

  // 重要: 必ず supabaseResponse オブジェクトをそのまま返してください。
  // 新しく NextResponse.next() でレスポンスを作成する場合は、
  // 1. request を必ず渡してください（例: const myNewResponse = NextResponse.next({ request })）
  // 2. cookies を必ずコピーしてください（例: myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())）
  // 3. myNewResponse オブジェクトを必要に応じて変更しても構いませんが、cookies の変更は避けてください！
  // 4. 最後に return myNewResponse してください。
  // これを守らないと、ブラウザとサーバーのセッションが同期しなくなり、ユーザーのセッションが予期せず終了する原因となります！

  return supabaseResponse;
}
