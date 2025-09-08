This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Ibraheem's Blog (Next.js Test Project)

Welcome! This is a test project built by **Ibrahim Kedir** using [Next.js](https://nextjs.org/), React, and Tailwind CSS. The main purpose of this project is to demonstrate modern frontend development practices, including data fetching, UI components, and routing.

## Project Overview

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Component Library:** Custom components, Radix UI, Lucide React icons
- **Data Source:** Fetching blog articles and categories from a remote [WordPress](https://wordpress.org/) backend via REST API

## Features

- Blog homepage with article cards
- Category filtering
- Article detail pages
- Responsive and accessible UI
- Data fetched from a WordPress API endpoint

## Data Source

All blog data (articles, categories, options) is fetched from a remote WordPress instance using custom REST API endpoints. See `src/lib/api.ts` for details on how data is retrieved.

## Getting Started

1. **Install dependencies:**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

3. **Build for production:**
   ```bash
   pnpm build
   # or
   npm run build
   # or
   yarn build
   ```

## Scripts

- `dev` – Start the development server
- `build` – Build the app for production
- `start` – Start the production server
- `lint` – Run ESLint

## Folder Structure

- `src/app/` – Application routes and pages
- `src/components/` – Reusable UI components
- `src/lib/` – API and utility functions
- `src/types/` – TypeScript types
- `public/` – Static assets

## Author

**Ibrahim Kedir**

---

This project is for demonstration and testing purposes only. Data is fetched from a public WordPress API and may change over time.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
