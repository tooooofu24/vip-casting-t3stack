# 前提

- アカウント種別は「企業アカウント」「インフルエンサーアカウント」「運営アカウント」の3種類
- 現状運営アカウントのUIは未作成

<details>
<summary>モック作成済みURL一覧（企業）</summary>

- [企業ログイン `/company/login`](https://vip-casting.vercel.app/company/login)
- [企業登録（基本情報） `/company/register`](https://vip-casting.vercel.app/company/register)
- [企業登録（所在地情報） `/company/register/contact`](https://vip-casting.vercel.app/company/register/contact)
- [企業登録（ビジネス情報） `/company/register/business`](https://vip-casting.vercel.app/company/register/business)
- [企業登録（支払い情報） `/company/register/payment`](https://vip-casting.vercel.app/company/register/payment)
- [会社登録ガイド `/company/guide`](https://vip-casting.vercel.app/company/guide)
- [登録ガイド `/guide/registration`](https://vip-casting.vercel.app/guide/registration)
- [収益ガイド `/guide/earnings`](https://vip-casting.vercel.app/guide/earnings)
- [会社ダッシュボード `/company/dashboard`](https://vip-casting.vercel.app/company/dashboard)
- [会社案件管理 `/company/campaigns`](https://vip-casting.vercel.app/company/campaigns)
- [会社案件投稿 `/company/post`](https://vip-casting.vercel.app/company/post)
- [会社プロフィール `/company/profile`](https://vip-casting.vercel.app/company/profile)
- [会社設定 `/company/settings`](https://vip-casting.vercel.app/company/settings)
- [インフルエンサー検索 `/company/influencers`](https://vip-casting.vercel.app/company/influencers)

</details>

<details>
<summary>モック作成済みURL一覧（インフルエンサー）</summary>

- [トップページ `/`](https://vip-casting.vercel.app/)
- [会員登録 `/register`](https://vip-casting.vercel.app/register)
- [ログイン `/login`](https://vip-casting.vercel.app/login)
- [ダッシュボード `/dashboard`](https://vip-casting.vercel.app/dashboard)
- [案件一覧 `/campaigns`](https://vip-casting.vercel.app/campaigns)
- [案件詳細 `/campaigns/:id`](https://vip-casting.vercel.app/campaigns/:id)
- [案件管理 `/campaign-management`](https://vip-casting.vercel.app/campaign-management)
- [プロフィール `/profile`](https://vip-casting.vercel.app/profile)
- [メッセージ一覧 `/messages`](https://vip-casting.vercel.app/messages)
- [メッセージ詳細 `/messages/:chatId`](https://vip-casting.vercel.app/messages/:chatId)
- [収益 `/earnings`](https://vip-casting.vercel.app/earnings)
- [設定 `/settings`](https://vip-casting.vercel.app/settings)
- [PRリスト一覧 `/pr-listing`](https://vip-casting.vercel.app/pr-listing)
- [PRリスト作成 `/pr-listing/create`](https://vip-casting.vercel.app/pr-listing/create)
- [PRリスト詳細 `/pr-listing/:id`](https://vip-casting.vercel.app/pr-listing/:id)
- [About `/about`](https://vip-casting.vercel.app/about)
- [プライバシーポリシー `/privacy`](https://vip-casting.vercel.app/privacy)
- [利用規約 `/terms`](https://vip-casting.vercel.app/terms)
- [ヘルプ `/help`](https://vip-casting.vercel.app/help)
- [お問い合わせ `/contact`](https://vip-casting.vercel.app/contact)
- [導入事例 `/case-studies`](https://vip-casting.vercel.app/case-studies)

</details>

## 企業アカウント機能整理

| 機能カテゴリ         | 画面名                | URL                                                                 |
|----------------------|-----------------------|---------------------------------------------------------------------|
| アカウント登録・管理 | 企業登録（基本情報）  | [`/company/register`](https://vip-casting.vercel.app/company/register)           |
| アカウント登録・管理 | 企業登録（所在地情報）| [`/company/register/contact`](https://vip-casting.vercel.app/company/register/contact) |
| アカウント登録・管理 | 企業登録（ビジネス情報）| [`/company/register/business`](https://vip-casting.vercel.app/company/register/business) |
| アカウント登録・管理 | 企業登録（支払い情報）| [`/company/register/payment`](https://vip-casting.vercel.app/company/register/payment) |

- 項目不足（パスワード、企業ロゴアップロード、登記簿謄本アップロード、企業概要など）
- 運営承認の機能がない
- 登録した情報の編集機能がない

| 機能カテゴリ         | 画面名                | URL                                                                 |
|----------------------|-----------------------|---------------------------------------------------------------------|
| ダッシュボード       | 会社ダッシュボード    | [`/company/dashboard`](https://vip-casting.vercel.app/company/dashboard)         |

- 何を管理したいかの目的を整理したい

| 機能カテゴリ         | 画面名                | URL                                                                 |
|----------------------|-----------------------|---------------------------------------------------------------------|
| 案件管理             | 会社案件管理          | [`/company/campaigns`](https://vip-casting.vercel.app/company/campaigns)         |

- 案件詳細ページがない
- 案件編集機能がない
- 表示項目に過不足ないかの整理

| 機能カテゴリ         | 画面名                | URL                                                                 |
|----------------------|-----------------------|---------------------------------------------------------------------|
| 案件を掲載           | 会社案件投稿          | [`/company/post`](https://vip-casting.vercel.app/company/post)                   |

- 項目不足（必須ハッシュタグ、必須事項、注意事項など）
- 運営審査の機能がない
- スカウト機能がない

| 機能カテゴリ         | 画面名                | URL                                                                 |
|----------------------|-----------------------|---------------------------------------------------------------------|
| インフルエンサー検索 | インフルエンサー検索  | [`/company/influencers`](https://vip-casting.vercel.app/company/influencers)     |

- 評価・PR実績の詳細表示ボタンがない（レビュー一覧やPR実績一覧への導線）
- インフルエンサー情報カードの内容が一部不足（例：得意ジャンル、媒体ごとの数値の網羅性）
- 広告枠カードの「詳細を見る」から広告枠購入ページへの遷移が未実装
- 広告枠とは？

| 機能カテゴリ         | 画面名                | URL                                                                 |
|----------------------|-----------------------|---------------------------------------------------------------------|
| メッセージ           | メッセージ一覧        | [`/messages`](https://vip-casting.vercel.app/messages)                           |
| メッセージ           | メッセージ詳細        | [`/messages/:chatId`](https://vip-casting.vercel.app/messages/:chatId)           |

- 企業用、インフルエンサー用でUIは変わるか

| 機能カテゴリ         | 画面名                | URL                                                                 |
|----------------------|-----------------------|---------------------------------------------------------------------|
| プロフィール         | 会社プロフィール      | [`/company/profile`](https://vip-casting.vercel.app/company/profile)             |

- 担当者情報（複数登録可能）がない
- アカウント構造含めて確認が必要

| 機能カテゴリ         | 画面名                | URL                                                                 |
|----------------------|-----------------------|---------------------------------------------------------------------|
| 企業用設定           | 会社設定              | [`/company/settings`](https://vip-casting.vercel.app/company/settings)           |

- 足りない項目、不要な項目を整理したい

## インフルエンサーアカウント機能整理

### アカウント登録・管理

| 機能                   | 画面名                  | URL                                                                 |
|------------------------|-------------------------|---------------------------------------------------------------------|
| アカウント登録・管理   | 基本情報登録 | [`/register`](https://vip-casting.vercel.app/register)              |
| アカウント登録・管理   | 個人情報登録            | [`/register/personal`](https://vip-casting.vercel.app/register/personal) |
| アカウント登録・管理   | SNS情報登録             | [`/register/sns`](https://vip-casting.vercel.app/register/sns)           |
| アカウント登録・管理   | 案件情報登録            | [`/register/work`](https://vip-casting.vercel.app/register/work)         |
| アカウント登録・管理   | 登録完了                | [`/register/complete`](https://vip-casting.vercel.app/register/complete) |

- 項目不足（アイコン画像、自己紹介文、身分証アップロードなど）

### ダッシュボード

| 機能         | 画面名      | URL                                                                 |
|--------------|-------------|---------------------------------------------------------------------|
| ダッシュボード | ダッシュボード | [`/dashboard`](https://vip-casting.vercel.app/dashboard)            |

- スケジュールの追加・編集・来月閲覧
- レビュー機能

### 案件管理

| 機能     | 画面名      | URL                                                                 |
|----------|-------------|---------------------------------------------------------------------|
| 案件管理 | 案件管理    | [`/campaign-management`](https://vip-casting.vercel.app/campaign-management) |

### 案件を探す

| 機能       | 画面名    | URL                                                                 |
|------------|-----------|---------------------------------------------------------------------|
| 案件を探す | 案件一覧  | [`/campaigns`](https://vip-casting.vercel.app/campaigns)            |
| 案件を探す | 案件詳細  | [`/campaigns/:id`](https://vip-casting.vercel.app/campaigns/:id)    |

### 案件を募集する

| 機能           | 画面名        | URL                                                                 |
|----------------|---------------|---------------------------------------------------------------------|
| 案件を募集する | PRリスト一覧  | [`/pr-listing`](https://vip-casting.vercel.app/pr-listing)          |
| 案件を募集する | PRリスト作成  | [`/pr-listing/create`](https://vip-casting.vercel.app/pr-listing/create) |
| 案件を募集する | PRリスト詳細  | [`/pr-listing/:id`](https://vip-casting.vercel.app/pr-listing/:id)  |

### メッセージ

| 機能       | 画面名        | URL                                                                 |
|------------|---------------|---------------------------------------------------------------------|
| メッセージ | メッセージ一覧 | [`/messages`](https://vip-casting.vercel.app/messages)              |
| メッセージ | メッセージ詳細 | [`/messages/:chatId`](https://vip-casting.vercel.app/messages/:chatId) |

### プロフィール

| 機能         | 画面名          | URL                                                                 |
|--------------|-----------------|---------------------------------------------------------------------|
| プロフィール | プロフィール編集 | [`/profile`](https://vip-casting.vercel.app/profile)                |

### インフルエンサー用設定

| 機能               | 画面名 | URL                                                                 |
|--------------------|--------|---------------------------------------------------------------------|
| インフルエンサー用設定 | 設定   | [`/settings`](https://vip-casting.vercel.app/settings)              |


# メモ

企業が作るのが案件
インフルエンサーが作成するのが広告枠
ココナラのイメージ
チャットは契約ごとではなくユーザー対ユーザー
入金がある可能性があればOK

案件、応募、契約、投稿、完了

インフルエンサーと企業両方で承認が必要

# TODO

- 案件登録
- 案件検索
- 案件応募
- 案件管理