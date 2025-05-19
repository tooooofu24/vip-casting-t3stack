// supabaseのエラーコード → tRPCのエラーコードへ変換
import type { ErrorCode as SupabaseErrorCode } from "@supabase/auth-js/src/lib/error-codes";
import type { TRPC_ERROR_CODE_KEY } from "@trpc/server/unstable-core-do-not-import";

export function supabaseErrorCodeToTrpcCode(
  code: SupabaseErrorCode,
): TRPC_ERROR_CODE_KEY {
  switch (code) {
    // 400系: Bad Request
    case "invalid_credentials": // 認証情報不正
    case "validation_failed": // バリデーションエラー
    case "bad_json": // JSON不正
    case "bad_code_verifier": // PKCE検証失敗
    case "email_address_invalid": // メールアドレス不正
    case "email_not_confirmed": // メール未確認
    case "phone_not_confirmed": // 電話未確認
      return "BAD_REQUEST";

    // 401系: 認証失敗
    case "bad_jwt": // JWT不正
    case "no_authorization": // 認証情報なし
    case "session_not_found": // セッションなし
    case "session_expired": // セッション期限切れ
    case "reauthentication_needed": // 再認証必要
    case "reauthentication_not_valid": // 再認証不正
      return "UNAUTHORIZED";

    // 403系: 権限なし
    case "user_banned": // BAN
    case "not_admin": // 管理者権限なし
    case "provider_email_needs_verification": // メール認証必要
    case "email_address_not_authorized": // メールアドレス権限なし
    case "captcha_failed": // CAPTCHA失敗
      return "FORBIDDEN";

    // 404系: 見つからない
    case "user_not_found": // ユーザーなし
    case "identity_not_found": // IDなし
    case "invite_not_found": // 招待なし
    case "refresh_token_not_found": // リフレッシュトークンなし
    case "flow_state_not_found": // フロー状態なし
    case "saml_relay_state_not_found": // SAMLリレー状態なし
    case "saml_idp_not_found": // SAML IdPなし
      return "NOT_FOUND";

    // 409系: 競合
    case "email_exists": // メール重複
    case "phone_exists": // 電話重複
    case "user_already_exists": // ユーザー重複
    case "conflict": // 汎用競合
    case "identity_already_exists": // ID重複
    case "saml_idp_already_exists": // SAML IdP重複
    case "sso_domain_already_exists": // SSOドメイン重複
      return "CONFLICT";

    // 412系: 前提条件失敗
    case "email_conflict_identity_not_deletable": // 削除不可
    case "single_identity_not_deletable": // 削除不可
      return "PRECONDITION_FAILED";

    // 413系: ペイロード大きすぎ
    case "hook_payload_over_size_limit": // Webhookペイロード大
      return "PAYLOAD_TOO_LARGE";

    // 415系: サポート外メディア
    case "hook_payload_invalid_content_type": // Webhook Content-Type不正
      return "UNSUPPORTED_MEDIA_TYPE";

    // 422系: 処理不可
    case "weak_password": // パスワード弱い
      return "UNPROCESSABLE_CONTENT";

    // 429系: レートリミット
    case "over_request_rate_limit": // リクエスト多すぎ
    case "over_email_send_rate_limit": // メール送信多すぎ
    case "over_sms_send_rate_limit": // SMS送信多すぎ
      return "TOO_MANY_REQUESTS";

    // 405系: メソッド未サポート
    case "oauth_provider_not_supported": // OAuth未サポート
    case "provider_disabled": // プロバイダー無効
    case "email_provider_disabled": // メールプロバイダー無効
    case "phone_provider_disabled": // 電話プロバイダー無効
    case "anonymous_provider_disabled": // 匿名プロバイダー無効
    case "manual_linking_disabled": // 手動リンク無効
      return "METHOD_NOT_SUPPORTED";

    // 408系: タイムアウト
    case "request_timeout": // リクエストタイムアウト
    case "hook_timeout": // Webhookタイムアウト
    case "hook_timeout_after_retry": // Webhookリトライ後タイムアウト
      return "TIMEOUT";

    // 501系: 未実装
    case "sso_provider_not_found": // SSOプロバイダー未実装
      return "NOT_IMPLEMENTED";

    // 503系: サービス利用不可
    case "signup_disabled": // サインアップ無効
    case "saml_provider_disabled": // SAMLプロバイダー無効
      return "SERVICE_UNAVAILABLE";

    // 422系: MFA関連
    case "too_many_enrolled_mfa_factors":
    case "mfa_factor_name_conflict":
    case "mfa_factor_not_found":
    case "mfa_ip_address_mismatch":
    case "mfa_challenge_expired":
    case "mfa_verification_failed":
    case "mfa_verification_rejected":
    case "insufficient_aal":
    case "mfa_phone_enroll_not_enabled":
    case "mfa_phone_verify_not_enabled":
    case "mfa_totp_enroll_not_enabled":
    case "mfa_totp_verify_not_enabled":
    case "mfa_webauthn_enroll_not_enabled":
    case "mfa_webauthn_verify_not_enabled":
    case "mfa_verified_factor_exists":
      return "UNPROCESSABLE_CONTENT";

    // 422系: SAML関連
    case "saml_assertion_no_user_id":
    case "saml_assertion_no_email":
    case "saml_metadata_fetch_failed":
    case "saml_entity_id_mismatch":
      return "UNPROCESSABLE_CONTENT";

    // 422系: その他
    case "same_password": // 同じパスワード
      return "UNPROCESSABLE_CONTENT";

    // 400系: OAuth/State関連
    case "bad_oauth_state": // OAuth state不正
    case "bad_oauth_callback": // OAuth callback不正
    case "unexpected_audience": // 予期しないaudience
      return "BAD_REQUEST";

    // 400系: SAMLリレー状態期限切れ
    case "saml_relay_state_expired":
      return "BAD_REQUEST";

    // その他: 500系
    case "unexpected_failure": // 予期せぬ失敗
    case "refresh_token_already_used":
    case "flow_state_expired":
    case "reauth_nonce_missing":
    case "provider_disabled":
    case "user_sso_managed":
    case "otp_expired":
    case "otp_disabled":
    case "sms_send_failed":
      return "INTERNAL_SERVER_ERROR";

    default:
      // case漏れがあれば、ここで型エラーになる
      const _: never = code;
      return "INTERNAL_SERVER_ERROR";
  }
}
