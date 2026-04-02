# IX. Studio — Landing Page

Premium web design agency landing page for "Izan & Xaloc" (IX.), based in Menorca.

## Architecture

- **Frontend**: React 19 + Vite + Tailwind CSS v4 + Framer Motion
- **Backend**: Express 5 (serves static files in production, API route for contact form)
- **Email**: Nodemailer via Gmail SMTP (uses `GMAIL_APP_PASSWORD` secret)

## Key Files

### Frontend
- `client/src/App.tsx` — Router (wouter)
- `client/src/pages/Home.tsx` — Main page, composes all sections
- `client/src/components/sections/` — Hero, Perception, Services, Context, Process, About, Contact, ContactForm
- `client/src/components/layout/` — Navbar, InteractiveBackground, FadeIn
- `client/src/lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `client/src/index.css` — Tailwind theme config, custom fonts (Syne, Space Grotesk, Inter)

### Backend
- `server/index.ts` — Express app setup
- `server/routes.ts` — `/api/contact` POST endpoint (email via Nodemailer)
- `server/mailer.ts` — Gmail SMTP transporter factory
- `server/vite.ts` — Vite dev middleware
- `server/static.ts` — Production static file serving

### Config
- `vite.config.ts` — Vite config with meta images plugin
- `vite-plugin-meta-images.ts` — OpenGraph image URL injection
- `script/build.ts` — Production build script (Vite + esbuild)

## Design
- Dark aesthetic with purple accent: `hsl(270, 100%, 60%)`
- Interactive particle background (canvas-based)
- Team photo with removed background: `client/public/team-photo.png`
- 5-step contact form: businessName → contact → hasWebsite → goal → values
- Email sends FROM `sanchezginesizan@gmail.com` TO `prcyecto.ix@gmail.com`

## Dependencies (minimal)
- Runtime: express, nodemailer, react, react-dom, framer-motion, lucide-react, wouter, clsx, tailwind-merge, tw-animate-css
- Dev: vite, tailwindcss, @tailwindcss/vite, typescript, tsx, esbuild, postcss
