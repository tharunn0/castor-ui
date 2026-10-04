# Castor UI — Agent Guidelines & Engineering Standards (`AGENTS.md`)

This document defines the architectural guidelines, code standards, and development protocols for AI coding agents developing **`castor-ui`**.

---

## 1. Anti-Bloat & Performance Rules

`castor-ui` balances **modern, polished styling** with **engineering discipline**. The goal is a fast, responsive, production-ready console without gratuitous overhead.

### Pragmatic Dependency Policy
1. **Embrace Modern Standards**:
   * **Component Primitives**: Use **shadcn/ui** (built on Radix UI and Tailwind CSS). It provides accessible, beautifully styled components (Dialogs, Tables, Dropdowns, Sheets, Tabs) that reside directly in your repository without heavy third-party runtime package lock-in.
   * **Icons**: Use **Lucide React** (`lucide-react`) for clean, consistent iconography.
   * **Notifications**: Use **Sonner** (`sonner`) for slick, accessible toast alerts.
   * **Charts & Telemetry**: Use **Recharts** (or native SVG gauges) for node disk usage, throughput, and scrubber progress.
   * **Table State**: Use **TanStack Table v8** for high-performance sorting, filtering, and pagination of large object sets.
   * **Data Fetching & Cache**: Use **TanStack Query v5** (`@tanstack/react-query`) for API polling and server cache management.
2. **Avoid Real Bloat & Gimmicks**:
   * **No Heavy 3D or Canvas Backgrounds**: Prohibit `three.js`, `@react-three/fiber`, or particle effects.
   * **No Scroll-Jacking or Heavy Parallax**: Transitions should use standard CSS (`transition-colors duration-150`, Radix animations).
   * **No Redundant Utilities**: Do not install `moment` or `dayjs` (use native `Intl.DateTimeFormat` or lightweight helpers). Use `clsx` and `tailwind-merge` for class logic.
3. **State Management Discipline**:
   * **Server Cache**: Keep all cluster health telemetry, bucket lists, and object manifests inside **TanStack Query**. Do not replicate server data into Redux or complex global stores.
   * **UI State**: Keep local view state (active drawer, open modal, search filter input) in React `useState` or URL search params for bookmarkable paths (e.g. `?prefix=recordings/2026/`).

---

## 2. Architecture & Directory Structure

Agents must organize code according to a **feature-modular structure** that strictly separates presentation from data fetching and business logic.

### 2.1. Standard Folder Hierarchy

