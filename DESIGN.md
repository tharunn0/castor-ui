# Castor UI — Design System Specification (`DESIGN.md`)

This document serves as the comprehensive design system and UI pattern reference for **`castor-ui`**, the web management console for the Castor distributed object storage system.

---

## 1. Design Philosophy: The Modern Standard

`castor-ui` follows the modern standard for developer and infrastructure platforms (inspired by **Supabase, Vercel, Cloudflare Dashboard, and Linear**). It strikes an intentional balance: **visually polished, highly functional, and responsive**, while remaining **clean, fast, and free of gimmicky bloat**.

### Core Tenets
1. **Polished & Premium, Not Bare-Bones**: The interface uses standard, beautifully crafted components (cards, dialogs, sliding sheets, dropdowns, segmented tabs, and rich toast alerts). We do not force developers or users to interact with raw or unstyled primitives.
2. **Utilitarian & Focused**: Visual elements serve a clear operational purpose. Heavy 3D graphics, laggy scroll-jacking, and decorative animations that distract from managing data or monitoring cluster health are avoided.
3. **High Information Density with Visual Breathing Room**: Storage clusters have a wealth of telemetry (Raft terms, node health, disk capacities, chunk locations, deduplication stats). Information is organized using structured data tables, clear metric cards, and collapsible panels so dense data is easy to scan.
4. **First-Class Dark & Light Themes**: Built with deep, neutral zinc tones and crisp border delineation. Dark mode provides low glare for operations centers, while light mode provides high-contrast clarity for daylight work.
5. **Fluid Micro-Interactions**: Interactions feel responsive and tactile. Buttons, dialog transitions, tabs, and toast notifications leverage smooth, standard transitions (150ms–200ms) powered by Tailwind and Radix UI.

---

## 2. Design Tokens

The design system is built on CSS custom properties integrated with **Tailwind CSS** and **shadcn/ui** token conventions.

### 2.1. Color System

#### Surface & Neutral Palette (Zinc Foundation)

