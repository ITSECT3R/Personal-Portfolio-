# CI/CD Pipeline

> GitHub Actions workflow that runs tests, lint, and type-checking on every push and PR.

---

## Workflow Overview

```
git push → GitHub Actions triggers → ubuntu-latest VM
                                        │
    1. Checkout code                    │  actions/checkout@v4
    2. Setup Bun                        │  oven-sh/setup-bun@v2
    3. Install dependencies             │  bun install --frozen-lockfile
    4. Postinstall (Bortx build)        │  builds @itsect3r/bortx dist if missing
    5. Type check                       │  tsc -b (via bun run build)
    6. Run tests                        │  vitest run
    7. Lint                             │  eslint .
    8. Check formatting                 │  prettier --check .
                                        │
    9. Cloudflare Workers (auto)        │  deploys to my-portfolio.itsect3r.workers.dev
                                        │
                                    ✅ All pass → green checkmark
                                    ❌ Any fail → red X, notification
```

---

## Deployment

The project is auto-deployed to Cloudflare Workers on every push to `main` via
[Cloudflare's Git integration](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/).

- **Platform:** Cloudflare Workers (`@cloudflare/vite-plugin`)
- **Config:** `wrangler.jsonc` — SPA routing, Node.js compat, observability
- **Build command:** `bun run build`
- **Deploy command:** `bun run deploy` / `wrangler deploy`
- **PReview:** `bun run preview` → `bun run build && wrangler dev`
- **URL:** https://my-portfolio.itsect3r.workers.dev/

To deploy manually:

```bash
bun run deploy           # Build + deploy to Workers
bun run preview          # Build + local Workers preview
```

---

## Workflow File

**Location:** `.github/workflows/test.yml`

```yaml
name: Test & Lint

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    name: Run Tests (Bun + Vitest)
    runs-on: ubuntu-latest
    timeout-minutes: 5

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Type check
        run: bun run build

      - name: Run tests
        run: bun run test

      - name: Lint
        run: bun run lint

      - name: Check formatting
        run: bun run format:check
```

---

## GitHub Actions Time Limits

| Limit                    | Value             | Relevant?                                  |
| ------------------------ | ----------------- | ------------------------------------------ |
| Job timeout (configured) | 5 minutes         | ✅ Set in workflow — kills hung tests fast |
| Job timeout (max)        | 6 hours           | ❌ Not relevant — our tests run in <1s     |
| Free tier (public repo)  | Unlimited minutes | ✅ This project is public                  |
| Free tier (private repo) | 2,000 min/month   | Only if repo goes private                  |

---

## Scripts Used in CI

| Script                 | What it runs                                              |
| ---------------------- | --------------------------------------------------------- |
| `bun run build`        | `tsc -b && vite build` — type-checks ALL TypeScript       |
| `bun run test`         | `vitest run` — single-run test execution (not watch mode) |
| `bun run lint`         | `eslint .` — ESLint flat config                           |
| `bun run format:check` | `prettier --check .` — fails if any file is not formatted |

---

## Local vs CI Behavior

|              | Local                   | CI                                       |
| ------------ | ----------------------- | ---------------------------------------- |
| Test command | `bun run test`          | `bun run test` (same)                    |
| Watch mode   | `bun run test:watch`    | Never used in CI                         |
| Coverage     | `bun run test:coverage` | Can be added as a CI step later          |
| Install      | `bun install`           | `bun install --frozen-lockfile` (strict) |

---

## Future Additions

- [ ] Add coverage report upload (Codecov / Coveralls)
- [ ] Add Playwright E2E tests when API is implemented
- [x] Add deployment step — Cloudflare Workers auto-deployment via Git integration