```
castor-ui/
├── docs/                        # Backend architecture & API contracts
├── public/                      # Static branding and favicons
├── src/
│   ├── api/                     # HTTP client & endpoint contracts
│   │   ├── client.ts            # Fetch wrapper (credentials: 'include' for JWT cookies)
│   │   └── endpoints.ts         # API routes matching BFF (:9001) & Auth (:9095)
│   ├── components/              # Shared UI components (shadcn/ui & generic primitives)
│   │   ├── ui/
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── tooltip.tsx
│   │   └── shared/              # Cross-cutting widgets (CopyButton, MonospaceSnippet)
│   ├── features/                # Feature-driven domain modules
│   │   ├── auth/                # Login screen, session guard, logout
│   │   ├── keys/                # S3 API key generation & quickstart snippets
│   │   ├── explorer/            # Bucket listing, object tree, upload drawer, presign
│   │   └── health/              # Cluster overview, Raft leader, node disk gauges, scrubber
│   ├── hooks/                   # Shared custom hooks (theme, copy-to-clipboard)
│   ├── layouts/                 # Header, AppShell, BreadcrumbNav, ErrorBoundary
│   ├── lib/                     # Utilities (cn, formatters, byte converters)
│   ├── types/                   # TypeScript definitions & API response schemas
│   ├── App.tsx                  # Root routes & query client provider
│   ├── main.tsx                 # Entrypoint
│   └── index.css                # Tailwind directives & design tokens
├── DESIGN.md                    # Design system reference
├── AGENTS.md                    # Agent instructions & standards
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

### 2.2. Separation of Concerns
* **Presentation Components (`src/components/ui/`, `features/*/components/`)**:
  * Focus exclusively on rendering layout, styling, and dispatching user events via callbacks.
  * Must not invoke direct `fetch` calls.
* **Feature Hooks & State (`features/*/hooks/`)**:
  * Own all TanStack Query logic, mutation lifecycles, and polling intervals.
  * Example: `useClusterHealth()` polls `/api/cluster/health` every 4s and transforms node telemetry into `{ nodes, raftLeader, capacityFreePercent }`.
* **API Layer (`src/api/`)**:
  * Centralizes all network communication. Provides strictly typed functions matching the endpoint specifications in `docs/api.md`.

---

## 3. Git & Workflow Hygiene

Agents must maintain a clean, traceable Git history with atomic commits.

### 3.1. Atomic Commit Cadence
* Commit after completing each discrete, self-contained unit of work (e.g., adding an accessible modal, wiring the presigned URL endpoint, or refining dark-mode contrast).
* Never batch unrelated changes together (e.g. do not mix auth login logic with bucket table formatting).
* Never commit broken code: all files in a commit must pass typechecking without syntax or compile errors.

### 3.2. Conventional Commit Standards
All commit messages must follow the Conventional Commits specification:

| Prefix | Scope | Description |
|---|---|---|
| `feat:` | `(auth)`, `(explorer)`, `(health)`, `(keys)` | Introducing new user-facing functionality |
| `fix:` | `(api)`, `(presign)`, `(upload)` | Resolving bugs or API edge cases |
| `refactor:` | `(components)`, `(tokens)` | Restructuring code without behavior changes |
| `style:` | `(tailwind)`, `(theme)` | Visual tweaks, spacing, and styling refinements |
| `perf:` | `(table)`, `(polling)` | Performance optimizations and render reduction |
| `test:` | `(unit)`, `(e2e)` | Unit or integration tests |
| `chore:` | `(deps)`, `(vite)` | Updating dependencies, configs, or tooling |

**Examples**:
* `feat(keys): add S3 keypair generator dialog with copyable quickstart snippets`
* `fix(explorer): correct prefix parsing for nested folder breadcrumbs`
* `style(health): refine disk capacity progress bar color thresholds`

---

## 4. Code Quality & Best Practices

### 4.1. TypeScript Strictness
* TypeScript must be configured with `"strict": true`.
* **Zero `any` Policy**: Use explicit interfaces and generics. For unknown external payloads, use `unknown` and validate with type guards.
* **Explicit Component Props**: Every React component must define an explicit `interface` or `type` for its props.
* Use union types for finite state sets (e.g. `type NodeHealth = 'HEALTHY' | 'DEGRADED' | 'OFFLINE'`).

### 4.2. Accessibility & Semantic HTML
* Interactive elements must be keyboard-accessible (full Tab, Enter, Space, and Escape navigation for modals and dropdowns).
* Use Radix UI primitives as the accessible foundation for overlays, popovers, and dialogs.
* Provide accessible labels (`aria-label`) on all icon-only buttons (such as copy buttons and delete icons).

### 4.3. Error Handling & User Feedback
* **API Failures**: Translate backend gRPC/HTTP status codes to meaningful user messages (e.g. HTTP 507 $\rightarrow$ `"Storage cluster is full"`, HTTP 409 $\rightarrow$ `"Bucket name already exists"`).
* **Toast Feedback**: Every mutation (upload complete, key revoked, URL copied) must provide instant visual feedback via Sonner toasts.
* **Error Boundaries**: Wrap individual widgets and views in error boundaries to avoid total page crashes on unexpected network payloads.

### 4.4. Verification Before Marking Tasks Done
Before declaring any task or feature complete, agents must verify:
1. `npm run typecheck` (`tsc --noEmit`) passes with 0 errors.
2. `npm run build` (`vite build`) completes cleanly.
3. No React rendering warnings or missing key warnings appear in the console.