| Token Name | Light Mode Value | Dark Mode Value | Semantic Role |
|---|---|---|---|
| `--background` | `hsl(0 0% 100%)` (#ffffff) | `hsl(240 10% 3.9%)` (#09090b) | Primary application canvas |
| `--surface` | `hsl(0 0% 98%)` (#fafafa) | `hsl(240 10% 6.5%)` (#111113) | Cards, panels, elevated sections |
| `--surface-elevated` | `hsl(0 0% 100%)` (#ffffff) | `hsl(240 10% 9.5%)` (#18181b) | Modals, flyouts, popovers, dropdowns |
| `--muted` | `hsl(240 4.8% 95.9%)` | `hsl(240 3.7% 15.9%)` | Inactive tabs, hover fills, secondary buttons |
| `--muted-foreground` | `hsl(240 3.8% 46.1%)` | `hsl(240 5% 64.9%)` | Labels, timestamps, column headers, hints |
| `--foreground` | `hsl(240 10% 3.9%)` | `hsl(0 0% 98%)` | Primary headings, table text, file names |
| `--border` | `hsl(240 5.9% 90%)` | `hsl(240 3.7% 15.9%)` | Card borders, dividers, table row lines |
| `--input` | `hsl(240 5.9% 90%)` | `hsl(240 3.7% 15.9%)` | Input borders, select boundaries |

#### Brand & Interactive Accents

| Token Name | Light Mode | Dark Mode | Semantic Role |
|---|---|---|---|
| `--primary` | `hsl(221.2 83.2% 53.3%)` (#2563eb) | `hsl(217.2 91.2% 59.8%)` (#3b82f6) | Primary action buttons, active tab indicators, focus rings |
| `--primary-foreground`| `hsl(0 0% 100%)` | `hsl(222.2 47.4% 11.2%)` | Text on primary elements |
| `--accent` | `hsl(210 40% 96.1%)` | `hsl(217.2 32.6% 17.5%)` | Row highlight, active list item |
| `--ring` | `hsl(221.2 83.2% 53.3%)` | `hsl(217.2 91.2% 59.8%)` | Keyboard accessibility focus ring |

#### Cluster & Semantic Statuses (Castor Infrastructure States)

| Status | Light Value | Dark Value | System Context in Castor |
|---|---|---|---|
| **Healthy / Success** | `hsl(142.1 76.2% 36.3%)` (#16a34a) | `hsl(142.1 70.6% 45.3%)` (#22c55e) | `data-svc` node `HEALTHY`, Raft leader active, quorum verified |
| **Degraded / Warning** | `hsl(38 92% 50%)` (#f59e0b) | `hsl(48 96% 53%)` (#fbbf24) | Node `DEGRADED`, healing worker active, disk usage $>85\%$ |
| **Offline / Destructive** | `hsl(0 84.2% 60.2%)` (#ef4444) | `hsl(0 72.2% 50.6%)` (#dc2626) | Node `OFFLINE`, split-brain election, corrupt chunks detected |
| **Active / Telemetry** | `hsl(199 89% 48%)` (#0ea5e9) | `hsl(199 89% 58%)` (#38bdf8) | Scrubber actively scanning, streaming upload in progress |

---

### 2.2. Typography

#### Font Hierarchy
* **Interface Sans**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  * Applied to navigation, headings, body text, buttons, modals, and tooltips.
* **Engineering Monospace**: `"JetBrains Mono", "Geist Mono", "SF Mono", Menlo, Consolas, monospace`
  * Required for:
    * Cryptographic hashes (`SHA-256`), ETags (`7f83b165...`)
    * Storage node addresses (`127.0.0.1:9101`), Raft terms, commit indices
    * S3 credentials (`access_key_id`, `secret_access_key`)
    * File sizes (`4.00 MB`, `1.42 GB`) and HTTP codes (`200 OK`, `507 Quota Exceeded`)

#### Scale & Leading

| Token | Class | Size / Leading | Usage |
|---|---|---|---|
| `caption` | `text-xs leading-4` | 12px / 16px | Table headers, badge labels, timestamps, helper text |
| `body-sm` | `text-sm leading-5` | 14px / 20px | Standard data cells, buttons, input fields, navigation items |
| `body` | `text-base leading-6` | 16px / 24px | Section introductions, modal body copy |
| `h3` | `text-lg font-semibold leading-7` | 18px / 28px | Card titles, drawer headers, sub-view headings |
| `h2` | `text-xl font-bold leading-7` | 20px / 28px | Main view headers (`Bucket Explorer`, `Cluster Telemetry`) |
| `h1` | `text-2xl font-bold leading-8` | 24px / 32px | Landing titles, major dashboard headlines |

---

### 2.3. Radii, Spacing & Shadows

* **Border Radii**:
  * Default Components (inputs, buttons, badges): `rounded-md` (`6px` / `0.375rem`)
  * Cards, Tables, Dialogs, Sheets: `rounded-lg` (`8px` / `0.5rem`)
  * Avatar & Status Dots: `rounded-full`
* **Spacing Scale**: Consistent 4px grid (`p-2` = 8px, `p-3` = 12px, `p-4` = 16px, `p-6` = 24px).
* **Elevation & Borders**:
  * Crisp 1px borders (`border border-border`) delineate cards and sections.
  * Subtle elevation for layered surfaces:
    * Popovers & Menus: `shadow-md border border-border`
    * Modals & Drawers: `shadow-xl border border-border`

---

## 3. UI Patterns & Layout Architecture

### 3.1. Main Layout Shell

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  ☁ CASTOR   [ Home ]   [ Docs ]                                       [ Sign In ]      │  <-- Minimal Global Header (h-14, border-b)
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  Cover Portal (Home) View:                                                             │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │                                     [ ☁ ]                                        │  │
│  │                                    Castor                                        │  │
│  │                  Personal, private cloud storage you truly own.                  │  │
│  │                     [ Sign In / Create Account ]   [ Docs & Setup ]              │  │
│  │                                                                                  │  │
│  │  ┌─ 100% Private ──────┐ ┌─ Zero Fees ─────────┐ ┌─ Uncompressed ─┐ ┌─ Any Dev ─┐  │
│  │  │ Home server security│ │ No recurring fees   │ │ 4K videos & RAW │ │ Sync apps │  │
│  │  └─────────────────────┘ └─────────────────────┘ └─────────────────┘ └───────────┘  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                        │
│  Documentation (Docs) Hub:                                                             │
│  ┌───────────────┬──────────────────────────────────────────────────────────────────┐  │
│  │  Navigation   │  [ Getting Started ] / [ Installation ] / [ Architecture ]       │  │
│  │  ───────────  │  ──────────────────────────────────────────────────────────────  │  │
│  │  🚀 Started   │  High-performance S3-compatible object storage. Fixed 4MB        │  │
│  │  📦 Install   │  content-addressed chunking, Raft consensus ($W=2, R=3$).        │  │
│  │  ⚙ Architecture│                                                                  │  │
│  │  🔌 Clients   │  $ docker compose up -d                                          │  │
│  │  🩺 Ops/Health│  curl http://localhost:9000/healthz                              │  │
│  └───────────────┴──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.2. Standard Component States & Tactile Micro-Interactions

Every interactive component must handle standard lifecycle states cleanly with fluid micro-interactions:

1. **Rest / Default**: High-contrast text, clear boundary definition, subtle background tint.
2. **Hover Animations**:
   * **Action Buttons**: Smooth vertical lift with shadow transition:
     `transition-all duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer`
   * **Top Navigation Links**: Subtle vertical lift and contrast shift:
     `transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer`
   * **Sidebar Navigation Items**: Horizontal nudge indicating depth:
     `transition-all duration-150 hover:translate-x-1 active:translate-x-0.5 cursor-pointer`
   * **Interactive Story Cards**: Smooth card elevation and border highlight:
     `transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-sm`
   * **Hero Brand Marks & Icons**: Subtle organic scale:
     `transition-all duration-300 hover:scale-105 hover:shadow-md`
3. **Focus-Visible**: Clean 2px primary ring with 2px offset (`ring-2 ring-primary ring-offset-2 ring-offset-background`).
4. **Modal Overlays**: Deep, high-contrast dimming (`bg-black/85 backdrop-blur-md`) with solid, fully opaque card backgrounds (`bg-white dark:bg-zinc-950`).
5. **Loading States**:
   * **Data Tables & Cards**: Skeleton pulses matching line heights (`<Skeleton className="h-6 w-full" />`).
   * **Action Buttons**: Disabled pointer events with a spinning `<Loader2 className="mr-2 h-4 w-4 animate-spin" />` keeping original button width.
6. **Empty States**:
   * Friendly, informative graphic/icon (`FolderOpen`, `Key`, or `Activity`).
   * Clear heading and concise guidance.
   * Direct call-to-action button (`Create First Bucket`, `Generate S3 Key`).

---

## 4. Feature Component Guidelines

### 4.1. Landing Cover Portal
* **Minimalist Brand Hero**: Clean, centered visual presence with zero infrastructure jargon on the consumer-facing canvas.
* **Plain-English Value Props**: Focus on user ownership, zero monthly fees, original quality media, and multi-device access.
* **Direct Action Routing**: Primary CTA for authentication and secondary CTA directing into the documentation hub.

### 4.2. Documentation & Technical Hub
* **Persistent Sidebar**: Modular category switcher (`Getting Started`, `Installation & Setup`, `System Architecture`, `Client Integrations`, `Operations & Health`).
* **Technical Segregation**: House all low-level cluster topology, port matrices (`:9000`, `:9001`, `:9095`, `:9091`, `:9101`), Raft quorum details ($W=2, R=3$), and code snippets inside the Docs view.
* **Copyable Quickstart Snippets**: One-click copy buttons with instant visual confirmation for shell, Python (Boto3), and Docker Compose configs.

### 4.3. Cluster Health & Telemetry Dashboard (Operator Area)
* **Raft Status Card**:
  * Badge highlighting active Leader node, current Raft term, and commit index.
* **Storage Node Cards**:
  * Grid of storage nodes (`data-svc-1`, `data-svc-2`, `data-svc-3`).
  * Status badge (`HEALTHY` 🟢, `DEGRADED` 🟡, `OFFLINE` 🔴).
  * Storage gauge: Clean visual capacity bar showing used vs. free disk with percentage.
* **Scrubber & Maintenance**:
  * Scrubber progress bar with stats (`Chunks Verified`, `Corruptions Found`, `Last Completed`).
  * Clean action button to trigger an on-demand scrub or GC sweep (`?dry_run=true` toggle).

### 4.4. API Keys & Quickstart
* **Keys Table**: Active `access_key_id`s, creation timestamp, and revoke action.
* **New Key Modal**: Displays generated `secret_access_key` in a secured, copyable card with warning that it is only displayed once.
* **Quickstart Tabs**: Copy-pasteable configuration snippets for `AWS CLI`, Python (`boto3`), and Node.js (`@aws-sdk/client-s3`).
