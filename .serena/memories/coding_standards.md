# Coding Standards & Conventions

## Database Schema First Approach
⚠️ **CRITICAL**: Before ANY API implementation:
1. Check `prisma/schema.prisma` for exact model structure
2. Understand relationship definitions
3. Verify field names and types
4. Check for intermediate tables (e.g., `CompanyBusinessGenre`)

**Common Mistakes to Avoid:**
- Wrong field references: `company.name` → correct: `company.information.displayName`
- Wrong relations: `company.genres` → correct: `company.business.genres[].genre`
- Missing intermediate tables

## Import Rules
- **Zod**: `import { z } from "@/lib/zod"` (NEVER direct import)
- **Prisma Enums**: `import type { Platform } from "@/lib/prisma/generated"`
- **Enum Labels**: Use `/src/const/` constants
- **NO Barrel Exports**: No `index.ts` re-exports (server/client boundary issues)
- **Direct Imports**: Import directly from specific paths

## tRPC Procedures
- `adminProcedure`: Admin-only endpoints
- `companyProcedure`: Company user endpoints (ctx.companyId available)
- `influencerProcedure`: Influencer endpoints
- `publicProcedure`: No authentication required

## Code Style
- **NO COMMENTS** unless explicitly requested
- Follow existing patterns in codebase
- Use TypeScript strict mode
- Prefer composition over inheritance