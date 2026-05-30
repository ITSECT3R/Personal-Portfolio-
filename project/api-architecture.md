# API & Data Architecture: Project Demo Files

## The Question

> Should I create API routes to pull React/CSS/HTML/JS/TS files from S3?
> Or build an API that embeds those files?
> Or a database?
> And doesn't lazy loading just delay when bytes are sent — not reduce them?

**Short answer:** Yes to S3, yes to a database (for metadata), and yes — you are 100% correct about lazy loading.

---

## Clarifying the Lazy Loading Misconception First

`React.lazy` splits your JavaScript **bundle** — it delays loading a route's component code until
the user navigates to that route. It does NOT lazily load the project file content.

If you stored file content as strings or imports inside your bundle, every byte would be sent
the moment the chunk loads, regardless of `React.lazy`. The only real solution is to **not put
file content in the bundle** — keep it in S3 and fetch it on demand.

```
❌ Static import / data file with file content
   → All bytes sent when projects page chunk loads

✅ File content lives in S3
   → Only metadata (name, description, tech) sent at page load
   → Raw file content fetched only when user clicks "View Source"
```

---

## Recommended Architecture

```
Browser
  │
  │ GET /api/projects           (list with metadata only — no file content)
  ▼
API Server (Node.js / AWS Lambda)
  │
  ├──▶ Database (PostgreSQL / DynamoDB)
  │       - id, title, description, technologies[], thumbnailUrl, s3Key
  │       - createdAt, updatedAt, tags[], slug
  │       - (future: viewCount, featured, order)
  │
  └──▶ AWS S3  (files: .tsx, .css, .html, .js, .ts)
          - Access: PRIVATE bucket (never public)
          - Served via pre-signed URLs with short expiry

Browser
  │
  │ User clicks "View Source" on a project
  │ GET /api/projects/:id/files     (returns pre-signed URLs — not file content)
  ▼
API Server
  │
  └──▶ S3.getSignedUrl(s3Key, { expiresIn: 900 })  → URL valid for 15 min
          URL returned to browser
          Browser fetches file content directly from S3 using the signed URL
          File rendered in code viewer component
```

---

## Why This Architecture

### Why NOT embed files in the API response or a database BLOB

- File content in a DB (TEXT/BLOB) works but makes the DB row huge and adds latency to every list query
- You'd have to re-upload to DB whenever a file changes (two places to update)
- S3 is designed for binary/text file storage; a relational DB is not
- Signed URLs let S3 serve files with CDN speed directly to the browser

### Why NOT expose S3 directly (public bucket)

- Private bucket + signed URLs gives you access control
- You can revoke access, add rate limiting, or add auth later without touching S3
- The API acts as a gatekeeper — you can log who downloaded what

### Why a Database (even before the backend exists)

Even if you start with just two fields per project (`title`, `s3Key`), having a DB means:

- You can update project metadata without redeploying the frontend
- You can add fields (`viewCount`, `tags`, `featured`, `order`) incrementally
- You can power a future admin dashboard to add/edit projects without touching code
- Strongly typed SQL schemas enforce data integrity

**Recommended DB options:**

| Option      | Good for                        | Free tier         |
| ----------- | ------------------------------- | ----------------- |
| Supabase    | PostgreSQL + auto REST API + UI | Yes               |
| PlanetScale | MySQL, serverless, branch-based | Limited           |
| DynamoDB    | AWS-native, simple key-value    | Yes (low traffic) |
| Neon        | Serverless PostgreSQL           | Yes               |

For a portfolio project, **Supabase** is the fastest path — it gives you a PostgreSQL DB,
auto-generated REST + GraphQL API, and a web UI to manage records, all on the free tier.

---

## Suggested Database Schema

```sql
CREATE TABLE projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,           -- used in URL: /projects/my-app
  title       TEXT NOT NULL,
  description TEXT,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  thumbnail_url TEXT,
  s3_key      TEXT,                           -- S3 key prefix for this project's files
  external_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  featured    BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE project_files (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  filename    TEXT NOT NULL,                  -- e.g. "App.tsx"
  s3_key      TEXT NOT NULL,                  -- full S3 key to the file
  language    TEXT NOT NULL,                  -- "tsx" | "css" | "ts" | "html" | "js"
  display_order INTEGER NOT NULL DEFAULT 0
);
```

