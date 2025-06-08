# CLAUDE.md

## プロジェクト概要

VIPキャスティングは、インフルエンサーと企業のマッチングプラットフォームです。

**技術スタック**: Next.js 15、tRPC、Prisma、Supabase、Chakra UI v3

**ユーザータイプ**:

- `admin`: システム管理者
- `company`: 企業ユーザー（キャンペーン作成側）
- `influencer`: インフルエンサー（キャンペーン参加側）

## 必須コマンド

```bash
# 開発
npm run dev

# コード品質（コミット前に必ず実行）
npm run check

# DBスキーマ変更時
npm run db:push && npm run db:generate
```

## コーディング規約

### インポート規則

- Zod: `import { z } from "@/lib/zod"`（直接インポート禁止）
- Prisma Enum: `import type { Platform } from "@/lib/prisma/generated"`
- Enumラベル: `/src/const/` 配下の定数ファイルを使用
- **バレルエクスポート禁止**: `index.ts`によるre-exportは使用しない（サーバー/クライアント境界問題を避けるため）
- 必要なものは直接的なパスから個別にインポートする

### tRPCプロシージャ

```typescript
// 企業用エンドポイントの例
export const myFeature = companyProcedure
  .input(z.object({ ... }))
  .mutation(async ({ ctx, input }) => {
    // ctx.companyId が自動的に利用可能
  });
```

- `adminProcedure`: 管理者権限必須
- `companyProcedure`: 企業ユーザー権限必須
- `publicProcedure`: 認証不要

### 環境変数

`src/env.js` で定義される必須変数：

- `DATABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 新機能追加の手順

### 1. API追加（tRPCルーター）

```typescript
// /src/server/api/routers/[role]/features/[feature]/[action]/api.ts
export const myFeature = companyProcedure
  .input(myFeatureSchema)
  .mutation(async ({ ctx, input }) => {
    // ビジネスロジック
  });
```

### 2. バリデーションスキーマ

```typescript
// /src/server/api/routers/[role]/features/[feature]/[action]/validation.ts
export const myFeatureSchema = z.object({
  // Zodスキーマ定義
});
```

### APIディレクトリ構成

```
/src/server/api/routers/
├── [role]/               # admin, company, influencer
│   └── features/
│       └── [feature]/    # auth, campaigns, etc.
│           ├── router.ts # 機能ルーター
│           └── [action]/ # get, create, update, delete, etc.
│               ├── api.ts        # tRPCプロシージャ
│               └── validation.ts # Zodスキーマ
```

例:

- `/company/features/auth/register/` → 企業登録機能
- `/company/features/campaigns/create/` → キャンペーン作成機能
- `/influencer/features/campaigns/get/` → キャンペーン取得機能

### 3. フロントエンド実装

```typescript
// /src/app/[role]/dashboard/my-feature/page.tsx
const { mutateAsync } = api.company.myFeature.useMutation();
```

### 4. Enum定数定義（Prisma Enumを使用する場合）

```typescript
// /src/const/myEnum.ts
import { MyEnum } from "@/lib/prisma/generated";

export const myEnumValues = [
  MyEnum.VALUE1,
  MyEnum.VALUE2,
] as const;

const myEnumLabels = {
  [MyEnum.VALUE1]: "値1",
  [MyEnum.VALUE2]: "値2",
} satisfies Record<MyEnum, string>;

export const myEnums = myEnumValues.map((value) => ({
  value,
  label: myEnumLabels[value],
}));
```

## Git情報

**リモートリポジトリ**: `git@github.com:tooooofu24/vip-casting-t3stack.git`
