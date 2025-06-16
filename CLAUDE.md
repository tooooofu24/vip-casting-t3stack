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
# ⚠️ 重要: 新機能実装・修正後は必ず実行すること！
npm run check

# DBスキーマ変更時
npm run db:push && npm run db:generate
```

## コーディング規約

### ⚠️ 最重要: データベーススキーマの確認

**API実装・修正時は必ず以下を実行すること:**

1. `prisma/schema.prisma` を確認してDBモデル構造を把握
2. モデル間のリレーション定義を理解
3. フィールド名・型定義を正確に把握
4. 中間テーブル（例: `CompanyBusinessGenre`）の存在を確認

**よくある間違い:**

- 存在しないフィールドの参照（例: `company.name` → 正しくは `company.information.displayName`）
- リレーション構造の誤解（例: `company.genres` → 正しくは `company.business.genres[].genre`）
- 中間テーブルの見落とし

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

### ⚠️ 必須: 実装完了後の品質チェック

**すべての実装が完了したら、必ず `npm run check` を実行してください。**
このコマンドは以下をチェックします：

- ESLintエラー
- TypeScript型エラー
- Prettierフォーマット
- ビルドエラー

エラーが出た場合は必ず修正してください。

### 1. API追加（tRPCルーター）

⚠️ **重要**: API実装前に必ず `prisma/schema.prisma` を確認してDBスキーマ構造を把握すること

```typescript
// /src/server/api/routers/[role]/features/[feature]/[action]/api.ts
export const myFeature = companyProcedure
  .input(myFeatureSchema)
  .mutation(async ({ ctx, input }) => {
    // ビジネスロジック
    // Prismaクエリ時は正しいリレーション構造を使用する
    const result = await ctx.db.model.findUnique({
      where: { id: input.id },
      include: {
        // schema.prismaのリレーション定義に従う
        relatedModel: {
          select: {
            field1: true,
            field2: true,
          },
        },
      },
    });
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

#### ページレイアウトの基本構造

```tsx
// /src/app/[role]/dashboard/my-feature/page.tsx
import { BreadcrumbSection } from "@/app/(components)/BreadcrumbSection";
import { VStack } from "@chakra-ui/react";

export default function MyFeaturePage() {
  return (
    <VStack gap={6} align="stretch">
      {/* Breadcrumb Section */}
      <BreadcrumbSection
        items={[{ label: "プロフィール" }]}
        title="プロフィール"
        description="プロフィールを編集して、ブランドとのマッチングをサポートしましょう。"
      />
      
      {/* メインコンテンツ */}
      {/* ... */}
    </VStack>
  );
}
```

#### API呼び出しの例

```typescript
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

### 5. **Chakra UI v3 コンポーネント使用方針**

#### ⚠️ 最重要: デフォルトコンポーネントの活用

**Chakra UIのデフォルトコンポーネントを積極的に使用し、不要なpropsは極力与えないこと:**

1. **実装前に必ずChakra UIドキュメントを確認**
   - 適切なコンポーネントが既に存在しないか探す
   - デフォルトのスタイリングで十分か確認
   - 本当に必要な場合のみpropsを追加

2. **推奨される使い方**

   ```tsx
   // ❌ 避けるべき: 不要なpropsを多数指定
   <Box bg="white" rounded="lg" shadow="sm" p="6">
     <Text fontSize="xl" fontWeight="bold" mb="4">タイトル</Text>
   </Box>

   // ✅ 推奨: デフォルトコンポーネントを活用
   <Card.Root>
     <Card.Body>
       <Card.Title>タイトル</Card.Title>
     </Card.Body>
   </Card.Root>

   // ❌ 避けるべき: カスタムスタイルの過剰使用
   <HStack gap="2" align="center" justify="space-between">

   // ✅ 推奨: デフォルトで十分な場合
   <HStack>
   ```

3. **よく使うコンポーネントパターン**
   - `Card.Root`, `Card.Body`, `Card.Title` - カード型UI
   - `Stack`, `HStack`, `VStack` - レイアウト（デフォルトgapで十分な場合が多い）
   - `Badge` - ラベル表示（colorPaletteのみ指定）
   - `Button` - ボタン（variant, colorPaletteのみ必要に応じて）
   - `SimpleGrid` - グリッドレイアウト
   - `List.Root`, `List.Item` - リスト表示

#### colorPaletteプロパティ

Chakra UI v3では、コンポーネントの色指定に`colorPalette`プロパティを使用：

```tsx
// シンプルに使う
<Badge>デフォルト</Badge>
<Badge colorPalette="green">実施中</Badge>
<Badge colorPalette="blue">作成中</Badge>

<Button>デフォルトボタン</Button>
<Button colorPalette="blue">保存</Button>
<Button variant="ghost">キャンセル</Button>
```

- 利用可能な色: `gray`, `red`, `orange`, `yellow`, `green`, `teal`, `blue`, `cyan`, `purple`, `pink`
- デフォルトで十分な見た目の場合は指定しない

## Git情報

**リモートリポジトリ**: `git@github.com:tooooofu24/vip-casting-t3stack.git`