---

## API Routes

```
GET    /api/projects                  → list all projects (metadata only, no file content)
GET    /api/projects/:slug            → single project detail + file list
GET    /api/projects/:slug/files/:id  → returns pre-signed S3 URL for one file
```

### Example response: `GET /api/projects`

```json
[
  {
    "id": "uuid",
    "slug": "todo-app",
    "title": "Todo App",
    "description": "A React todo list with TypeScript",
    "technologies": ["React", "TypeScript", "CSS Modules"],
    "thumbnailUrl": "https://cdn.yourportfolio.com/todo-thumb.jpg",
    "featured": true
  }
]
```

Note: NO `s3Key` in the list response — the client never needs raw S3 keys.

### Example response: `GET /api/projects/todo-app/files/uuid`

```json
{
  "filename": "App.tsx",
  "language": "tsx",
  "url": "https://s3.amazonaws.com/your-bucket/projects/todo-app/App.tsx?X-Amz-Signature=...&Expires=1716000000"
}
```

The browser then fetches `url` directly from S3. File content never passes through your API server.

---

## Frontend Integration (Future)

```tsx
// When user clicks "View Source"
async function loadFileContent(
  projectSlug: string,
  fileId: string
): Promise<string> {
  // 1. Get the signed URL from your API
  const { url } = await fetch(
    `/api/projects/${projectSlug}/files/${fileId}`
  ).then(r => r.json());

  // 2. Fetch file content directly from S3 using the signed URL
  const content = await fetch(url).then(r => r.text());

  return content;
}
```

The file content is fetched **on demand** — only when the user explicitly requests it.
The initial page load only fetches the small metadata response.

---

## Alternative: Embedded Code Demos (No S3 Needed)

If the projects are small or you want interactive demos, consider:

| Option                       | Pros                                 | Cons                        |
| ---------------------------- | ------------------------------------ | --------------------------- |
| **StackBlitz WebContainers** | Full Node.js in browser, installable | More complex integration    |
| **CodeSandbox embed**        | Hosted, zero infra                   | Dependent on third party    |
| **GitHub Gist embed**        | Simple, free, version-controlled     | No interactivity            |
| **S3 + code viewer**         | Full control, your infrastructure    | Need to build the viewer UI |
| **GitHub raw file fetch**    | Zero infra, uses GitHub as CDN       | Public repos only           |

For a portfolio, **GitHub raw file fetch** is the simplest approach if your projects are in
public repos. You avoid S3 entirely:

```ts
// Fetch a file from a public GitHub repo — zero infrastructure
const url = `https://raw.githubusercontent.com/ITSECT3R/todo-app/main/src/App.tsx`;
const content = await fetch(url).then(r => r.text());
```

This works right now, with no backend, no database, and no AWS account needed.
Add the S3 + database approach only when you need private repos or richer metadata control.

---

## Decision Flowchart

```
Are your demo projects in public GitHub repos?
  ├─ YES → Use GitHub raw URLs. No S3, no DB needed now.
  │         Add DB + S3 later when you need private files or richer metadata.
  │
  └─ NO / You want full control
        ├─ Small project (< 5 demos, rarely updated)
        │     → S3 + hardcoded metadata in TS (no DB yet)
        │
        └─ Growing project (want to add/edit without redeploying)
              → S3 + PostgreSQL (Supabase) + API
              → This is the recommended long-term target
```

---

## Recommended Path Forward

1. **Now:** Use GitHub raw URLs for any project files already in public repos. Zero infra.
2. **Next:** Set up Supabase (free) — add the `projects` table, populate it manually.
   Update the frontend to fetch from Supabase's auto REST API.
3. **Later:** Add `project_files` table + S3 bucket + signed URL endpoint when you need
   to show private or complex multi-file demos.
4. **Always:** File content is never in the JS bundle. Fetch on demand only.
