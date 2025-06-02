import type { TRPC_ERROR_CODE_KEY } from "@trpc/server/unstable-core-do-not-import";

export function getErrorMessageFromTrpcCode(
  code?: TRPC_ERROR_CODE_KEY,
): string {
  if (!code) {
    return "不明なエラーが発生しました。";
  }
  switch (code) {
    case "PARSE_ERROR":
      return "サーバーでリクエストの解析に失敗しました。";
    case "BAD_REQUEST":
      return "リクエスト内容が不正です。";
    case "INTERNAL_SERVER_ERROR":
      return "サーバー内部でエラーが発生しました。";
    case "NOT_IMPLEMENTED":
      return "未実装の機能です。";
    case "BAD_GATEWAY":
      return "サーバーのゲートウェイエラーが発生しました。";
    case "SERVICE_UNAVAILABLE":
      return "サービスが一時的に利用できません。";
    case "GATEWAY_TIMEOUT":
      return "サーバーの応答がタイムアウトしました。";
    case "UNAUTHORIZED":
      return "認証に失敗しました。ログインしてください。";
    case "FORBIDDEN":
      return "権限がありません。";
    case "NOT_FOUND":
      return "リソースが見つかりません。";
    case "METHOD_NOT_SUPPORTED":
      return "サポートされていないメソッドです。";
    case "TIMEOUT":
      return "タイムアウトが発生しました。";
    case "CONFLICT":
      return "リソースの競合が発生しました。";
    case "PRECONDITION_FAILED":
      return "前提条件が満たされていません。";
    case "PAYLOAD_TOO_LARGE":
      return "リクエストのデータが大きすぎます。";
    case "UNSUPPORTED_MEDIA_TYPE":
      return "サポートされていないメディアタイプです。";
    case "UNPROCESSABLE_CONTENT":
      return "リクエスト内容を処理できません。";
    case "TOO_MANY_REQUESTS":
      return "リクエストが多すぎます。しばらくしてから再度お試しください。";
    case "CLIENT_CLOSED_REQUEST":
      return "クライアントがリクエストを中断しました。";
    case "PAYMENT_REQUIRED":
      return "支払いが必要です。";
    default:
      // case漏れがあれば、ここで型エラーになる
      const _: never = code;
      return "不明なエラーが発生しました。";
  }
}
