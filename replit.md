# Izan & Xaloc — Landing Page

Premium landing page for "Izan & Xaloc", a web design agency based in Menorca.

## Stack
- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion
- **Backend**: Express 5 (Node.js) — single API route for contact form
- **Email**: SendGrid integration (verified sender: sanchezginesizan@gmail.com → prcyecto.ix@gmail.com)
- **Routing**: Wouter (client-side)

## Project Structure
```
client/
  index.html
  public/
    team-photo.webp         # Team photo (background removed, WebP optimized)
  src/
    main.tsx                # App entry point
    App.tsx                 # Router + providers
    index.css               # Global styles + Tailwind
    components/
      layout/
        Navbar.tsx           # Fixed navigation with mobile menu
        InteractiveBackground.tsx  # Canvas particle animation
        FadeIn.tsx           # Scroll-triggered fade animation wrapper
      sections/
        Hero.tsx             # Hero section
        Perception.tsx       # Value proposition
        Services.tsx         # Services offered
        Context.tsx          # Menorca context
        Process.tsx          # Work process steps
        About.tsx            # Team section with photo
        Contact.tsx          # Contact section wrapper
        ContactForm.tsx      # Multi-step Typeform-style form
      ui/
        toast.tsx            # Toast notification component
        toaster.tsx          # Toast container
    hooks/
      use-toast.ts           # Toast hook
    lib/
      queryClient.ts         # React Query client
      utils.ts               # cn() utility
    pages/
      Home.tsx               # Main landing page
      not-found.tsx           # 404 page
server/
  index.ts                   # Express server setup
  routes.ts                  # API routes (/api/contact)
  sendgrid.ts                # SendGrid client setup
  storage.ts                 # (minimal, unused placeholder)
  static.ts                  # Production static file serving
  vite.ts                    # Vite dev server middleware
shared/
  schema.ts                  # Zod schemas (contactSchema)
```

## Design System
- **Background**: Dark (#050505) with interactive canvas particle system
- **Accent**: Purple hsl(270, 100%, 60%)
- **Fonts**: Syne (display), Space Grotesk (tech), Inter (body) — loaded via Google Fonts
- **Logo**: "IX." monogram with purple animated dot

## Contact Form
5-step Typeform-style form:
1. Business name
2. Phone or email contact
3. Current website status (options)
4. Goals for the new website
5. Brand values

Sends styled HTML email via SendGrid to prcyecto.ix@gmail.com.

## Notes
- Emails may arrive in spam for new SendGrid accounts — domain authentication recommended
- Team photo has background removed via AI, saved as optimized WebP
