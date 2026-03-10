# v0-hirevia

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_znXLZKkzHLe0IQwSO1GL2YhHVnpx)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/SujalSinha12012005/v0-hirevia" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>

## PWA (Progressive Web App)

This project includes basic PWA support:

- A web manifest at `public/manifest.json` (linked in `app/layout.tsx`).
- A service worker at `public/sw.js` that precaches the root and an offline fallback (`public/offline.html`).
- A small client component `components/pwa-register.tsx` registers the service worker on page load.

To test locally:

1. Run the dev server (`npm run dev` or `pnpm dev`) and open the app in Chrome.
2. Open DevTools → Application to inspect the manifest and service worker.
3. Build (`npm run build` then `npm start`) to test the production behavior; service workers will only work over HTTPS or localhost.

Notes:

- Icons in the manifest reference `placeholder-logo.png` — replace with properly sized 192x192 and 512x512 PNGs for best results.
- For more advanced caching and build-time asset generation consider adding `next-pwa` or Workbox integration.

