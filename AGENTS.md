<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Commands

- `npm run dev` / `build` / `lint` / `typecheck` / `format`. There are **no tests** and no test runner — verify changes with `lint` + `typecheck` (and `build` for route-level issues).
- `npm run format` (Prettier) only covers `**/*.{ts,tsx}`. Style: **no semicolons, double quotes, LF line endings**; `prettier-plugin-tailwindcss` sorts class strings inside `cn`/`cva` calls.
- **Gotcha:** `typecheck` consumes generated types under `.next/types/` (see `tsconfig.json` `include`). After renaming or moving routes, `typecheck` alone can fail on stale paths — run `npm run build` first to regenerate them, then re-run `typecheck`.

# Structure

- Next.js 16 App Router project at the repo root — there is no `src/`. Alias `@/*` maps to the repo root (`app/`, `components/`, `hooks/`, `lib/`).
- `CLAUDE.md` is just `@AGENTS.md` — keep instructions here.

# Auth (better-auth + MongoDB)

- Server config lives in `lib/auth.ts` (better-auth with `mongodbAdapter`, email/password + Google social login); route handler is mounted in `app/api/auth/[...all]/route.ts` (catch-all per better-auth's docs — a previous `[,,,all]` folder name was a broken single dynamic segment; don't reintroduce it).
- **Gotcha:** `lib/auth-client.ts` is client-side only (`createAuthClient` → `signIn`/`signUp`/`useSession`); the server handler lives solely in `app/api/auth/[...all]/route.ts`. Never import server `auth` from `lib/auth.ts` into client components — it constructs a `MongoClient` at module scope.
- Env vars needed by `lib/auth.ts`: `DB_URL`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`. `.env` is committed and holds live Atlas credentials — never add new secrets to it or publish its contents (Google vars are referenced but currently missing).
- User roles (`seeker` / `recruiter` / `admin`) are a better-auth **additional field** on `user` in `lib/auth.ts` (`input: true`, unknown values coerced back to `seeker`). Client typing comes from `inferAdditionalFields<typeof auth>()` (type-only import) in `lib/auth-client.ts` — keep the two in sync, and keep exactly one `user:` block in the auth config.

# UI

- shadcn/ui with the **base-nova** style built on **Base UI** (`@base-ui/react`), not Radix — see `components.json`. Add components with `npx shadcn@latest add <component>`.
- Tailwind v4 is CSS-first: no `tailwind.config.*`; theme tokens live in `app/globals.css`.
- Two `cn` helpers exist: shadcn-generated components import the npm `cn` package, while `@/lib/utils` exports the classic `clsx`+`tailwind-merge` version. Match the file you're editing.
- `--primary` is the HireLoop brand violet (set in `app/globals.css` for both light and dark).
- Pages pin dark mode locally by wrapping content in a `div.dark` (the `dark` variant is `@custom-variant dark (&:is(.dark *))`), so pages render dark even when the system theme is light. `next-themes` is still wired globally, and `d` toggles dark mode app-wide (`components/theme-provider.tsx`).
