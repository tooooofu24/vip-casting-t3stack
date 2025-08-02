# Environment & Setup

## Required Environment Variables
Defined in `src/env.js`:
- `DATABASE_URL` - Supabase database connection
- `NEXT_PUBLIC_SUPABASE_URL` - Public Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

## Development Environment
- **Platform**: Darwin (macOS)
- **Package Manager**: npm@11.5.2
- **Node.js**: Based on Next.js 15 requirements

## First Time Setup
1. Copy `.env.example` to `.env.local`
2. Configure Supabase environment variables
3. Run `npm install`
4. Run `npm run db:reset` (sets up database)
5. Start development: `npm run dev`

## Git Repository
- **Remote**: `git@github.com:tooooofu24/vip-casting-t3stack.git`
- **Main Branch**: `main`
- **Current Status**: Clean working directory

## Development Tools
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier
- **Database**: Prisma Studio (`npm run db:studio`)
- **Type Checking**: TypeScript strict mode