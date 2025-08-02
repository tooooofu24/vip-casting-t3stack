# VIP Casting Project Overview

## Purpose
VIPキャスティングは、インフルエンサーと企業のマッチングプラットフォームです。企業がキャンペーンを作成し、インフルエンサーが参加できるシステムです。

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **API**: tRPC (Type-safe API)
- **Database**: Prisma ORM + Supabase
- **UI**: Chakra UI v3
- **Authentication**: Supabase Auth
- **Type Safety**: TypeScript + Zod
- **Query Management**: TanStack Query (React Query)

## User Types
- `admin`: システム管理者
- `company`: 企業ユーザー（キャンペーン作成側）
- `influencer`: インフルエンサー（キャンペーン参加側）

## Key Features
- Role-based authentication and authorization
- Campaign creation and management (companies)
- Campaign participation (influencers)
- User profile management
- Business genre categorization
- Multi-platform support for influencers