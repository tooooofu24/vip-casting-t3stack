# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

VIPキャスティングは、T3 Stack（Next.js、tRPC、Prisma、Supabase、Chakra UI）で構築されたインフルエンサーと企業のマッチングプラットフォームです。

## 開発コマンド

### 基本開発
- `npm run dev` - 開発サーバーを起動
- `npm run build` - 本番用ビルド
- `npm run preview` - ビルドしてローカルで本番サーバーを起動
- `npm run start` - 本番サーバーを起動

### コード品質
- `npm run lint` - ESLintを実行
- `npm run lint:fix` - ESLintを自動修正付きで実行
- `npm run typecheck` - TypeScriptの型チェック
- `npm run check` - lintとtypecheckを両方実行
- `npm run format` - Prettierでコード整形
- `npm run cspell` - スペルチェック
- `npm run knip` - 未使用の依存関係とファイルを削除

### データベース
- `npm run db:generate` - Prismaマイグレーションを生成（開発用）
- `npm run db:migrate` - マイグレーションを適用（本番用）
- `npm run db:push` - スキーマ変更を直接適用（開発用）
- `npm run db:studio` - Prisma Studio GUIを開く

## アーキテクチャ

### 技術スタック
- **フレームワーク**: Next.js 15（App Router使用）
- **API**: tRPCによる型安全なAPI
- **データベース**: Supabase経由のPostgreSQL（Prisma ORM使用）
- **認証**: Supabase Auth
- **UI**: Chakra UI v3（Emotion使用）
- **フォーム**: React Hook Form（Zodバリデーション）
- **状態管理**: TanStack Query（tRPC経由）

### ディレクトリ構造
- `/src/app/` - Next.js App Routerのページとレイアウト
  - `(common)/` - 公開ページ（ホーム、会社概要、お問い合わせなど）
  - `admin/` - 管理者ダッシュボードと認証
  - `company/` - 企業ダッシュボードと機能
  - `influencer/` - インフルエンサーダッシュボードと機能
  - `api/trpc/` - tRPC APIルートハンドラー
- `/src/server/` - サーバーサイドコード
  - `api/routers/` - tRPCルーター（admin、company、influencer）
  - `db.ts` - Prismaクライアントインスタンス
- `/src/lib/` - 共有ユーティリティと設定
  - `chakra-ui/` - Chakra UIテーマとコンポーネント
  - `supabase/` - Supabaseクライアント設定
  - `trpc/` - tRPCクライアントセットアップ
- `/src/validations/` - フォームバリデーション用Zodスキーマ
- `/prisma/` - データベーススキーマとマイグレーション

### 主要パターン

1. **認証フロー**: 管理者、企業、インフルエンサー用の3つの独立した認証システム（それぞれ独自のログイン/登録フロー）

2. **tRPCルーター構造**: 機能ベースのモジュラー設計：
   ```
   appRouter
   ├── admin（企業/インフルエンサー承認、サインアップ）
   ├── company（登録、キャンペーン）
   └── influencer（登録）
   ```

3. **フォーム処理**: React Hook FormとZodバリデーション、i18nサポートを使用したマルチステップ登録フォーム

4. **データベースモデル**: 日本固有のデータ（都道府県、地域）とビジネスドメイン（業界、プラットフォーム、キャンペーンステータス）用の包括的なEnum付きスキーマ

5. **UIコンポーネント**: カスタムテーマ設定を持つChakra UIコンポーネントの一貫した使用

### 環境変数
`src/env.js`で定義される必須変数：
- `DATABASE_URL` - PostgreSQL接続文字列
- `NEXT_PUBLIC_APP_URL` - アプリケーションURL
- `NEXT_PUBLIC_SUPABASE_URL` - SupabaseプロジェクトURL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase匿名キー
- `SUPABASE_SERVICE_ROLE_KEY` - Supabaseサービスロールキー

## コーディング規約

### tRPCプロシージャの実装
- 認証が必要なエンドポイントでは適切なミドルウェアを使用:
  - `adminProcedure` - 管理者権限が必要
  - `companyProcedure` - 企業ユーザー権限が必要（`ctx.companyId`が使用可能）
  - `publicProcedure` - 認証不要
- Zodのインポートは`import { z } from "@/lib/zod"`を使用（直接インポートは禁止）

### Prisma Enumの使用
- Enumのインポート: `import type { Platform, CampaignStatus } from "@/lib/prisma/generated"`
- ラベル定義は既存の定数ファイルを使用:
  - `/src/const/platform.ts` - プラットフォーム名
  - `/src/const/campaignStatus.ts` - キャンペーンステータス
  - その他のEnumも同様に`/src/const/`配下に定義済み

### フロントエンドでのデータ取得
- tRPC APIの呼び出し: `api.company.campaigns.getCampaigns.useQuery()`
- 空データの場合はフロントエンドで制御（APIでエラーを投げない）
- ローディング状態は`isLoading`、エラー状態は`error`を使用

## Claude作業時の通知音

ユーザーのアクション要求やタスク完了時に以下のコマンドで音を鳴らす：
```bash
afplay /System/Library/Sounds/Glass.aiff
```

以下の場面で音を鳴らすこと：
- タスクが完了した時
- ユーザーの確認や入力が必要な時
- 重要な処理が終了した時