# Token Price Explorer

A React-based token swap interface that allows users to explore crypto token values and exchange rates in real-time.

## Live Demo

**Deployed Application:** https://swap-ui-phi.vercel.app/

## Overview

This application provides a simple interface for users to:

- Input a USD amount
- Select a source token and destination token
- View real-time exchange rates and equivalent token amounts

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript (Strict mode)
- **Styling:** TailwindCSS + shadcn/ui components
- **State Management:** React Query (@tanstack/react-query)
- **Data Fetching:** @funkit/api-base for token data and pricing
- **Package Manager:** pnpm
- **Deployment:** Vercel

## Supported Tokens

| Token | Chain ID |
| ----- | -------- |
| USDC  | 1        |
| USDT  | 137      |
| ETH   | 8453     |
| WBTC  | 1        |

## Local Setup

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository

```bash
git clone https://github.com/rilwan99/swap-ui
cd swap-ui
```

2. Install dependencies

```bash
pnpm install
```

3. Run the development server

```bash
pnpm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Key Features

- Real-time token price updates with React Query caching
- Support for multiple blockchain networks (Ethereum, Polygon, Base)
- Debounced input for optimal API performance
- Dark/light theme support with next-themes
- Responsive design with mobile-first approach
- Comprehensive error handling and loading states
- Type-safe development with TypeScript
- Accessible UI with shadcn/ui components
- API security validation

## Project Structure

This project follows a feature-based architecture with clear separation of concerns:

```
├── app/                 # Next.js App Router (pages & API routes)
├── components/          # React components organized by feature
│   ├── common/         # Shared components (ErrorDisplay, etc.)
│   ├── theme/          # Theme components (ThemeProvider, ThemeToggle)
│   ├── token/          # Token feature components
│   └── ui/             # shadcn/ui design system primitives
├── hooks/              # Custom React hooks
├── lib/                # Utilities and library code
│   ├── config/         # Configuration (app constants, tokens)
│   ├── services/       # Business logic & API calls
│   └── types/          # TypeScript type definitions
└── public/             # Static assets
```

For detailed architecture documentation, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Design Decisions

- **Feature-based organization**: Components grouped by feature for better scalability
- **Service layer**: Business logic separated from UI components
- **React Query**: Server state management with automatic caching and retries
- **Debouncing**: 500ms debounce on input to reduce API calls
- **Type safety**: Strict TypeScript configuration for compile-time error detection
- **Component composition**: Reusable components with clear prop interfaces
- **Theme support**: Dark/light mode with system preference detection
- **Error boundaries**: Comprehensive error handling at multiple levels

## Libraries Used

- **@funkit/api-base**: Fetching token information and prices from multiple chains
- **@tanstack/react-query**: Server state management with caching, retries, and request deduplication
- **next-themes**: Theme management with system preference detection
- **shadcn/ui**: Accessible, customizable UI components built on Radix UI
- **tailwindcss**: Utility-first CSS framework for rapid UI development
- **lucide-react**: Modern icon library
- **react-number-format**: Input formatting and validation

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
FUN_API_KEY=                     # API key for @funkit/api-base
INTERNAL_API_SECRET=             # Server-side API security
NEXT_PUBLIC_INTERNAL_API_SECRET= # Client-side API security
NEXT_PUBLIC_APP_URL=             # Application URL
```

See `.env.example` for reference.

## Assumptions

- Users have basic knowledge of cryptocurrency tokens
- Token prices are fetched and displayed in USD
- Source and target tokens must be different
- Supported tokens are hardcoded (USDC, USDT, ETH, WBTC)
- Price data refreshes automatically every 30 seconds (via React Query)
- Minimum USD input required for calculations
