// tRPCエラーコードを日本語メッセージに変換する関数
// import type { TRPC_ERROR_CODE_KEY } from "@trpc/server";

import type { TRPC_ERROR_CODE_KEY } from "@trpc/server/unstable-core-do-not-import";

const trpcErrorMessages: Record<TRPC_ERROR_CODE_KEY, string> = {
  PARSE_ERROR: "サーバーでリクエストの解析に失敗しました。",
  BAD_REQUEST: "リクエスト内容が不正です。",
  INTERNAL_SERVER_ERROR: "サーバー内部でエラーが発生しました。",
  NOT_IMPLEMENTED: "未実装の機能です。",
  BAD_GATEWAY: "サーバーのゲートウェイエラーが発生しました。",
  SERVICE_UNAVAILABLE: "サービスが一時的に利用できません。",
  GATEWAY_TIMEOUT: "サーバーの応答がタイムアウトしました。",
  UNAUTHORIZED: "認証に失敗しました。ログインしてください。",
  FORBIDDEN: "権限がありません。",
  NOT_FOUND: "リソースが見つかりません。",
  METHOD_NOT_SUPPORTED: "サポートされていないメソッドです。",
  TIMEOUT: "タイムアウトが発生しました。",
  CONFLICT: "リソースの競合が発生しました。",
  PRECONDITION_FAILED: "前提条件が満たされていません。",
  PAYLOAD_TOO_LARGE: "リクエストのデータが大きすぎます。",
  UNSUPPORTED_MEDIA_TYPE: "サポートされていないメディアタイプです。",
  UNPROCESSABLE_CONTENT: "リクエスト内容を処理できません。",
  TOO_MANY_REQUESTS:
    "リクエストが多すぎます。しばらくしてから再度お試しください。",
  CLIENT_CLOSED_REQUEST: "クライアントがリクエストを中断しました。",
};

export function getErrorMessageFromTrpcCode(
  code?: TRPC_ERROR_CODE_KEY,
): string {
  if (!code) {
    return "不明なエラーが発生しました。";
  }
  return trpcErrorMessages[code] ?? "不明なエラーが発生しました。";
}
