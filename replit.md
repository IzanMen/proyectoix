# IX. Studio — Landing Page

Premium web design agency landing page for "Izan & Xaloc" (IX.), based in Menorca.

## Architecture

- **Frontend**: React 19 + Vite + Tailwind CSS v4 + Framer Motion
- **Backend**: Express 5 (serves static files in production, API routes for contact form and email subscription)
- **Email**: Nodemailer via Gmail SMTP (uses `GMAIL_APP_PASSWORD` secret)

## Key Files

### Frontend
- `client/src/App.tsx` — Router (wouter)
- `client/src/pages/Home.tsx` — Main page, composes all sections
- `client/src/pages/EmailDiario.tsx` — Email subscription capture page
- `client/src/pages/Confirmado.tsx` — Post-confirmation landing page
- `client/src/pages/PoliticaPrivacidad.tsx` — Privacy policy
- `client/src/pages/AvisoLegal.tsx` — Legal notice
- `client/src/pages/PoliticaCookies.tsx` — Cookie policy
- `client/src/components/sections/` — Hero, Perception, Services, Context, Process, About, Contact, ContactForm
- `client/src/components/layout/` — Navbar, InteractiveBackground, FadeIn
- `client/src/lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `client/src/index.css` — Tailwind theme config, custom fonts (Syne, Space Grotesk, Inter)

### Backend
- `server/index.ts` — Express app setup
- `server/routes.ts` — `/api/contact` POST (Nodemailer) + `/api/subscribe` POST (Maileon)
- `server/mailer.ts` — Gmail SMTP transporter factory
- `server/vite.ts` — Vite dev middleware
- `server/static.ts` — Production static file serving

### Config
- `vite.config.ts` — Vite config with meta images plugin
- `vite-plugin-meta-images.ts` — OpenGraph image URL injection
- `script/build.ts` — Production build script (Vite + esbuild)

## Pages
- `/` — Main landing page (Hero, Perception, Services, Context, Process, About, Contact)
- `/email-diario` — Email subscription capture page (Maileon integration)
- `/confirmado` — Post-confirmation page (redirect target after email confirmation)
- `/politica-privacidad` — Privacy policy
- `/aviso-legal` — Legal notice
- `/politica-cookies` — Cookie policy

## Design
- Dark aesthetic with purple accent: `hsl(270, 100%, 60%)`
- Interactive particle background (canvas-based)
- Team photo with removed background: `client/public/team-photo.png`
- 3-step contact form: businessName → contact → hasWebsite
- Email sends FROM `sanchezginesizan@gmail.com` TO `prcyecto.ix@gmail.com`
- NEVER use the word "newsletter" — always "email diario"

## Email Diario (Maileon / IONOS)
- Page at `/email-diario` captures email subscriptions
- Backend `/api/subscribe` forwards to Maileon hosted form endpoint
- Maileon URL: `https://emt-hja6ndzsh.topmailer.net/hp/NpSmjC-4bTM9BKn5O0-_GA/signup`
- No API key needed — uses Maileon's public hosted form endpoint
- Maileon handles double opt-in confirmation emails and subscriber management
- `/confirmado` page is the redirect target after email confirmation (configure in Maileon)
- Privacy checkbox required before subscribing

## Contact Form
- 3-step form: business name → contact info → has website?
- Sends email via Nodemailer/Gmail SMTP to prcyecto.ix@gmail.com

## Dependencies (minimal)
- Runtime: express, nodemailer, react, react-dom, framer-motion, lucide-react, wouter, clsx, tailwind-merge, tw-animate-css
- Dev: vite, tailwindcss, @tailwindcss/vite, typescript, tsx, esbuild, postcss
