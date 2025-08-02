# Essential Development Commands

## Development
```bash
npm run dev               # Start development server
```

## Code Quality (CRITICAL - Run before commits!)
```bash
npm run check            # Complete quality check: lint + format + typecheck
```
⚠️ **ALWAYS run `npm run check` after implementing features or fixes!**

## Database Management
```bash
npm run db:studio        # Open Prisma Studio
npm run db:migrate       # Deploy migrations to production
npm run db:reset         # Reset DB and run seed (development only)
```

## Database Schema Changes
```bash
rm -rf prisma/migrations/ && npm run db:reset
```

## Build & Deploy
```bash
npm run build            # Build for production
npm run preview          # Build and preview locally
npm run start            # Start production server
```

## Individual Tools
```bash
npm run format           # Format code with Prettier
npx tsc --noEmit        # TypeScript type checking only
```

## Utility Commands (macOS/Darwin)
- `ls` - List files
- `find` - Find files/directories
- `grep` / `rg` - Search text in files (ripgrep preferred)
- `git` - Version control
- `cd` - Change directory