# Codebase Architecture

## Directory Structure

### API Structure (tRPC)
```
/src/server/api/routers/
├── [role]/               # admin, company, influencer
│   └── features/
│       └── [feature]/    # auth, campaigns, etc.
│           ├── router.ts # Feature router
│           └── [action]/ # get, create, update, delete
│               ├── api.ts        # tRPC procedures
│               └── validation.ts # Zod schemas
```

### Frontend Structure (Next.js App Router)
```
/src/app/
├── [role]/              # admin, company, influencer routes
├── (components)/        # Shared components
├── (common)/           # Common pages
└── api/                # Next.js API routes
```

### Core Directories
- `/src/lib/` - Utilities, configurations
- `/src/const/` - Constants and enums
- `/src/util/` - Helper functions
- `/prisma/` - Database schema, migrations, seeds

## File Naming Conventions
- API files: `api.ts`, `validation.ts`
- Pages: `page.tsx` (Next.js App Router)
- Components: PascalCase
- Utils: camelCase

## Key Files
- `prisma/schema.prisma` - Database schema (CHECK FIRST!)
- `src/env.js` - Environment variables
- `src/server/api/trpc.ts` - tRPC configuration
- `src/server/db.ts` - Database connection