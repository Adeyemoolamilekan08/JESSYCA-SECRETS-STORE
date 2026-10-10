# Jessyca Secrets

A polished frontend ecommerce presentation site for Jessyca Secrets, built with React, TypeScript, Vite, Tailwind CSS, React Router and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in your terminal.

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

Push this folder to GitHub and import the repository into Vercel. The default Vite build settings are sufficient:

- Build command: `npm run build`
- Output directory: `dist`

## Notes

- Product data lives in `src/data/products.ts`.
- Categories live in `src/data/categories.ts`.
- WhatsApp configuration lives in `src/utils/whatsapp.ts`.
- Cart and wishlist are frontend-only and persist in localStorage.
- No backend, database, payment gateway, authentication, CMS or admin panel is included.
- Product imagery currently uses remote Unsplash image URLs so the presentation is visually complete. Replace those URLs with client-approved product photos before final launch.
- No address or social usernames have been invented.
