# Task Completion Checklist

## MANDATORY: Before Any Commit
⚠️ **CRITICAL**: After implementing ANY feature or fix:

```bash
npm run check
```

This command runs:
- ESLint (with auto-fix)
- Prettier formatting
- TypeScript type checking
- Build verification

## Pre-Implementation Requirements
1. **Database Schema Check**: Review `prisma/schema.prisma`
2. **Understand Relations**: Check model relationships
3. **Field Verification**: Confirm exact field names and types
4. **Import Compliance**: Follow import rules (no barrel exports)

## Implementation Quality Gates
1. **Code Quality**: No ESLint errors
2. **Type Safety**: No TypeScript errors
3. **Formatting**: Prettier compliant
4. **Build Success**: `npm run build` passes

## Database Changes
If schema modified:
```bash
rm -rf prisma/migrations/ && npm run db:reset
```

## Error Resolution
- Fix ALL linting errors
- Resolve ALL type errors
- Address ALL build failures
- NO EXCEPTIONS

**Remember**: `npm run check` is non-negotiable before considering any task complete!