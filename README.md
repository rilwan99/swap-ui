# Token Price Explorer

A real-time cryptocurrency price comparison interface built with Next.js 16 and React 19. Users can input USD amounts and instantly see equivalent values across multiple tokens.

**Live Demo:** https://swap-ui-phi.vercel.app/

## Tech Stack and Rationale

**Next.js 16 (App Router)** — Enables full-stack development within a single codebase. The API routes handle secure backend logic while the frontend delivers a seamless user experience.

**React Query** — Eliminates the need for manual state management. Automatically handles caching, deduplicates requests, and provides built-in retry logic. This means faster load times and fewer API calls.

**shadcn/ui + Tailwind** — Unlike component libraries that lock you into their design system, shadcn copies components directly into your codebase. Full customization without the bloat. Tailwind enables rapid, maintainable styling without context switching.

**TypeScript (Strict)** — Catches bugs at compile-time, not runtime. Strict mode enforces best practices and makes refactoring safe.

## Supported Tokens

| Token | Network  | Chain ID |
| ----- | -------- | -------- |
| USDC  | Ethereum | 1        |
| USDT  | Polygon  | 137      |
| ETH   | Base     | 8453     |
| WBTC  | Ethereum | 1        |

## Quick Start

```bash
git clone https://github.com/rilwan99/swap-ui
cd swap-ui
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

**Environment Setup:** Copy `.env.example` to `.env` and add your `FUN_API_KEY` for token price data.

## Key Technical Decisions

### 1. Performance Optimization: Smart Debouncing

**The Problem:** Each keystroke could trigger an API call, overwhelming the server and creating a janky user experience.

**The Solution:** Implemented a 500ms debounce on USD input. After testing various delays (300ms felt too fast, 700ms felt sluggish), 500ms hit the sweet spot between responsiveness and efficiency.

**Impact:** Reduces API calls by ~80% during typing while maintaining a snappy feel.

### 2. State Management: React Query Over Redux

**Why not Redux?** For this use case, Redux would be overkill since this is a SPA. React Query handles:

- Automatic background refetching (fresh data every 30s)
- Request deduplication (multiple components requesting the same data only trigger one API call)
- Built-in loading and error states
- Exponential backoff retry logic

**Result:** Less boilerplate, better UX, automatic caching without manual cache invalidation logic.

### 3. API Security: Internal Request Validation

External APIs shouldn't be exposed to client-side abuse. Implemented a lightweight security layer:

- Header-based token validation (`x-internal-request`)
- Origin/referer checking to prevent CSRF

This prevents unauthorized access while keeping the implementation simple.

### 4. Architecture: Feature-Based Organization

```
components/
├── token/      # All token-related UI (7 components)
├── theme/      # Theme switching logic
└── common/     # Shared utilities

lib/
├── services/   # API calls separated from UI
├── config/     # Single source of truth for constants
└── types/      # TypeScript definitions by domain
```

As features grow, finding related code is trivial. Adding a new token feature means creating files in `components/token/` and `lib/services/` — clear and scalable.

### 5. UX Details That Matter

- **Loading skeletons** instead of spinners (less jarring, users see structure immediately)
- **Dark mode** by default with user-enabled toggle
- **Redirect handling** for invalid routes (404s go back to home)
- **Mobile-first design** (responsive breakpoints tested on actual devices)

## Project Structure

```
├── app/                 # Next.js pages + API routes
│   └── api/token-price/ # Backend endpoint
├── components/
│   ├── token/          # Token comparison UI
│   ├── theme/          # Dark/light mode toggle
│   └── ui/             # shadcn primitives
├── hooks/              # useTokenPrices, useDebounce, etc.
└── lib/
    ├── services/       # Business logic (calculations, API calls)
    ├── config/         # App constants, token definitions
    └── types/          # TypeScript interfaces
```

## Trade-offs & Future Improvements

**What I'd add with more time:**

- **Unit tests** for services (calculation logic is pure functions — perfect for testing)
- **E2E tests** with Playwright for critical user flows
- **Optimistic updates** (show calculated values immediately while fetching real prices)
- **WebSocket connection** for truly real-time prices (currently using on-demand fetching with 30s cache freshness)
- **Expand token list** for more swap options.
- **Token search** (currently only 4 tokens, but would scale poorly beyond ~20)

**Trade-offs made:**

- Hardcoded token list vs. dynamic fetching (keeping it simple for MVP)
- Client-side debouncing vs. server-side rate limiting (both is ideal, but debouncing solves 80% of the problem)
- On-demand fetching vs. WebSockets (on-demand is simpler, works everywhere, and with 30s caching is efficient enough for this use case)
