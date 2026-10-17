# Struqt — Lead Capture & Qualification Automation

Struqt is a SaaS for automating **lead capture and qualification**. Teams configure flows (for example a quiz, a pre-qualification questionnaire or a contact form with scoring), publish them on a hosted page, and Struqt turns every visitor action into an **event**. Those events feed **reliable metrics** and are delivered to the tools the team already uses through **integrations**.

**Repository:** [github.com/kelvnnicolas/strutqt](https://github.com/kelvnnicolas/strutqt)

> **Project status:** early development. Authentication, the marketing site and the data model exist. The flow builder, public flow pages, event pipeline, dashboard data and integrations are **not implemented yet**; screens such as the dashboard and checkout still use mock data. See [Roadmap](#roadmap).

## Concept

| Pillar | What it means | Where it lives |
|---|---|---|
| **Configurable flows** | A flow is data: versioned steps with questions, scored options and a lead form. A published version is immutable; editing creates a new version. | `Flow`, `FlowVersion`, `Step` |
| **Event processing** | Every visitor action is an immutable, idempotent event. Submissions and leads are derived state. | `Event`, `Submission`, `Lead` — [docs/eventos.md](docs/eventos.md) |
| **Reliable metrics** | One definition per metric, computed from events, with no double counting. | [docs/eventos.md](docs/eventos.md#métricas-definições) |
| **Integrations** | Per-workspace destinations with signed delivery, retries and an audit log. First connector: outbound webhook. | `Integration`, `Delivery` |

### Product decisions (v1)

- Visitors reach a flow through a **hosted public page** (`/f/[slug]`); an embeddable script comes later.
- Visitors are **anonymous**, identified by a browser-generated `visitorId`.
- Flows are **linear with scoring**. `Step.condition` is reserved so branching can be added without a migration.
- The first integration is a **generic signed webhook**, which covers Zapier, Make and n8n.
- **PostgreSQL** is the only datastore, with a durable queue for asynchronous work. No streaming platform or warehouse.
- Everything is **multi-tenant by `workspaceId`** from the start.

## Current state

| Area | State |
|---|---|
| Marketing site (landing, features, pricing, docs, templates) | Implemented; copy still describes quizzes only |
| Authentication (signup, login, refresh, logout, `/me`) | Implemented with Zod validation and standard error responses; covered by unit tests |
| Data model and baseline migration | Defined in `prisma/schema.prisma` and `prisma/migrations/`; **not applied to any database yet** |
| Flow builder, public flow pages, events, metrics, integrations | Not implemented |
| Dashboard | Mock data |
| Billing / checkout | Static screens; no payment provider |

The running checklist lives in `nextmove.md` and the verified state in `STATUS.md` (local files, see [Project notes](#project-notes)).

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (Pages Router) | Web application, API routes |
| React 19, Tailwind CSS 4, Framer Motion | User interface |
| PostgreSQL + Prisma 7 (with Accelerate) | Data and schema management |
| JWT + bcryptjs | Access tokens (15 min), refresh-token cookie (7 days), password hashing |
| Zod | Server-side input validation |
| Vitest | Unit tests |
| ESLint 9 | Linting |

## Project Structure

```text
strutqt/
├── components/        # UI components (landing, auth, dashboard)
├── context/           # AuthContext (client-side auth state)
├── controllers/       # HTTP layer: parse input, call services, shape responses
├── services/          # Business rules and database access
├── validators/        # Zod schemas for request bodies
├── middlewares/       # withAuth for API routes
├── middleware.js      # Redirects unauthenticated visitors from app pages
├── pages/             # Routes (Pages Router) and pages/api
├── prisma/            # schema.prisma and migrations/
├── utils/             # jwt, hash, prisma client, errorHandler, axios client
├── tests/             # Vitest suites
├── docs/              # Architecture notes (events, metrics, delivery)
└── .env.example       # Required environment variables
```

Request flow: `pages/api/*` → `controllers/` (validate with `validators/`, map errors with `utils/errorHandler`) → `services/` → Prisma. Services throw `AppError`; controllers never leak unexpected error messages to clients.

## Getting Started

### Prerequisites

- Node.js 20 or newer and npm.
- A PostgreSQL database. For the app, a Prisma Accelerate connection string; for migrations, a direct connection string.

### 1. Install

```bash
git clone https://github.com/kelvnnicolas/strutqt.git
cd strutqt
npm install
```

### 2. Configure the environment

```bash
cp .env.example .env
```

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Prisma Accelerate URL used by the app at runtime |
| `DIRECT_URL` | Direct PostgreSQL URL used by `prisma migrate` |
| `JWT_ACCESS_SECRET` | Signs access tokens |
| `JWT_REFRESH_SECRET` | Signs refresh tokens (must differ from the access secret) |

Generate each secret with `openssl rand -base64 48`. The app **refuses to sign tokens** when a secret is missing; there are no default values. Never commit `.env`.

### 3. Prepare the database

Use a **new, empty** database. The baseline migration creates every table.

```bash
npx prisma migrate deploy   # apply migrations
npx prisma generate         # generate the client
```

If you already have tables created with `prisma db push`, do not run the baseline on top of them: back the database up and mark the migration as applied with `npx prisma migrate resolve --applied 20261017000000_init` only after confirming the schemas match.

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `GET /api/health` reports database connectivity.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |
| `npm test` | Vitest |

## Roadmap

1. **Foundation** — validation, standard errors, tests, lint, migrations. *(done on branch `chore/estrutura`)*
2. **Vertical slice** — create and publish a flow, public page, events, qualification, dashboard with real numbers.
3. **Outbound webhook** — signed delivery, retries, delivery log.
4. **Later** — billing and plan limits, conditional branching, embeddable script, more connectors, CI.

## Security Notes

- Refresh token in an `httpOnly`, `sameSite=strict` cookie; access token kept in memory only.
- Passwords: 8–72 bytes (bcrypt limit), hashed with bcryptjs.
- Not done yet: rate limiting on auth routes, refresh rotation inside a transaction, security headers, CSRF review for future cross-origin embeds.
- Personal data (name, e-mail, phone) is stored in `Lead` only, never in event payloads.

## Project notes

`STATUS.md` (verified state and delivery log) is versioned. `nextmove.md` (work queue) is intentionally git-ignored.

## Contributing

For substantial changes, open an issue first. Run `npm run lint`, `npm test` and `npm run build` before submitting.

## License

No license is currently declared. Until one is added, default copyright rules apply.
