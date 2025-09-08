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

## Firebase Integration

This project uses [Firebase](https://firebase.google.com/) for authentication and [Cloud Firestore](https://firebase.google.com/products/firestore) as a real-time database to enable features like starring individual article posts. When a user stars an article, the action is stored in Firestore, allowing for persistent and real-time star counts per post. You will need to set up your own Firebase project and add your configuration to a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

See `src/lib/firebase/` for the Firebase client setup and usage.

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Component Library:** Custom components, Radix UI, Lucide React icons
- **Data Source:** Fetching blog articles and categories from a remote [WordPress](https://wordpress.org/) backend via REST API

## Features

- Star articles (requires Google sign-in, powered by Firebase Firestore)

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

## Tooling & Automation

- **Husky**: Git hooks are managed with [Husky](https://typicode.github.io/husky/). This project uses a pre-commit hook to automatically run `lint-staged` and ensure code quality before every commit. See the `.husky/` directory for configuration.

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
