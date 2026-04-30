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
- Email sends FROM `sanchezginesizan@gmail.com` TO `hola@proyectoix.com`
- NEVER use the word "newsletter" — always "email diario"

## Email Diario (Hostinger Reach)
- Page at `/email-diario` captures email subscriptions
- Backend `/api/subscribe` forwards to Hostinger Reach API
- Endpoint: `POST https://developers.hostinger.com/api/reach/v1/contacts`
- Requires secret: `HOSTINGER_API_TOKEN` (Bearer token auth)
- Hostinger handles double opt-in confirmation emails and subscriber management
- `/confirmado` page is the redirect target after email confirmation (configure in Hostinger)
- Privacy checkbox required before subscribing

## Contact Form
- 3-step form: business name → contact info → has website?
- Sends email via Nodemailer/Gmail SMTP to hola@proyectoix.com

## Dependencies (minimal)
- Runtime: express, compression, nodemailer, react, react-dom, framer-motion, lucide-react, wouter, clsx, tailwind-merge, tw-animate-css
- Dev: vite, tailwindcss, @tailwindcss/vite, typescript, tsx, esbuild, postcss, @types/compression

## SEO (Tarea #1 — completada)
- `client/public/robots.txt` — permite Googlebot, Bing y bots de IA (GPTBot, Google-Extended, PerplexityBot, ClaudeBot); enlaza el sitemap
- `client/public/sitemap.xml` — 5 rutas con `image:image` para home y team photo
- `client/index.html` — sin `meta keywords`, geo tags, hreflang, preload de fuentes con `display=swap`, `<noscript>` con texto SEO, JSON-LD `@graph` (Organization + LocalBusiness + WebSite) inline
- `client/src/lib/useSeo.ts` — hook React 19 nativo (sin react-helmet-async) que actualiza `<title>`, meta, canonical, OG/Twitter y JSON-LD por página
- `client/src/lib/structured-data.ts` — generadores tipados (`organizationLd`, `localBusinessLd`, `websiteLd`, `webPageLd`, `breadcrumbLd`, `faqPageLd`)
- `client/src/components/sections/FAQ.tsx` — sección FAQ con 8 preguntas + array `faqs` exportado para FAQPage JSON-LD
- Cada página (`Home`, `EmailDiario`, `PoliticaPrivacidad`, `AvisoLegal`, `PoliticaCookies`) llama `useSeo` con su propio título, descripción, canonical, breadcrumb y WebPage
- `Footer` ampliado con interlinking a `/#services`, `/#process`, `/#about`, `/#faq`, `/#contact`, listado de servicios y cobertura por localidades
- Copy reforzado en `Hero`, `About` y `Problem` con keywords ("agencia", "Maó/Ciutadella", "SEO local")
- `server/index.ts` — compresión brotli/gzip + cabeceras de seguridad (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy)
- `server/static.ts` — Cache-Control 1y immutable para assets, no-cache para HTML/robots/sitemap; content-type explícito para `sitemap.xml` y `robots.txt`
- DECISIÓN: se descartó pre-render con Puppeteer por complejidad/coste vs. beneficio marginal — Googlebot ejecuta JS y el `useSeo` hook + JSON-LD inline + `<noscript>` cubren los crawlers que no la ejecutan
